
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RChartTooltip, Legend as RChartLegend } from 'recharts';

// Your provided cleaned sample records
const cleanedData = [
  {
    year: 1950, population: 20428403.0, gdp: 26094198784.0, cement_co2_per_capita: 0.004, co2_growth_abs: 0.894,
    co2_including_luc_growth_abs: -2.338, co2_including_luc_per_gdp: 8.579, co2_including_luc_per_unit_energy: 8.235,
    co2_per_gdp: 0.037, co2_per_unit_energy: 0.242, coal_co2_per_capita: 0.002, energy_per_capita: 992.445,
    flaring_co2_per_capita: 0.003, nitrous_oxide_per_capita: 0.288, temperature_change_from_n2o: 0.0,
    country: "Thailand", co2: 0.956
  },
  {
    year: 1951, population: 20965189.0, gdp: 27943960576.0, cement_co2_per_capita: 0.007, co2_growth_abs: 0.135,
    co2_including_luc_growth_abs: 0.458, co2_including_luc_per_gdp: 8.028, co2_including_luc_per_unit_energy: 8.235,
    co2_per_gdp: 0.039, co2_per_unit_energy: 0.242, coal_co2_per_capita: 0.002, energy_per_capita: 992.445,
    flaring_co2_per_capita: 0.003, nitrous_oxide_per_capita: 0.282, temperature_change_from_n2o: 0.0,
    country: "Thailand", co2: 1.091
  },
  {
    year: 1952, population: 21527581.0, gdp: 29485821952.0, cement_co2_per_capita: 0.006, co2_growth_abs: 0.187,
    co2_including_luc_growth_abs: 7.96, co2_including_luc_per_gdp: 7.878, co2_including_luc_per_unit_energy: 8.235,
    co2_per_gdp: 0.043, co2_per_unit_energy: 0.242, coal_co2_per_capita: 0.003, energy_per_capita: 992.445,
    flaring_co2_per_capita: 0.003, nitrous_oxide_per_capita: 0.277, temperature_change_from_n2o: 0.0,
    country: "Thailand", co2: 1.278
  },
  {
    year: 1953, population: 22109322.0, gdp: 32726595584.0, cement_co2_per_capita: 0.006, co2_growth_abs: 0.366,
    co2_including_luc_growth_abs: 4.407, co2_including_luc_per_gdp: 7.233, co2_including_luc_per_unit_energy: 8.235,
    co2_per_gdp: 0.05, co2_per_unit_energy: 0.242, coal_co2_per_capita: 0.004, energy_per_capita: 992.445,
    flaring_co2_per_capita: 0.003, nitrous_oxide_per_capita: 0.272, temperature_change_from_n2o: 0.0,
    country: "Thailand", co2: 1.644
  },
  {
    year: 1954, population: 22713342.0, gdp: 32462198784.0, cement_co2_per_capita: 0.008, co2_growth_abs: 0.406,
    co2_including_luc_growth_abs: 6.434, co2_including_luc_per_gdp: 7.49, co2_including_luc_per_unit_energy: 8.235,
    co2_per_gdp: 0.063, co2_per_unit_energy: 0.242, coal_co2_per_capita: 0.009, energy_per_capita: 992.445,
    flaring_co2_per_capita: 0.003, nitrous_oxide_per_capita: 0.268, temperature_change_from_n2o: 0.0,
    country: "Thailand", co2: 2.05
  },
];

// PIE CHART and SPLIT DATA
const splitData = [
  { name: "Global Train", value: 15392 },
  { name: "ASEAN Train", value: 399 },
  { name: "ASEAN Val", value: 267 },
  { name: "Thailand Test", value: 74 }
];
const COLORS = ['#16a34a', '#4ade80', '#93c5fd', '#f9a8d4'];

const cleaningStepsFlow = [
  "Filter records from 1950 onward",
  "Remove aggregates (non-country codes)",
  "Drop columns with >50% missing",
  "Forward-fill missing values per country",
  "Backward-fill remaining gaps",
  "Validate country code completeness",
];

// For the fade-in animation
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const Dataset = () => (
  <div className="min-h-screen bg-green-50/30">
    <motion.section 
      className="relative py-12 bg-gradient-to-b from-green-50 to-white overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="section-container text-center">
        <div className="inline-block p-2 bg-green-100 rounded-full mb-4">
          <img src="/lovable-uploads/e3297e2a-7c19-40bd-8d98-3f907a9e1bcc.png" alt="Thailand Trend" className="h-8 w-8 object-contain" />
        </div>
        <h1 className="text-4xl font-bold text-green-800 mb-4">Dataset Overview</h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-3">
          Comprehensive Our World in Data CO₂ emissions dataset.
        </p>
        <span className="inline-flex text-sm mb-2 px-3 py-1 bg-gray-50 border border-green-100 rounded-full text-green-700 font-medium">
          Coverage: 1750-2023 (used only from 1950 onward due to missingness)
        </span>
        <a
          href="https://ourworldindata.org/co2-dataset-sources"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-green-700 hover:text-green-800 underline mb-1"
        >
          <span className="font-semibold underline">View full dataset &amp; documentation</span>
        </a>
      </div>
    </motion.section>

    {/* Slimmer Pie Chart Split */}
    <section className="py-2">
      <div className="section-container">
        <Card className="mb-6">
          <CardHeader className="pb-1 flex flex-row items-center gap-3">
            <PieChart className="w-5 h-5 text-green-600" />
            <CardTitle className="text-xl text-green-700">
              Train-Validation-Test Split
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 flex flex-col md:flex-row md:items-center md:gap-4">
            <div className="w-full md:w-[240px] h-[140px] md:h-[160px] mx-auto">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={splitData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={55}
                    fill="#22c55e"
                    paddingAngle={3}
                    dataKey="value"
                    label={({ index }) => splitData[index].name}
                    labelLine={false}
                  >
                    {splitData.map((entry, idx) => (
                      <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                  <RChartTooltip formatter={v => `${v} rows`} />
                  <RChartLegend verticalAlign="bottom" height={24} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full md:w-auto mt-4 md:mt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Split</TableHead>
                    <TableHead className="text-right">Rows</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Global Train (World excl. ASEAN + Thailand)</TableCell>
                    <TableCell className="text-right">15,392</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>ASEAN Train (60%)</TableCell>
                    <TableCell className="text-right">399</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>ASEAN Val (40%)</TableCell>
                    <TableCell className="text-right">267</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Thailand Test</TableCell>
                    <TableCell className="text-right">74</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>

    {/* Data Preprocessing Pipeline as Flow */}
    <section className="pb-4">
      <div className="section-container">
        <Card>
          <CardHeader>
            <CardTitle className="text-green-700 text-lg">Data Preprocessing Pipeline</CardTitle>
            <CardDescription>
              Sequential steps for preparing the dataset before model training
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 items-center justify-center py-2">
              {cleaningStepsFlow.map((step, idx) => (
                <span key={step} className="flex items-center gap-1">
                  <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">{step}</span>
                  {idx < cleaningStepsFlow.length - 1 && (
                    <span className="mx-1 text-green-400 text-lg font-bold">&#8594;</span>
                  )}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>

    {/*--- Sample Cleaned Records ---*/}
    <section className="pb-9">
      <div className="section-container">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-green-700">Sample Cleaned Records</CardTitle>
            <CardDescription>
              Example rows after preprocessing (first five years)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto max-w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Year</TableHead>
                    <TableHead>Population</TableHead>
                    <TableHead>GDP</TableHead>
                    <TableHead>Cement CO₂/Capita</TableHead>
                    <TableHead>CO₂ Growth Abs</TableHead>
                    <TableHead>CO₂+LUC Growth Abs</TableHead>
                    <TableHead>CO₂+LUC/GDP</TableHead>
                    <TableHead>CO₂+LUC/Energy</TableHead>
                    <TableHead>CO₂/GDP</TableHead>
                    <TableHead>CO₂/Energy</TableHead>
                    <TableHead>Coal CO₂/Capita</TableHead>
                    <TableHead>Energy/Capita</TableHead>
                    <TableHead>Flaring CO₂/Capita</TableHead>
                    <TableHead>N₂O/Capita</TableHead>
                    <TableHead>Temp Δ N₂O</TableHead>
                    <TableHead>CO₂</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cleanedData.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell>{row.year}</TableCell>
                      <TableCell>{row.population.toLocaleString()}</TableCell>
                      <TableCell>{row.gdp.toExponential(2)}</TableCell>
                      <TableCell>{row.cement_co2_per_capita}</TableCell>
                      <TableCell>{row.co2_growth_abs}</TableCell>
                      <TableCell>{row.co2_including_luc_growth_abs}</TableCell>
                      <TableCell>{row.co2_including_luc_per_gdp}</TableCell>
                      <TableCell>{row.co2_including_luc_per_unit_energy}</TableCell>
                      <TableCell>{row.co2_per_gdp}</TableCell>
                      <TableCell>{row.co2_per_unit_energy}</TableCell>
                      <TableCell>{row.coal_co2_per_capita}</TableCell>
                      <TableCell>{row.energy_per_capita}</TableCell>
                      <TableCell>{row.flaring_co2_per_capita}</TableCell>
                      <TableCell>{row.nitrous_oxide_per_capita}</TableCell>
                      <TableCell>{row.temperature_change_from_n2o}</TableCell>
                      <TableCell>{row.co2}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  </div>
);

export default Dataset;
