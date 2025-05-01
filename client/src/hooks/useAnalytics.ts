import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export interface AnalyticsDataset {
  name: string;
  data: number[];
}

export interface ChartData {
  labels: string[];
  datasets: AnalyticsDataset[];
}

export interface MedicalAnalyticsData {
  ageDistribution: ChartData;
  riskFactorCorrelation: ChartData;
  survivalRates: ChartData;
  treatmentEfficacy: ChartData;
  diagnosticAccuracy: ChartData;
  geographicDistribution: ChartData;
  biomarkerAnalysis: ChartData;
  yearlyTrends: ChartData;
  featureImportance: ChartData;
  sideEffectsComparison: ChartData;
  lastUpdated: string;
}

export function useAnalytics() {
  return useQuery<MedicalAnalyticsData>({
    queryKey: ['/api/analytics'],
    // We can use the default queryFn as it's already configured in QueryClient
    refetchOnWindowFocus: false,
    refetchInterval: 1000 * 60 * 60, // Refetch every hour
  });
}