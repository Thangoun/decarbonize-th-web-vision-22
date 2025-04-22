
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, LineChart, Line } from "recharts";
import { modelMetrics, xgboostArchitecture } from "@/utils/modelData";
import { ModelMetrics } from "@/types/modelTypes";
import { Info } from "lucide-react";

const COLORS = ['#22c55e', '#16a34a', '#4ade80', '#86efac', '#bbf7d0'];

const ModelDetails = () => {
  const [selectedModel, setSelectedModel] = useState<string>("xgboost");

  return (
    <section className="py-12 bg-green-50">
      <div className="section-container">
        <h2 className="section-title">Model Details</h2>
        <p className="text-gray-700 mb-8">
          Explore the features, predictions, and configurations of our machine learning models.
        </p>
        
        <Tabs value={selectedModel} onValueChange={setSelectedModel}>
          <div className="flex justify-center mb-6 overflow-x-auto">
            <TabsList className="h-auto flex-wrap">
              {modelMetrics.map((model: ModelMetrics) => (
                <TabsTrigger 
                  key={model.id} 
                  value={model.id}
                  className="px-4 py-2 data-[state=active]:bg-green-600 data-[state=active]:text-white"
                >
                  {model.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          {modelMetrics.map((model: ModelMetrics) => (
            <TabsContent key={model.id} value={model.id}>
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-700">Prediction Accuracy</CardTitle>
                    <CardDescription>
                      Comparison of actual vs. predicted values
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[350px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="year" />
                          <YAxis domain={[260, 300]} label={{ value: 'CO₂ Emissions (MT)', angle: -90, position: 'insideLeft' }} />
                          <Tooltip />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="actual" 
                            name="Actual" 
                            stroke="#3b82f6" 
                            strokeWidth={2} 
                            dot={{ r: 6 }}
                            activeDot={{ r: 8 }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="predicted" 
                            name="Predicted" 
                            stroke="#22c55e" 
                            strokeWidth={2} 
                            dot={{ r: 6 }}
                            activeDot={{ r: 8 }}
                            strokeDasharray="5 5"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-700">Feature Importance</CardTitle>
                    <CardDescription>
                      Relative importance of each feature in the model
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[350px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          layout="vertical"
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" domain={[0, 30]} unit="%" />
                          <YAxis dataKey="feature" type="category" width={150} />
                          <Tooltip formatter={(value) => [`${value}%`, 'Importance']} />
                          <Bar dataKey="importance" fill="#22c55e">
                            {modelMetrics.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default ModelDetails;
