
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { missingRatioByYear } from "@/utils/thailandData";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";

const YearlyMissingRatio = () => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-2xl text-green-700">Average Missing Value Ratio by Year</CardTitle>
        <CardDescription>
          Showing the reduction in missing data over time and justification for 1950 cutoff
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ChartContainer
            config={{
              missing_ratio: {
                label: "Missing Ratio",
                color: "#6366f1"
              }
            }}
          >
            <LineChart 
              data={missingRatioByYear}
              margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="year" 
                angle={-45} 
                textAnchor="end"
                height={60}
                interval={2}
              />
              <YAxis 
                tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                domain={[0, 1]}
              />
              <ChartTooltip
                formatter={(value) => `${(Number(value) * 100).toFixed(2)}%`}
              />
              <Line 
                type="monotone" 
                dataKey="missing_ratio" 
                stroke="#6366f1" 
                strokeWidth={2}
                dot={{ r: 2 }}
                activeDot={{ r: 5 }}
              />
              <ReferenceLine 
                x={1950} 
                stroke="#ef4444" 
                strokeDasharray="5 5"
                label={{ 
                  value: "1950 cutoff", 
                  position: "bottom", 
                  fill: "#ef4444", 
                  fontSize: 12
                }}
              />
            </LineChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default YearlyMissingRatio;
