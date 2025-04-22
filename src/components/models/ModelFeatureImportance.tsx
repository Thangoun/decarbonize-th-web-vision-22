
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from "recharts";
import { FeatureImportance } from "@/types/modelTypes";

// Tweak: wider left margin, dynamic height, fixed bar size, no cutoff
const BAR_HEIGHT = 26;

interface ModelFeatureImportanceProps {
  features: FeatureImportance[];
}

const getBarColor = (idx: number) => {
  // A pleasant gradient palette for bar colors (repeat colors if >7)
  const palette = [
    '#4ade80', '#34d399', '#2dd4bf', '#60a5fa', '#818cf8',
    '#a78bfa', '#f472b6', '#fbbf24', '#f87171', '#fb7185'
  ];
  return palette[idx % palette.length];
};

const ModelFeatureImportance = ({ features }: ModelFeatureImportanceProps) => {
  if (!features.length) {
    return null;
  }
  const chartHeight = Math.max(features.length * BAR_HEIGHT + 36, 290);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-green-700">Feature Importance</CardTitle>
        <CardDescription>
          Top 10 most influential features in the model
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full" style={{ height: chartHeight }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={features}
              margin={{ top: 8, right: 32, left: 200, bottom: 8 }}
              barCategoryGap="14%"
            >
              <CartesianGrid strokeDasharray="2 4" horizontal vertical={false} />
              <XAxis type="number" domain={[0, 'dataMax']} hide />
              <YAxis
                dataKey="feature"
                type="category"
                width={196}
                tick={{
                  fill: "#18212f",
                  fontSize: 13,
                  fontWeight: 700,
                  textShadow: "0 1px 0 #fff, 0 0px 1px #eee"
                }}
                tickLine={false}
                axisLine={false}
                interval={0}
              />
              <Tooltip
                formatter={(value: number) => [`${value.toFixed(3)}`, 'Importance']}
                labelFormatter={(label) => `Feature: ${label}`}
                wrapperClassName="!rounded-md !text-xs !shadow-2xl"
              />
              <Bar
                dataKey="importance"
                minPointSize={7}
                radius={[6, 6, 6, 6]}
                isAnimationActive
                barSize={18}
              >
                {features.map((entry, idx) => (
                  <Cell key={`bar-${entry.feature}`} fill={getBarColor(idx)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModelFeatureImportance;
