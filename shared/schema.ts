import { pgTable, text, serial, integer, boolean, json, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model - keeping the existing schema for basic user functionality
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Prediction model for breast cancer prediction parameters
export const predictions = pgTable("predictions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  cellSize: real("cell_size").notNull(),
  cellShape: integer("cell_shape").notNull(),
  marginalAdhesion: integer("marginal_adhesion").notNull(),
  epithelialSize: integer("epithelial_size").notNull(),
  bareNuclei: integer("bare_nuclei").notNull(),
  blandChromatin: integer("bland_chromatin").notNull(),
  normalNucleoli: integer("normal_nucleoli").notNull(),
  mitoses: integer("mitoses").notNull(),
  result: json("result").notNull(),
  createdAt: text("created_at").notNull()
});

export const predictionParamsSchema = z.object({
  cellSize: z.number().min(10).max(30),
  cellShape: z.number().int().min(1).max(10),
  marginalAdhesion: z.number().int().min(1).max(10),
  epithelialSize: z.number().int().min(1).max(10),
  bareNuclei: z.number().int().min(1).max(10),
  blandChromatin: z.number().int().min(1).max(10),
  normalNucleoli: z.number().int().min(1).max(10),
  mitoses: z.number().int().min(1).max(10),
});

export const insertPredictionSchema = createInsertSchema(predictions).pick({
  userId: true,
  cellSize: true,
  cellShape: true,
  marginalAdhesion: true,
  epithelialSize: true,
  bareNuclei: true,
  blandChromatin: true,
  normalNucleoli: true,
  mitoses: true,
  result: true,
  createdAt: true,
});

export type PredictionParams = z.infer<typeof predictionParamsSchema>;
export type InsertPrediction = z.infer<typeof insertPredictionSchema>;
export type Prediction = typeof predictions.$inferSelect;

// Chat message model for AI assistant
export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  role: text("role").notNull(), // 'user' or 'assistant'
  content: text("content").notNull(),
  timestamp: text("timestamp").notNull()
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).pick({
  userId: true,
  role: true,
  content: true,
  timestamp: true,
});

export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type ChatMessage = typeof chatMessages.$inferSelect;

// Schema for the prediction result
export const predictionResultSchema = z.object({
  benignProbability: z.number().min(0).max(1),
  malignantProbability: z.number().min(0).max(1),
  confidenceLevel: z.enum(["Low", "Medium", "High"]),
  classification: z.enum(["Benign", "Malignant"]),
});

export type PredictionResult = z.infer<typeof predictionResultSchema>;
