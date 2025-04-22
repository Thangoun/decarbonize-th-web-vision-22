
import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";
import ModelTabs from "@/components/models/ModelTabs";
import { modelData, getBestModel } from "@/utils/modelData";

const Models = () => {
  const bestModel = getBestModel(modelData);

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
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

      {/* Model Comparison Section */}
      <section className="py-12">
        <div className="section-container">
          <ModelTabs models={modelData} bestModelId={bestModel.id} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-br from-green-700 to-green-900 text-white">
        <div className="section-container">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Try the Model Yourself!</h2>
            <p className="max-w-2xl mx-auto mb-8 text-green-100">
              Use our interactive demo to see how our {bestModel.name} model predicts carbon emissions based on different inputs.
            </p>
            <motion.div
              className="inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a 
                href="/demo" 
                className="inline-flex items-center bg-white text-green-700 px-6 py-3 rounded-md font-medium hover:bg-green-50 transition-colors"
              >
                Try the Demo
                <BarChart3 className="ml-2 h-5 w-5" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Models;
