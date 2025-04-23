
import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";

const modelDataHardcoded = [
  {
    id: "xgboost",
    name: "XGBoost",
    rmse: 5.8318,
    mae: 3.9081,
    r2: 0.9968,
  },
  {
    id: "random_forest",
    name: "Random Forest",
    rmse: 5.9307,
    mae: 4.2114,
    r2: 0.9967,
  },
  {
    id: "lightgbm",
    name: "LightGBM",
    rmse: 6.3213,
    mae: 4.2731,
    r2: 0.9963,
  },
  {
    id: "catboost",
    name: "CatBoost",
    rmse: 7.5339,
    mae: 5.1476,
    r2: 0.9947,
  },
  {
    id: "gradient_boosting",
    name: "Gradient Boosting",
    rmse: 17.1723,
    mae: 11.8765,
    r2: 0.9726,
  },
];

const Models = () => {
  return (
    <div className="min-h-screen pt-16">
      <motion.section 
        className="relative py-16 bg-gradient-to-b from-green-50 to-white overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="section-container text-center">
          <div className="inline-block p-2 bg-green-100 rounded-full mb-4">
            <BarChart3 className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-green-800 mb-6">Model Performance Analysis</h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
            Compare and analyze the performance of different machine learning models 
            for predicting CO₂ emissions in Thailand.
          </p>
        </div>
      </motion.section>

      <section className="py-12">
        <div className="section-container">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl border border-green-100 shadow-sm">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left font-bold text-green-700">Model</th>
                  <th className="px-6 py-3 text-right font-bold text-green-700">RMSE</th>
                  <th className="px-6 py-3 text-right font-bold text-green-700">MAE</th>
                  <th className="px-6 py-3 text-right font-bold text-green-700">R²</th>
                </tr>
              </thead>
              <tbody>
                {modelDataHardcoded.map((model, idx) => (
                  <tr key={model.id} className={idx % 2 === 0 ? "bg-green-50" : ""}>
                    <td className="px-6 py-3 font-medium text-green-700">{model.name}</td>
                    <td className="px-6 py-3 text-right">{model.rmse.toFixed(4)}</td>
                    <td className="px-6 py-3 text-right">{model.mae.toFixed(4)}</td>
                    <td className="px-6 py-3 text-right">{model.r2.toFixed(4)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Models;
