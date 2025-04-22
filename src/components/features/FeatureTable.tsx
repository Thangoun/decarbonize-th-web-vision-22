
import React from 'react';
import { motion } from 'framer-motion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { featureData, formatFeatureName } from '@/utils/featureData';
import { Badge } from "@/components/ui/badge";

interface FeatureTableProps {
  className?: string;
}

const FeatureTable: React.FC<FeatureTableProps> = ({ className }) => {
  // Sort features by correlation with CO2 (absolute value)
  const sortedFeatures = [...featureData].sort((a, b) => Math.abs(b.correlation) - Math.abs(a.correlation));
  
  // Helper to get the correlation badge color
  const getCorrelationBadgeColor = (correlation: number): string => {
    const absCorrelation = Math.abs(correlation);
    if (absCorrelation >= 0.7) return 'bg-green-700 hover:bg-green-800';
    if (absCorrelation >= 0.4) return 'bg-green-500 hover:bg-green-600';
    if (absCorrelation >= 0.2) return 'bg-green-300 hover:bg-green-400 text-green-900';
    return 'bg-gray-200 hover:bg-gray-300 text-gray-800';
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-green-700">Final Prediction Features</CardTitle>
        <CardDescription>
          Selected features for CO₂ emission prediction after VIF and correlation analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Feature</TableHead>
              <TableHead className="text-center">VIF</TableHead>
              <TableHead className="text-center">Correlation</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedFeatures.map((feature, index) => (
              <motion.tr
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-green-50"
                component={TableRow}
              >
                <TableCell className="font-medium">{formatFeatureName(feature.name)}</TableCell>
                <TableCell className="text-center">
                  <Badge variant="outline" className="bg-gray-100">
                    {feature.vif.toFixed(2)}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <Badge className={getCorrelationBadgeColor(feature.correlation)}>
                    {feature.correlation.toFixed(2)}
                  </Badge>
                </TableCell>
                <TableCell>{feature.description}</TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default FeatureTable;
