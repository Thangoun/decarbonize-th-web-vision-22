
import React from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Cell 
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { featureData, formatFeatureName } from '@/utils/featureData';

interface FeatureCorrelationChartProps {
  className?: string;
}

const FeatureCorrelationChart: React.FC<FeatureCorrelationChartProps> = ({ className }) => {
  // Format data for the chart
  const chartData = featureData
    .map(feature => ({
      name: formatFeatureName(feature.name),
      value: feature.correlation
    }))
    .sort((a, b) => b.value - a.value);

  // Custom colors
  const getBarColor = (correlation: number) => {
    if (correlation >= 0.7) return '#15803d'; // Dark green
    if (correlation >= 0.3) return '#22c55e'; // Medium green
    if (correlation >= 0.1) return '#86efac'; // Light green
    if (correlation >= -0.1) return '#d1d5db'; // Gray
    if (correlation >= -0.3) return '#fca5a5'; // Light red
    return '#ef4444'; // Red
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-green-700">Feature Correlation with CO₂</CardTitle>
        <CardDescription>
          How strongly each feature correlates with CO₂ emissions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 150, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                type="number" 
                domain={[-1, 1]} 
                tickCount={11} 
                ticks={[-1, -0.8, -0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6, 0.8, 1]} 
              />
              <YAxis 
                dataKey="name" 
                type="category" 
                width={150}
                tickLine={false}
              />
              <Tooltip 
                formatter={(value: number) => [`${value}`, 'Correlation with CO₂']}
                labelFormatter={(label) => `Feature: ${label}`}
              />
              <Bar dataKey="value" minPointSize={2}>
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={getBarColor(entry.value)} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureCorrelationChart;
