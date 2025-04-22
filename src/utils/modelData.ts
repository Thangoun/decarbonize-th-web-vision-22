
import { ModelMetrics, ModelArchitecture } from "@/types/modelTypes";

// Model comparison data
export const modelMetrics: ModelMetrics[] = [
  { name: "XGBoost", mae: 1.82, rmse: 2.41, r2: 0.927, trainTime: 63, id: "xgboost" },
  { name: "Random Forest", mae: 2.14, rmse: 2.76, r2: 0.903, trainTime: 49, id: "random-forest" },
  { name: "LightGBM", mae: 2.37, rmse: 3.02, r2: 0.886, trainTime: 128, id: "lightgbm" },
  { name: "Gradient Boosting", mae: 2.91, rmse: 3.62, r2: 0.865, trainTime: 87, id: "gradient-boosting" },
  { name: "CatBoost", mae: 2.69, rmse: 3.25, r2: 0.882, trainTime: 92, id: "catboost" }
];

// XGBoost model architecture example
export const xgboostArchitecture: ModelArchitecture[] = [
  { stage: "Input Layer", nodes: "Feature Vector (48 features)", description: "Standardized input features" },
  { stage: "Tree 1", nodes: "Depth: 6", description: "First decision tree in the ensemble" },
  { stage: "Tree 2", nodes: "Depth: 6", description: "Second tree, focuses on residuals from Tree 1" },
  { stage: "Tree n", nodes: "Total Trees: 200", description: "Each subsequent tree learns from previous trees' errors" },
  { stage: "Output", nodes: "Weighted Sum", description: "Final prediction combines all trees' outputs" }
];

// Performance metrics explained
export const metricsExplained = [
  {
    name: "MAE (Mean Absolute Error)",
    description: "The average of the absolute differences between predictions and actual values. Lower is better.",
    relevance: "Provides an easy-to-understand measure of error magnitude in the original unit (Mt CO₂)."
  },
  {
    name: "RMSE (Root Mean Square Error)",
    description: "Square root of the average of squared differences between predictions and actual values. Lower is better.",
    relevance: "Penalizes large errors more heavily than small ones, making it sensitive to outliers."
  },
  {
    name: "R² (Coefficient of Determination)",
    description: "Represents the proportion of variance in the dependent variable explained by the model. Closer to 1 is better.",
    relevance: "Indicates how well the model explains the variation in carbon emissions data."
  },
  {
    name: "Training Time",
    description: "Time taken to train the model in seconds.",
    relevance: "Reflects computational efficiency, important for retraining and deployment."
  }
];
