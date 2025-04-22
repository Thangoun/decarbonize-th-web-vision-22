import { ModelMetrics, ModelPrediction, ModelSummary } from "@/types/modelTypes";

const xgboostPredictions: ModelPrediction[] = [
  {"year":2010,"actual":288.109,"predicted":289.843},
  {"year":2011,"actual":290.234,"predicted":292.017},
  {"year":2012,"actual":292.376,"predicted":293.545},
  {"year":2013,"actual":291.816,"predicted":293.062},
  {"year":2014,"actual":292.142,"predicted":292.957},
  {"year":2015,"actual":289.323,"predicted":290.651},
  {"year":2016,"actual":290.751,"predicted":290.977},
  {"year":2017,"actual":294.739,"predicted":293.850},
  {"year":2018,"actual":295.358,"predicted":294.914},
  {"year":2019,"actual":295.501,"predicted":295.377},
  {"year":2020,"actual":277.667,"predicted":278.892},
  {"year":2021,"actual":287.658,"predicted":286.821},
  {"year":2022,"actual":288.710,"predicted":289.621},
  {"year":2023,"actual":264.389,"predicted":268.900}
];

const xgboostFeatures = {
  "population": 0.1841,
  "gdp": 0.1699,
  "co2_growth_abs": 0.1023,
  "cement_co2_per_capita": 0.0942,
  "energy_per_capita": 0.0895,
  "co2_including_luc_growth_abs": 0.0847,
  "co2_per_gdp": 0.0708,
  "co2_per_unit_energy": 0.0627,
  "coal_co2_per_capita": 0.0483,
  "co2_including_luc_per_gdp": 0.0397
};

const randomForestPredictions: ModelPrediction[] = [
  {"year":2010,"actual":241.019,"predicted":253.129},
  {"year":2011,"actual":244.878,"predicted":251.118},
  {"year":2012,"actual":262.348,"predicted":268.739},
  {"year":2013,"actual":263.754,"predicted":270.594},
  {"year":2014,"actual":272.488,"predicted":276.495},
  {"year":2015,"actual":277.099,"predicted":274.579},
  {"year":2016,"actual":284.045,"predicted":285.961},
  {"year":2017,"actual":283.348,"predicted":284.684},
  {"year":2018,"actual":288.305,"predicted":298.956},
  {"year":2019,"actual":281.877,"predicted":291.954},
  {"year":2020,"actual":271.923,"predicted":260.667},
  {"year":2021,"actual":267.142,"predicted":270.900},
  {"year":2022,"actual":272.573,"predicted":281.046},
  {"year":2023,"actual":264.389,"predicted":277.655}
];

const randomForestFeatures = {
  "gdp": 0.8042,
  "cement_co2_per_capita": 0.093,
  "co2_per_gdp": 0.0483,
  "energy_per_capita": 0.0144,
  "temperature_change_from_n2o": 0.013,
  "coal_co2_per_capita": 0.012,
  "nitrous_oxide_per_capita": 0.005,
  "population": 0.0038,
  "year": 0.0016,
  "flaring_co2_per_capita": 0.0014
};

const lightgbmPredictions: ModelPrediction[] = [
  {"year":2010,"actual":241.019,"predicted":247.423},
  {"year":2011,"actual":244.878,"predicted":266.465},
  {"year":2012,"actual":262.348,"predicted":267.618},
  {"year":2013,"actual":263.754,"predicted":287.052},
  {"year":2014,"actual":272.488,"predicted":286.898},
  {"year":2015,"actual":277.099,"predicted":287.091},
  {"year":2016,"actual":284.045,"predicted":287.387},
  {"year":2017,"actual":283.348,"predicted":294.988},
  {"year":2018,"actual":288.305,"predicted":294.168},
  {"year":2019,"actual":281.877,"predicted":292.557},
  {"year":2020,"actual":271.923,"predicted":278.573},
  {"year":2021,"actual":267.142,"predicted":280.190},
  {"year":2022,"actual":272.573,"predicted":275.998},
  {"year":2023,"actual":264.389,"predicted":269.650}
];

const lightgbmFeatures = {
  "gdp": 836,
  "co2_per_gdp": 745,
  "population": 572,
  "temperature_change_from_n2o": 527,
  "co2_growth_abs": 443,
  "co2_per_unit_energy": 355,
  "co2_including_luc_growth_abs": 319,
  "cement_co2_per_capita": 310,
  "year": 290,
  "co2_including_luc_per_gdp": 288
};

const gradientBoostingPredictions: ModelPrediction[] = [
  {"year":2010,"actual":241.019,"predicted":227.973},
  {"year":2011,"actual":244.878,"predicted":214.194},
  {"year":2012,"actual":262.348,"predicted":265.010},
  {"year":2013,"actual":263.754,"predicted":254.871},
  {"year":2014,"actual":272.488,"predicted":259.793},
  {"year":2015,"actual":277.099,"predicted":258.597},
  {"year":2016,"actual":284.045,"predicted":256.020},
  {"year":2017,"actual":283.348,"predicted":249.374},
  {"year":2018,"actual":288.305,"predicted":286.964},
  {"year":2019,"actual":281.877,"predicted":295.914},
  {"year":2020,"actual":271.923,"predicted":253.108},
  {"year":2021,"actual":267.142,"predicted":291.513},
  {"year":2022,"actual":272.573,"predicted":286.058},
  {"year":2023,"actual":264.389,"predicted":288.834}
];

const gradientBoostingFeatures = {};

const catboostPredictions: ModelPrediction[] = [
  {"year":2010,"actual":241.019,"predicted":234.744},
  {"year":2011,"actual":244.878,"predicted":233.445},
  {"year":2012,"actual":262.348,"predicted":250.616},
  {"year":2013,"actual":263.754,"predicted":256.101},
  {"year":2014,"actual":272.488,"predicted":263.027},
  {"year":2015,"actual":277.099,"predicted":265.584},
  {"year":2016,"actual":284.045,"predicted":274.165},
  {"year":2017,"actual":283.348,"predicted":295.600},
  {"year":2018,"actual":288.305,"predicted":296.741},
  {"year":2019,"actual":281.877,"predicted":300.781},
  {"year":2020,"actual":271.923,"predicted":300.610},
  {"year":2021,"actual":267.142,"predicted":289.136},
  {"year":2022,"actual":272.573,"predicted":281.739},
  {"year":2023,"actual":264.389,"predicted":270.186}
];

const catboostFeatures = {
  "temperature_change_from_n2o": 42.9002,
  "gdp": 19.9944,
  "cement_co2_per_capita": 12.234,
  "coal_co2_per_capita": 7.0124,
  "co2_per_gdp": 5.0642,
  "population": 4.4205,
  "nitrous_oxide_per_capita": 1.9808,
  "co2_including_luc_per_gdp": 1.5961,
  "energy_per_capita": 1.4898,
  "co2_per_unit_energy": 1.1415
};

// Helper function to calculate metrics
const calculateMetrics = (predictions: ModelPrediction[]) => {
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
const convertFeatureImportance = (features: Record<string, number>) => {
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
    featureImportance: convertFeatureImportance(gradientBoostingFeatures),
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
