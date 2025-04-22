
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

  // Custom color scale covering negative-positive spectrum
  const getBarColor = (correlation: number) => {
    if (correlation >= 0.8) return '#15803d'; // Dark green
    if (correlation >= 0.5) return '#22c55e'; // Medium green
    if (correlation >= 0.2) return '#bbf7d0'; // Light green
    if (correlation > -0.2) return '#f3f4f6'; // Near zero - background
    if (correlation > -0.5) return '#fca5a5'; // Light red
    if (correlation > -0.8) return '#fb7185'; // Red+ (red-400)
    return '#b91c1c'; // Strong negative
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
        <div className="w-full h-[420px] px-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 16, right: 32, left: 96, bottom: 12 }}
              barCategoryGap="16%"
            >
              <CartesianGrid strokeDasharray="2 3" horizontal vertical={false} />
              <XAxis
                type="number"
                domain={[-1, 1]}
                tickCount={9}
                ticks={[-1, -0.8, -0.5, -0.2, 0, 0.2, 0.5, 0.8, 1]}
                axisLine={false}
                tickLine={false}
                fontSize={13}
                tickFormatter={v => v.toFixed(1)}
              />
              <YAxis
                dataKey="name"
                type="category"
                width={126}
                tick={{ fontSize: 13, fontWeight: 600, fill: '#065f46' }}
                tickLine={false}
                axisLine={false}
                interval={0}
                // leave y-tick as feature names
              />
              <Tooltip
                cursor={{ fill: '#eee', opacity: 0.5 }}
                formatter={(value: number) => [`${value.toFixed(2)}`, 'Correlation']}
                labelFormatter={(label) => `Feature: ${label}`}
                wrapperClassName="!rounded-md !text-xs !shadow-2xl"
              />
              <Bar dataKey="value" minPointSize={5} radius={[5, 5, 5, 5]}>
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
