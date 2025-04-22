
export interface ModelMetrics {
  name: string;
  mae: number;
  rmse: number;
  r2: number;
  trainTime: number;
  id: string;
}

export type PredictionData = {
  year: number;
  actual: number;
  predicted: number;
}[];

export interface FeatureImportance {
  feature: string;
  importance: number;
}

export interface ModelArchitecture {
  stage: string;
  nodes: string;
  description: string;
}
