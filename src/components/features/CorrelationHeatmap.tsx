
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";
import { correlationData, formatFeatureName, CorrelationPoint } from '@/utils/featureData';

interface CorrelationHeatmapProps {
  className?: string;
}

const CorrelationHeatmap: React.FC<CorrelationHeatmapProps> = ({ className }) => {
  // Get sorted unique feature names for axis (ensures order and CO₂ on the end)
  const co2Index = correlationData.map(d => d.x).lastIndexOf("co2");
  const featureNames = Array.from(new Set(correlationData.map(d => d.x).filter(x => x !== "co2")));
  featureNames.push("co2");

  // Improved color scale for negative/positive values (from red to white to green)
  const getColor = (value: number) => {
    // Linear scale with stronger visible red for negative, green for positive
    // -1 => #f87171 (red-400), 0 => #f3f4f6 (gray-100), 1 => #22c55e (green-500)
    if (value >= 0.8) return '#15803d';   // Strong positive - dark green
    if (value >= 0.5) return '#22c55e';   // Positive - green
    if (value >= 0.2) return '#bbf7d0';   // Light green
    if (value > -0.2) return '#f3f4f6';   // Near zero - bg
    if (value > -0.5) return '#fca5a5';   // Light red
    if (value > -0.8) return '#fb7185';   // Red-400
    return '#b91c1c';                     // Strong negative - dark red
  };

  // Helper to format cell data for display
  const formatCell = (point: CorrelationPoint) => ({
    x: formatFeatureName(point.x),
    y: formatFeatureName(point.y),
    value: point.value.toFixed(2)
  });

  return (
    <Card className={className + " overflow-x-auto"}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-green-700">Feature Correlation Matrix</CardTitle>
            <CardDescription>
              Explore how different features relate to each other and to CO₂ emissions.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] md:h-[600px] overflow-auto pb-6">
          <div className="min-w-[700px] min-h-[560px]">
            <div className="relative mb-2">
              <div className="absolute -top-5 left-0 text-xs text-gray-500">
                <Info size={16} className="inline mr-1" />
                Hover over a cell for exact correlation value
              </div>
            </div>
            <table className="w-full border-collapse bg-white rounded-lg shadow-lg overflow-hidden">
              <thead>
                <tr>
                  <th className="border p-2 bg-green-50 sticky left-0 z-10"></th>
                  {featureNames.map(name => (
                    <th
                      key={name}
                      className="border p-2 bg-green-50 text-xs rotate-[-35deg] whitespace-nowrap"
                      style={{ height: '54px', verticalAlign: 'bottom', minWidth: 48, fontWeight: 700 }}
                    >
                      <div>{formatFeatureName(name)}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {featureNames.map(rowName => (
                  <tr key={rowName}>
                    <th className="border p-2 bg-green-50 text-xs text-left w-32 sticky left-0 z-10 font-semibold">
                      {formatFeatureName(rowName)}
                    </th>
                    {featureNames.map(colName => {
                      const point = correlationData.find(d => d.x === colName && d.y === rowName);
                      const value = point ? point.value : 0;
                      // dim diagonal (self) and highlight highest values
                      const isDiagonal = colName === rowName;
                      return (
                        <td
                          key={`${rowName}-${colName}`}
                          className={`
                            border p-0 relative group text-center font-semibold align-middle w-10 h-10
                            ${isDiagonal ? "opacity-70 bg-gray-100" : ""}
                          `}
                          style={{ backgroundColor: getColor(value) }}
                        >
                          {!isDiagonal ? (
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-medium">
                              <span className="">{Math.abs(value) === 1 ? "1" : value.toFixed(2)}</span>
                            </div>
                          ) : (
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs opacity-70 font-normal">
                              —
                            </div>
                          )}
                          {/* Tooltip */}
                          <div className="opacity-0 group-hover:opacity-100 absolute -top-9 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs z-20 whitespace-nowrap pointer-events-none"
                            style={{ fontSize: 12 }}
                          >
                            {formatFeatureName(rowName)} × {formatFeatureName(colName)}: {value.toFixed(2)}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex flex-row justify-end gap-4 mt-4 px-2">
              <div className="flex items-center gap-2">
                <span className="block h-4 w-8 rounded bg-[#15803d] border border-gray-200"></span>
                <span className="text-xs text-gray-600">Strong positive</span>
                <span className="block h-4 w-8 rounded bg-[#f3f4f6] border border-gray-200 mx-2"></span>
                <span className="text-xs text-gray-600">Neutral</span>
                <span className="block h-4 w-8 rounded bg-[#f87171] border border-gray-200 mx-2"></span>
                <span className="text-xs text-gray-600">Strong negative</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CorrelationHeatmap;
