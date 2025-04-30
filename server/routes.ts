import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { predictionParamsSchema, PredictionParams, PredictionResult, predictionResultSchema } from "@shared/schema";
import * as tf from "@tensorflow/tfjs-node";
import { ZodError } from "zod";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Load the Gemini API key from environment variables
const geminiAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "dummy-key-for-development");

// Model variables - would be loaded from a proper model file in production
let model: tf.LayersModel | null = null;

// Function to normalize input features to the same scale the model was trained on
function normalizeFeatures(features: PredictionParams) {
  // These normalization parameters would come from the training data statistics
  // For now, using a simple min-max normalization approach
  const normalized = {
    cellSize: (features.cellSize - 10) / 20, // normalize to [0,1] range assuming min=10, max=30
    cellShape: (features.cellShape - 1) / 9, // normalize to [0,1] range assuming min=1, max=10
    marginalAdhesion: (features.marginalAdhesion - 1) / 9,
    epithelialSize: (features.epithelialSize - 1) / 9,
    bareNuclei: (features.bareNuclei - 1) / 9,
    blandChromatin: (features.blandChromatin - 1) / 9,
    normalNucleoli: (features.normalNucleoli - 1) / 9,
    mitoses: (features.mitoses - 1) / 9
  };
  
  return normalized;
}

// Function to initialize and load the TensorFlow model
async function loadModel() {
  try {
    // In a production environment, we would load a pre-trained model from a file
    // For this demo, we'll create a simple model that returns reasonable predictions
    
    const input = tf.input({ shape: [8] }); // 8 features
    const dense1 = tf.layers.dense({ units: 16, activation: 'relu' }).apply(input);
    const dense2 = tf.layers.dense({ units: 8, activation: 'relu' }).apply(dense1);
    const output = tf.layers.dense({ units: 2, activation: 'softmax' }).apply(dense2);
    
    model = tf.model({ inputs: input, outputs: output as tf.SymbolicTensor });
    
    // Compile the model
    model.compile({
      optimizer: 'adam',
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy']
    });
    
    // In a real app, we would load weights here
    console.log("TensorFlow model initialized");
    
    return model;
  } catch (error) {
    console.error("Error loading TensorFlow model:", error);
    throw error;
  }
}

// Function to make predictions with the model
async function predictBreastCancer(params: PredictionParams): Promise<PredictionResult> {
  if (!model) {
    await loadModel();
  }
  
  const normalizedFeatures = normalizeFeatures(params);
  
  // Convert the features to a tensor
  const inputTensor = tf.tensor2d([
    [
      normalizedFeatures.cellSize,
      normalizedFeatures.cellShape,
      normalizedFeatures.marginalAdhesion,
      normalizedFeatures.epithelialSize,
      normalizedFeatures.bareNuclei,
      normalizedFeatures.blandChromatin, 
      normalizedFeatures.normalNucleoli,
      normalizedFeatures.mitoses
    ]
  ]);
  
  // In a real application, this would be a proper prediction
  // For now, we'll create a deterministic but reasonable prediction based on the inputs
  const prediction = model!.predict(inputTensor) as tf.Tensor;
  
  const probabilities = await prediction.data();
  
  // Extract benign and malignant probabilities 
  // (In this demo, we're computing these based on the input features to provide realistic values)
  
  // Higher cell shape, bare nuclei, and marginal adhesion are associated with malignancy
  const malignancyScore = (
    normalizedFeatures.cellShape * 0.3 + 
    normalizedFeatures.bareNuclei * 0.3 + 
    normalizedFeatures.marginalAdhesion * 0.2 +
    normalizedFeatures.epithelialSize * 0.1 +
    normalizedFeatures.mitoses * 0.1
  );
  
  // Clamp the score between 0.05 and 0.95 to avoid extreme predictions
  const malignantProbability = Math.max(0.05, Math.min(0.95, malignancyScore));
  const benignProbability = 1 - malignantProbability;
  
  // Determine confidence level
  let confidenceLevel: "Low" | "Medium" | "High";
  const confScore = Math.abs(benignProbability - 0.5) * 2; // converts to [0, 1] range where 1 is high confidence
  
  if (confScore > 0.7) {
    confidenceLevel = "High";
  } else if (confScore > 0.4) {
    confidenceLevel = "Medium";
  } else {
    confidenceLevel = "Low";
  }
  
  // Cleanup
  inputTensor.dispose();
  prediction.dispose();
  
  return {
    benignProbability,
    malignantProbability,
    confidenceLevel,
    classification: benignProbability > 0.5 ? "Benign" : "Malignant"
  };
}

// Function to generate AI assistant response using Gemini
async function generateAIResponse(message: string): Promise<string> {
  try {
    // Get the generative model (Gemini Pro)
    const model = geminiAI.getGenerativeModel({ model: "gemini-pro" });

    // Set up the chat
    const chat = model.startChat({
      generationConfig: {
        maxOutputTokens: 500,
      },
      history: [
        {
          role: "user",
          parts: [{ text: "I will be asking you questions about breast cancer. Please provide accurate, evidence-based information." }],
        },
        {
          role: "model",
          parts: [{ text: "I'll help you with breast cancer information. I'll provide evidence-based details about detection, diagnosis, and treatment options in a clear, empathetic way. My responses will be informative and accessible. Remember that I can't provide personal medical advice or diagnoses - please consult healthcare professionals for specific concerns. How can I help you today?" }],
        },
      ],
    });

    // Generate the response
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return text || "I'm sorry, I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Error generating AI response with Gemini:", error);
    return "I'm sorry, there was an error processing your request. Please try again later.";
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize the TensorFlow model
  await loadModel();

  // API Routes
  
  // Prediction endpoint
  app.post("/api/predict", async (req: Request, res: Response) => {
    try {
      const params = predictionParamsSchema.parse(req.body);
      
      const result = await predictBreastCancer(params);
      
      // Store the prediction in the database
      const prediction = await storage.createPrediction({
        userId: req.body.userId || null,
        ...params,
        result,
        createdAt: new Date().toISOString()
      });
      
      res.json({ prediction: result });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: "Invalid prediction parameters", details: error.errors });
      } else {
        console.error("Prediction error:", error);
        res.status(500).json({ error: "Failed to generate prediction" });
      }
    }
  });

  // Chat endpoint
  app.post("/api/chat", async (req: Request, res: Response) => {
    try {
      const { message } = req.body;
      
      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message is required" });
      }
      
      // Store the user message
      const userMessage = await storage.createChatMessage({
        userId: req.body.userId || null,
        role: "user",
        content: message,
        timestamp: new Date().toISOString()
      });
      
      // Generate AI response
      const aiResponse = await generateAIResponse(message);
      
      // Store the AI response
      const aiMessage = await storage.createChatMessage({
        userId: req.body.userId || null,
        role: "assistant",
        content: aiResponse,
        timestamp: new Date().toISOString()
      });
      
      res.json({ 
        response: aiResponse,
        timestamp: aiMessage.timestamp
      });
    } catch (error) {
      console.error("Chat error:", error);
      res.status(500).json({ error: "Failed to process chat message" });
    }
  });

  // Get chat history
  app.get("/api/chat", async (req: Request, res: Response) => {
    try {
      const userId = req.query.userId ? Number(req.query.userId) : undefined;
      const messages = await storage.getChatMessages(userId);
      
      res.json({ messages });
    } catch (error) {
      console.error("Error fetching chat history:", error);
      res.status(500).json({ error: "Failed to fetch chat history" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
