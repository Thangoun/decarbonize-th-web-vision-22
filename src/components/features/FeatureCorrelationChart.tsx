
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
  // Prepare data
  const chartData = featureData
    .map(feature => ({
      name: formatFeatureName(feature.name),
      value: feature.correlation
    }))
    .sort((a, b) => b.value - a.value);

  // Color scale for correlation range
  const getBarColor = (correlation: number) => {
    if (correlation >= 0.8) return '#15803d';
    if (correlation >= 0.5) return '#22c55e';
    if (correlation >= 0.2) return '#bbf7d0';
    if (correlation > -0.2) return '#f3f4f6';
    if (correlation > -0.5) return '#fca5a5';
    if (correlation > -0.8) return '#fb7185';
    return '#b91c1c';
  };

  // Custom Y-Axis tick for multiline/ellipsed labels
  const renderYAxisTick = (props: any) => {
    const { x, y, payload, width, height } = props;
    // Manually wrap name to max line length
    const words = payload.value.split(' ');
    let lines: string[] = [];
    let curr = "";
    words.forEach(word => {
      if (curr.length + word.length <= 16) {
        curr = (curr ? curr + " " : "") + word;
      } else {
        lines.push(curr);
        curr = word;
      }
    });
    if (curr) lines.push(curr);

    return (
      <g>
        {lines.map((line, idx) => (
          <text
            key={idx}
            x={x}
            y={y + idx * 13 - ((lines.length-1) * 6.5)}
            textAnchor="end"
            width={126}
            fill="#065f46"
            style={{
              fontSize: '13px',
              fontWeight: 600,
              lineHeight: 1.1,
              textShadow: "0 1px 0 #fff, 0 0px 1px #eee"
            }}
            dominantBaseline="middle"
          >
            {line.length > 28 ? line.slice(0, 28) + '…' : line}
          </text>
        ))}
      </g>
    );
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
        <div className="w-full h-[520px] md:h-[440px] px-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 12, right: 32, left: 160, bottom: 12 }}
              barCategoryGap="18%"
            >
              <CartesianGrid strokeDasharray="3 5" horizontal vertical={false} />
              <XAxis
                type="number"
                domain={[-1, 1]}
                tickCount={9}
                ticks={[-1, -0.8, -0.5, -0.2, 0, 0.2, 0.5, 0.8, 1]}
                axisLine={false}
                tickLine={false}
                fontSize={13}
                stroke="#aaaaaa"
                tickFormatter={v => v.toFixed(1)}
              />
              <YAxis
                dataKey="name"
                type="category"
                width={154}
                tick={renderYAxisTick}
                tickLine={false}
                axisLine={false}
                interval={0}
              />
              <Tooltip
                cursor={{ fill: '#eee', opacity: 0.5 }}
                formatter={(value: number) => [`${value.toFixed(2)}`, 'Correlation']}
                labelFormatter={(label) => `Feature: ${label}`}
                wrapperClassName="!rounded-md !text-xs !shadow-2xl"
              />
              <Bar
                dataKey="value"
                minPointSize={8}
                radius={[7, 7, 7, 7]}
                isAnimationActive
              >
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
