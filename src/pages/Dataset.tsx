
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Database, Filter, PieChart } from "lucide-react";
import ThailandTrendDashboardCard from "@/components/dataset/ThailandTrendDashboardCard";
import YearlyMissingRatioCard from "@/components/dataset/YearlyMissingRatioCard";
import {
  PieChart as RChartPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RChartTooltip,
  Legend as RChartLegend,
} from 'recharts';

// 5 sample records provided by user, adjusted for readable UI
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

// PIE CHART data for split
const splitData = [
  { name: "Global Train", value: 15392 },
  { name: "ASEAN Train", value: 399 },
  { name: "ASEAN Val", value: 267 },
  { name: "Thailand Test", value: 74 }
];
const COLORS = ['#16a34a', '#4ade80', '#93c5fd', '#f9a8d4'];

const cleaningSteps = [
  "Filter records from 1950 onward",
  "Remove aggregates (non-country codes)",
  "Drop columns with >50% missing values",
  "Forward-fill missing values by country",
  "Backward-fill remaining gaps",
  "Validate country code completeness",
];

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const Dataset = () => {
  const [showPreprocessing, setShowPreprocessing] = useState(false);

  return (
    <div className="min-h-screen bg-green-50/30">
      <motion.section 
        className="relative py-12 bg-gradient-to-b from-green-50 to-white overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="section-container text-center">
          <div className="inline-block p-2 bg-green-100 rounded-full mb-4">
            <Database className="h-8 w-8 text-green-600" />
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

      {/*--- Charts grid ---*/}
      <section className="pt-6 pb-4 bg-green-50/30">
        <div className="section-container">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            <motion.div {...fadeIn} className="col-span-1 flex flex-col h-full">
              <ThailandTrendDashboardCard style={{ minHeight: 260, height: "100%" }} />
            </motion.div>
            <motion.div {...fadeIn} className="col-span-1 flex flex-col h-full">
              <YearlyMissingRatioCard />
            </motion.div>
          </div>
        </div>
      </section>

      {/*--- Pie chart + split ---*/}
      <section className="pb-2">
        <div className="section-container">
          <Card>
            <CardHeader className="pb-2 flex flex-row items-center gap-3">
              <PieChart className="w-5 h-5 text-green-600" />
              <CardTitle className="text-xl text-green-700">
                Train-Validation-Test Split
              </CardTitle>
              <CardDescription className="ml-2">Row Counts by Dataset Split</CardDescription>
            </CardHeader>
            <CardContent className="pt-0 flex flex-col md:flex-row md:items-center md:gap-8">
              <div className="w-full md:w-1/2 md:pl-8 h-[180px] md:h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RChartPieChart>
                    <Pie
                      data={splitData}
                      cx="50%"
                      cy="50%"
                      innerRadius={42}
                      outerRadius={70}
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
                    <RChartLegend verticalAlign="bottom" height={38} iconType="circle" />
                  </RChartPieChart>
                </ResponsiveContainer>
              </div>
              <div className="overflow-x-auto w-full md:w-1/2 mt-6 md:mt-0">
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

      {/*--- Data Status + Preprocessing Steps ---*/}
      <section className="pt-4 pb-9">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    {/* Data Quality Status */}
                    <CardTitle className="text-green-700 text-lg">Data Quality Status</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded">
                    <span>Country Code Validation</span>
                    <span className="text-green-600">Verified</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.17 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Filter className="h-5 w-5 text-green-600 mb-1" />
                    <CardTitle className="text-green-700 text-lg">Data Preprocessing Steps</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Pipeline bullets for each step */}
                  <ul className="flex flex-col gap-3 pl-2 mb-2">
                    {cleaningSteps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="block mt-1 w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/*--- Sample Cleaned Records ---*/}
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
};

export default Dataset;

