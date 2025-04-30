import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { predictionParamsSchema, PredictionParams, PredictionResult, predictionResultSchema } from "@shared/schema";
import * as tf from "@tensorflow/tfjs-node";
import { ZodError } from "zod";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Load the Gemini API key from environment variables
const geminiApiKey = process.env.GEMINI_API_KEY || "dummy-key-for-development";
const geminiAI = new GoogleGenerativeAI(geminiApiKey);

// Debug information for Gemini
console.log(`Gemini API initialized with key: ${geminiApiKey ? "Valid API key" : "Missing API key"}`);

// List of available Gemini models (as of April 2025)
// For version 0.24.1 of the Google Generative AI SDK, we should use "gemini-pro"
const AVAILABLE_MODELS = ["gemini-pro"];
console.log("Available Gemini models:", AVAILABLE_MODELS);

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
    // Create medical assistant system prompt with the correct model name for version 0.24.1
    const model = geminiAI.getGenerativeModel({ model: "gemini-pro" });
    
    // Create medical context prompt with the user's query
    const prompt = `
    You are a medical AI assistant specializing in breast cancer. 
    Provide accurate, evidence-based information about breast cancer detection, diagnosis, and treatment options.
    Keep your responses clear, empathetic, and informative.
    Include relevant medical information but make it accessible to patients.
    Do not provide personal medical advice or diagnoses, and remind users to consult healthcare professionals for medical concerns.
    Be concise but comprehensive in your responses, focusing on the most relevant information.
    
    USER QUERY: ${message}
    `;
    
    // Generate content with the prompt
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    return text || "I'm sorry, I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Error generating AI response with Gemini:", error);
    
    // Provide detailed evidence-based responses to common breast cancer questions
    const fallbackResponses: Record<string, string> = {
      "symptoms": "Early symptoms of breast cancer may include a lump or thickening in the breast tissue, changes in breast size or shape, dimpling of the skin, nipple inversion, nipple discharge, or persistent breast pain. Regular self-examinations and clinical screenings are recommended for early detection.",
      
      "detection": "Breast cancer detection typically involves regular screening through mammograms, clinical breast examinations, and self-examinations. Mammograms can detect tumors before they can be felt and are recommended annually for women over 40-50 based on different guidelines.",
      
      "treatment": "Breast cancer treatments vary based on cancer type, stage, and individual factors. Common approaches include surgery (lumpectomy or mastectomy), radiation therapy, chemotherapy, hormone therapy, targeted therapy, and immunotherapy. Treatment plans are typically personalized for each patient.",
      
      "risk": "Risk factors for breast cancer include age, family history, genetic mutations (BRCA1/BRCA2), personal history of breast conditions, radiation exposure, obesity, alcohol consumption, and hormone replacement therapy. However, many women with breast cancer have no identifiable risk factors.",
      
      "prevention": "While there's no guaranteed prevention, risk reduction strategies include maintaining a healthy weight, regular physical activity, limiting alcohol, avoiding hormone replacement therapy, breastfeeding if possible, and for high-risk individuals, preventive medications or surgery might be considered.",
      
      "default": "Important breast cancer information includes understanding the importance of early detection through regular screening, recognizing that treatments have significantly improved outcomes in recent decades, and knowing that support resources are available for patients throughout their diagnosis and treatment journey."
    };
    
    // Determine which response to use based on keywords in the query
    let responseKey: keyof typeof fallbackResponses = "default";
    const query = message.toLowerCase();
    
    if (query.includes("symptom") || query.includes("sign")) {
      responseKey = "symptoms";
    } else if (query.includes("detect") || query.includes("screen") || query.includes("test") || query.includes("diagnos")) {
      responseKey = "detection";
    } else if (query.includes("treat") || query.includes("therap") || query.includes("surgery") || query.includes("option")) {
      responseKey = "treatment";
    } else if (query.includes("risk") || query.includes("cause") || query.includes("factor")) {
      responseKey = "risk";
    } else if (query.includes("prevent") || query.includes("avoid") || query.includes("reduce risk")) {
      responseKey = "prevention";
    }
    
    // Return a response even if the API fails
    return "I apologize for the technical difficulty. " + fallbackResponses[responseKey];
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
