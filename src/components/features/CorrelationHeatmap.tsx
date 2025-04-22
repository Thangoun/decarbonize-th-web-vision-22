import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart,
  Bar,
  Cell,
  CartesianGrid,
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Info } from 'lucide-react';
import { correlationData, formatFeatureName, getCorrelationsWithCO2, CorrelationPoint } from '@/utils/featureData';

interface CorrelationHeatmapProps {
  className?: string;
}

const CorrelationHeatmap: React.FC<CorrelationHeatmapProps> = ({ className }) => {
  const [showOnlyCO2, setShowOnlyCO2] = useState(false);
  const data = showOnlyCO2 ? getCorrelationsWithCO2() : correlationData;
  
  // Get unique feature names for axis
  const featureNames = Array.from(new Set(data.map(d => d.x)));
  
  // Custom color scale for the heatmap
  const getColor = (value: number) => {
    if (value >= 0.8) return '#15803d'; // Strong positive - dark green
    if (value >= 0.5) return '#22c55e'; // Moderate positive - medium green
    if (value >= 0.2) return '#86efac'; // Weak positive - light green
    if (value >= -0.2) return '#f3f4f6'; // Near zero - white/light gray
    if (value >= -0.5) return '#fca5a5'; // Weak negative - light red
    if (value >= -0.8) return '#ef4444'; // Moderate negative - medium red
    return '#b91c1c'; // Strong negative - dark red
  };

  // Helper to format cell data for display
  const formatCell = (point: CorrelationPoint) => {
    return {
      x: formatFeatureName(point.x),
      y: formatFeatureName(point.y),
      value: point.value.toFixed(2)
    };
  };

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-green-700">Feature Correlation Matrix</CardTitle>
            <CardDescription>
              Explore how different features relate to each other and to CO₂ emissions
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Switch 
              id="co2-only" 
              checked={showOnlyCO2} 
              onCheckedChange={setShowOnlyCO2} 
            />
            <Label htmlFor="co2-only">Show only CO₂ correlations</Label>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[500px] md:h-[600px] overflow-auto">
          <div className="min-w-[600px] min-h-[600px]">
            {showOnlyCO2 ? (
              <div className="h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={getCorrelationsWithCO2().map(item => ({
                      name: formatFeatureName(item.x),
                      value: Number(item.value.toFixed(2))
                    }))}
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
                      {getCorrelationsWithCO2().map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={getColor(entry.value)} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="relative">
                <div className="absolute -top-6 -left-6 text-xs text-gray-500">
                  <Info size={16} className="inline mr-1" />
                  Hover over cells to see exact correlation values
                </div>
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border p-1 bg-green-50"></th>
                      {featureNames.map(name => (
                        <th 
                          key={name} 
                          className="border p-1 bg-green-50 text-xs transform -rotate-45 origin-bottom-left h-24"
                        >
                          <div className="ml-2">{formatFeatureName(name)}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {featureNames.map(rowName => (
                      <tr key={rowName}>
                        <th className="border p-1 bg-green-50 text-xs text-left w-24">
                          {formatFeatureName(rowName)}
                        </th>
                        {featureNames.map(colName => {
                          const point = data.find(d => d.x === colName && d.y === rowName);
                          const value = point ? point.value : 0;
                          return (
                            <td 
                              key={`${rowName}-${colName}`} 
                              className="border p-0 relative group w-10 h-10 text-center"
                              style={{ backgroundColor: getColor(value) }}
                            >
                              <div className="opacity-0 group-hover:opacity-100 absolute bg-black text-white p-1 rounded text-xs -mt-8 left-1/2 transform -translate-x-1/2 z-10">
                                {formatFeatureName(rowName)} × {formatFeatureName(colName)}: {value.toFixed(2)}
                              </div>
                              <span className="text-xs font-medium">
                                {value === 1 ? "1" : value.toFixed(1)}
                              </span>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CorrelationHeatmap;
