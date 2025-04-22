
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LabelList
} from 'recharts';
import { FeatureImportance } from "@/types/modelTypes";

interface ModelFeatureImportanceProps {
  features: FeatureImportance[];
}

const ModelFeatureImportance = ({ features }: ModelFeatureImportanceProps) => {
  // Sort features by importance (descending)
  const sortedFeatures = [...features].sort((a, b) => b.importance - a.importance);
  
  // Format tooltip to display percentage
  const formatTooltip = (value: number) => {
    return `${(value * 100).toFixed(2)}%`;
  };
  
  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded shadow-sm">
          <p className="font-medium">{label}</p>
          <p className="text-green-600">
            Importance: {formatTooltip(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  // Format feature names for better display if they're too long
  const formatFeatureName = (name: string) => {
    if (name.length > 20) {
      return name.slice(0, 18) + '...';
    }
    return name;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-green-700">Feature Importance</CardTitle>
        <CardDescription>
          Relative importance of features in the model prediction
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={sortedFeatures.slice(0, 10)}
              margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis 
                type="number" 
                domain={[0, Math.max(...sortedFeatures.map(f => f.importance)) * 1.1]} 
                tickFormatter={(val) => `${(val * 100).toFixed(0)}%`}
              />
              <YAxis 
                type="category" 
                dataKey="feature" 
                width={90}
                tick={(props) => {
                  const { x, y, payload } = props;
                  return (
                    <g transform={`translate(${x},${y})`}>
                      <text 
                        x={-3} 
                        y={0} 
                        dy={4} 
                        textAnchor="end" 
                        fill="#666"
                        style={{ 
                          fontSize: '12px',
                          fontWeight: payload.value === sortedFeatures[0].feature ? 'bold' : 'normal'
                        }}
                      >
                        {formatFeatureName(payload.value)}
                      </text>
                    </g>
                  );
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="importance" 
                fill="#16a34a"
                barSize={20}
              >
                {sortedFeatures.slice(0, 10).map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={index === 0 ? '#15803d' : '#22c55e'} 
                  />
                ))}
                <LabelList 
                  dataKey="importance" 
                  position="right"
                  formatter={formatTooltip}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModelFeatureImportance;
