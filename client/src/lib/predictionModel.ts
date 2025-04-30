import { apiRequest } from './queryClient';

export interface PredictionParams {
  cellSize: number;
  cellShape: number;
  marginalAdhesion: number;
  epithelialSize: number;
  bareNuclei: number;
  blandChromatin: number;
  normalNucleoli: number;
  mitoses: number;
}

export interface PredictionResult {
  benignProbability: number;
  malignantProbability: number;
  confidenceLevel: 'Low' | 'Medium' | 'High';
  classification: 'Benign' | 'Malignant';
}

export interface PredictionResponse {
  prediction: PredictionResult;
}

export const DEFAULT_PARAMS: PredictionParams = {
  cellSize: 15,
  cellShape: 3,
  marginalAdhesion: 4,
  epithelialSize: 3,
  bareNuclei: 1,
  blandChromatin: 3,
  normalNucleoli: 2,
  mitoses: 1
};

export const makePrediction = async (params: PredictionParams): Promise<PredictionResult> => {
  try {
    const response = await apiRequest('POST', '/api/predict', params);
    const data: PredictionResponse = await response.json();
    return data.prediction;
  } catch (error) {
    console.error('Error making prediction:', error);
    throw new Error('Failed to generate breast cancer prediction');
  }
};
