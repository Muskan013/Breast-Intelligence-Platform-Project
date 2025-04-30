import {
  User,
  InsertUser,
  Prediction,
  InsertPrediction,
  ChatMessage,
  InsertChatMessage,
  PredictionParams,
  PredictionResult
} from "@shared/schema";

// Extend the interface with all necessary CRUD methods
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Prediction methods
  createPrediction(prediction: InsertPrediction): Promise<Prediction>;
  getPredictions(userId?: number): Promise<Prediction[]>;
  getPrediction(id: number): Promise<Prediction | undefined>;
  
  // Chat message methods
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  getChatMessages(userId?: number): Promise<ChatMessage[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private predictions: Map<number, Prediction>;
  private chatMessages: Map<number, ChatMessage>;
  
  private userIdCounter: number;
  private predictionIdCounter: number;
  private chatMessageIdCounter: number;

  constructor() {
    this.users = new Map();
    this.predictions = new Map();
    this.chatMessages = new Map();
    
    this.userIdCounter = 1;
    this.predictionIdCounter = 1;
    this.chatMessageIdCounter = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Prediction methods
  async createPrediction(insertPrediction: InsertPrediction): Promise<Prediction> {
    const id = this.predictionIdCounter++;
    const prediction: Prediction = { ...insertPrediction, id };
    this.predictions.set(id, prediction);
    return prediction;
  }
  
  async getPredictions(userId?: number): Promise<Prediction[]> {
    const predictions = Array.from(this.predictions.values());
    
    if (userId !== undefined) {
      return predictions.filter(prediction => prediction.userId === userId);
    }
    
    return predictions;
  }
  
  async getPrediction(id: number): Promise<Prediction | undefined> {
    return this.predictions.get(id);
  }
  
  // Chat message methods
  async createChatMessage(insertChatMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = this.chatMessageIdCounter++;
    const chatMessage: ChatMessage = { ...insertChatMessage, id };
    this.chatMessages.set(id, chatMessage);
    return chatMessage;
  }
  
  async getChatMessages(userId?: number): Promise<ChatMessage[]> {
    const chatMessages = Array.from(this.chatMessages.values());
    
    if (userId !== undefined) {
      return chatMessages.filter(message => message.userId === userId);
    }
    
    return chatMessages;
  }
}

export const storage = new MemStorage();
