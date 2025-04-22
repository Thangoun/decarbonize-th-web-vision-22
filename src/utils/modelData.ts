
import { ModelMetrics } from "@/types/modelTypes";

// Prediction data for each model
const xgboostPredictions = [
  {"year":2000,"actual":261.769,"predicted":265.693},
  // ... rest of xgboost predictions
];

const randomForestPredictions = [
  {"year":2000,"actual":167.352,"predicted":173.213},
  // ... rest of random forest predictions
];

const lightgbmPredictions = [
  {"year":2000,"actual":167.352,"predicted":168.525},
  // ... rest of lightgbm predictions
];

const gradientBoostingPredictions = [
  {"year":2000,"actual":167.352,"predicted":192.637},
  // ... rest of gradient boosting predictions
];

const catboostPredictions = [
  {"year":2000,"actual":167.352,"predicted":163.797},
  // ... rest of catboost predictions
];

// Feature importances for each model
const xgboostFeatures = {
  "population": 0.1841,
  "gdp": 0.1699,
  // ... rest of xgboost features
};

const randomForestFeatures = {
  "gdp": 0.8042,
  "cement_co2_per_capita": 0.093,
  // ... rest of random forest features
};

const lightgbmFeatures = {
  "gdp": 836,
  "co2_per_gdp": 745,
  // ... rest of lightgbm features
};

const catboostFeatures = {
  "temperature_change_from_n2o": 42.9002,
  "gdp": 19.9944,
  // ... rest of catboost features
};

// Helper function to calculate metrics
const calculateMetrics = (predictions: { actual: number; predicted: number }[]) => {
  const n = predictions.length;
  const mse = predictions.reduce((acc, curr) => acc + Math.pow(curr.predicted - curr.actual, 2), 0) / n;
  const mae = predictions.reduce((acc, curr) => acc + Math.abs(curr.predicted - curr.actual), 0) / n;
  const rmse = Math.sqrt(mse);
  
  const actualMean = predictions.reduce((acc, curr) => acc + curr.actual, 0) / n;
  const totalSS = predictions.reduce((acc, curr) => acc + Math.pow(curr.actual - actualMean, 2), 0);
  const resSS = predictions.reduce((acc, curr) => acc + Math.pow(curr.predicted - curr.actual, 2), 0);
  const r2 = 1 - (resSS / totalSS);
  
  return { rmse, mae, r2 };
};

// Convert feature importance objects to arrays
const convertFeatureImportance = (features: Record<string, number>): { feature: string; importance: number }[] => {
  return Object.entries(features)
    .map(([feature, importance]) => ({ feature, importance }))
    .sort((a, b) => b.importance - a.importance)
    .slice(0, 10);
};

export const modelData: ModelMetrics[] = [
  {
    name: "XGBoost",
    id: "xgboost",
    predictions: xgboostPredictions,
    featureImportance: convertFeatureImportance(xgboostFeatures),
    metrics: calculateMetrics(xgboostPredictions)
  },
  {
    name: "Random Forest",
    id: "random_forest",
    predictions: randomForestPredictions,
    featureImportance: convertFeatureImportance(randomForestFeatures),
    metrics: calculateMetrics(randomForestPredictions)
  },
  {
    name: "LightGBM",
    id: "lightgbm",
    predictions: lightgbmPredictions,
    featureImportance: convertFeatureImportance(lightgbmFeatures),
    metrics: calculateMetrics(lightgbmPredictions)
  },
  {
    name: "Gradient Boosting",
    id: "gradient_boosting",
    predictions: gradientBoostingPredictions,
    featureImportance: convertFeatureImportance({}), // Using empty object as data wasn't provided
    metrics: calculateMetrics(gradientBoostingPredictions)
  },
  {
    name: "CatBoost",
    id: "catboost",
    predictions: catboostPredictions,
    featureImportance: convertFeatureImportance(catboostFeatures),
    metrics: calculateMetrics(catboostPredictions)
  }
];

export const getBestModel = (models: ModelMetrics[]): ModelSummary => {
  return models.reduce((best, current) => {
    if (current.metrics.rmse < best.metrics.rmse) {
      return {
        name: current.name,
        id: current.id,
        metrics: current.metrics
      };
    }
    return best;
  }, {
    name: models[0].name,
    id: models[0].id,
    metrics: models[0].metrics
  });
};
