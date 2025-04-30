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

export const makePredictionFromFile = async (file: File): Promise<PredictionResult> => {
  try {
    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append('file', file);

    // Use fetch directly since apiRequest doesn't support FormData
    const response = await fetch('/api/predict/file', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Server error: ${response.status}`);
    }

    const data: PredictionResponse = await response.json();
    return data.prediction;
  } catch (error) {
    console.error('Error making prediction from file:', error);
    throw new Error('Failed to generate breast cancer prediction from uploaded file');
  }
};
