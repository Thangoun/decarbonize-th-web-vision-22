
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Info } from "lucide-react";
import { modelMetrics, metricsExplained } from "@/utils/modelData";

const ModelComparison = () => {
  return (
    <section className="py-12">
      <div className="section-container">
        <h2 className="section-title">Model Comparison</h2>
        <p className="text-gray-700 mb-8">
          We evaluated several machine learning algorithms to find the best approach for predicting carbon emissions.
          The metrics below show how each model performed on our test dataset.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle className="text-green-700">Performance Metrics</CardTitle>
              <CardDescription>
                Comparing error metrics and training times across models
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={modelMetrics}
                    margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={0} textAnchor="middle" />
                    <YAxis 
                      yAxisId="left"
                      orientation="left"
                      label={{ value: 'Error (MT CO₂)', angle: -90, position: 'insideLeft' }}
                    />
                    <YAxis 
                      yAxisId="right" 
                      orientation="right"
                      label={{ value: 'R² Score', angle: 90, position: 'insideRight' }}
                      domain={[0, 1]}
                    />
                    <Tooltip />
                    <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: 10 }} />
                    <Bar yAxisId="left" dataKey="rmse" name="RMSE" fill="#ef4444" />
                    <Bar yAxisId="left" dataKey="mae" name="MAE" fill="#f97316" />
                    <Bar yAxisId="right" dataKey="r2" name="R² Score" fill="#22c55e" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-center mt-4 text-sm text-gray-500">
                <Info size={16} className="mr-2 text-green-600" />
                Lower MAE and RMSE values indicate better performance, while higher R² is better
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-green-700">Performance Metrics Explained</CardTitle>
              <CardDescription>
                Understanding the evaluation criteria used to select the best model
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Metric</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {metricsExplained.map((metric, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{metric.name}</TableCell>
                      <TableCell>{metric.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ModelComparison;
