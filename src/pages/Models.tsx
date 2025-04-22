
import HeroSection from "@/components/models/HeroSection";
import ModelComparison from "@/components/models/ModelComparison";
import ModelDetails from "@/components/models/ModelDetails";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const Models = () => {
  return (
    <div className="min-h-screen pt-16">
      <HeroSection />
      <ModelComparison />
      <ModelDetails />
      
      <section className="py-12 bg-gradient-to-br from-green-700 to-green-900 text-white">
        <div className="section-container">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">See the Model in Action!</h2>
            <p className="max-w-2xl mx-auto mb-8 text-green-100">
              Try our interactive demo to see how our XGBoost model predicts carbon emissions based on different inputs.
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
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Models;
