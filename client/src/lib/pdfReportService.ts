import type { PredictionParams, PredictionResult } from "@/lib/predictionModel";
import { apiRequest } from "./queryClient";

/**
 * Service for generating and downloading PDF reports
 */

/**
 * Generate and download a prediction report PDF
 * 
 * @param params Prediction parameters used for the prediction
 * @param result Prediction results to include in the report
 * @param patientName Optional patient name for personalization
 * @param doctorName Optional doctor name for report attribution
 */
export async function generatePredictionReport(
  params: PredictionParams,
  result: PredictionResult,
  patientName?: string,
  doctorName?: string
): Promise<void> {
  try {
    // Use fetch directly to get the PDF blob
    const response = await fetch('/api/reports/prediction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        params, 
        result, 
        patientName: patientName || 'Anonymous',
        doctorName: doctorName || 'Healthcare Professional'
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error generating prediction report: ${errorText}`);
    }

    // Get the PDF blob from the response
    const blob = await response.blob();
    
    // Create a download link and trigger the download
    triggerDownload(blob, `prediction-report-${Date.now()}.pdf`);
  } catch (error) {
    console.error('Error generating prediction report:', error);
    throw error;
  }
}

/**
 * Generate and download a medical information report PDF
 * 
 * @param topic Topic of the report (symptoms, screening, treatment, etc.)
 * @param patientName Optional patient name for personalization
 * @param doctorName Optional doctor name for report attribution
 */
export async function generateMedicalInfoReport(
  topic: string = 'general',
  patientName?: string,
  doctorName?: string
): Promise<void> {
  try {
    // Use fetch directly to get the PDF blob
    const response = await fetch('/api/reports/medical-info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        topic, 
        patientName: patientName || 'Anonymous',
        doctorName: doctorName || 'Healthcare Professional'
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error generating medical information report: ${errorText}`);
    }

    // Get the PDF blob from the response
    const blob = await response.blob();
    
    // Create a download link and trigger the download
    triggerDownload(blob, `medical-info-${topic}-${Date.now()}.pdf`);
  } catch (error) {
    console.error('Error generating medical information report:', error);
    throw error;
  }
}

/**
 * Helper function to trigger a file download from a blob
 */
function triggerDownload(blob: Blob, filename: string): void {
  // Create a URL for the blob
  const url = URL.createObjectURL(blob);
  
  // Create a link element
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  
  // Append to the document temporarily
  document.body.appendChild(link);
  
  // Programmatically click the link to trigger the download
  link.click();
  
  // Cleanup
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}