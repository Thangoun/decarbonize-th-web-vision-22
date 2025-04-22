
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Database, Filter, CircleCheck, AlertCircle, Info, FileText, LineChart, BarChart3, PieChart } from "lucide-react";

// Import components
import ThailandTrendDashboard from "@/components/dataset/ThailandTrendDashboard";
import YearlyMissingRatio from "@/components/dataset/YearlyMissingRatio";
import DatasetSplitSummary from "@/components/dataset/DatasetSplitSummary";

const Dataset = () => {
  const [showPreprocessing, setShowPreprocessing] = useState(false);

  // Current sample cleaned data, as requested
  const cleanedData = [
    {
      year: 2019,
      population: 71522265.0,
      gdp: 1149130637312.0,
      cement_co2_per_capita: 0.312,
      co2_growth_abs: -6.427,
      co2_including_luc_growth_abs: -8.991,
      co2_including_luc_per_gdp: 0.278,
      co2_including_luc_per_unit_energy: 0.216,
      co2_per_gdp: 0.245,
      co2_per_unit_energy: 0.19,
      coal_co2_per_capita: 0.98,
      energy_per_capita: 20751.527,
      flaring_co2_per_capita: 0.008,
      nitrous_oxide_per_capita: 0.33,
      temperature_change_from_n2o: 0.001,
      country: "Thailand",
      co2: 281.877,
    },
    {
      year: 2020,
      population: 71641484.0,
      gdp: 1078332620800.0,
      cement_co2_per_capita: 0.306,
      co2_growth_abs: -9.954,
      co2_including_luc_growth_abs: -11.755,
      co2_including_luc_per_gdp: 0.285,
      co2_including_luc_per_unit_energy: 0.223,
      co2_per_gdp: 0.252,
      co2_per_unit_energy: 0.198,
      coal_co2_per_capita: 1.044,
      energy_per_capita: 19247.928,
      flaring_co2_per_capita: 0.008,
      nitrous_oxide_per_capita: 0.341,
      temperature_change_from_n2o: 0.001,
      country: "Thailand",
      co2: 271.923,
    },
    {
      year: 2021,
      population: 71727340.0,
      gdp: 1095187103744.0,
      cement_co2_per_capita: 0.295,
      co2_growth_abs: -4.781,
      co2_including_luc_growth_abs: -5.507,
      co2_including_luc_per_gdp: 0.276,
      co2_including_luc_per_unit_energy: 0.218,
      co2_per_gdp: 0.244,
      co2_per_unit_energy: 0.193,
      coal_co2_per_capita: 1.069,
      energy_per_capita: 19368.557,
      flaring_co2_per_capita: 0.007,
      nitrous_oxide_per_capita: 0.337,
      temperature_change_from_n2o: 0.001,
      country: "Thailand",
      co2: 267.142,
    },
    {
      year: 2022,
      population: 71735320.0,
      gdp: 1124143726592.0,
      cement_co2_per_capita: 0.293,
      co2_growth_abs: 5.432,
      co2_including_luc_growth_abs: 4.502,
      co2_including_luc_per_gdp: 0.273,
      co2_including_luc_per_unit_energy: 0.221,
      co2_per_gdp: 0.242,
      co2_per_unit_energy: 0.196,
      coal_co2_per_capita: 0.973,
      energy_per_capita: 19357.754,
      flaring_co2_per_capita: 0.006,
      nitrous_oxide_per_capita: 0.339,
      temperature_change_from_n2o: 0.001,
      country: "Thailand",
      co2: 272.573,
    },
    {
      year: 2023,
      population: 71702438.0,
      gdp: 1124143726592.0,
      cement_co2_per_capita: 0.268,
      co2_growth_abs: -8.185,
      co2_including_luc_growth_abs: -8.996,
      co2_including_luc_per_gdp: 0.273,
      co2_including_luc_per_unit_energy: 0.214,
      co2_per_gdp: 0.242,
      co2_per_unit_energy: 0.19,
      coal_co2_per_capita: 0.827,
      energy_per_capita: 19370.299,
      flaring_co2_per_capita: 0.006,
      nitrous_oxide_per_capita: 0.339,
      temperature_change_from_n2o: 0.001,
      country: "Thailand",
      co2: 264.389,
    },
  ];

  // Updated cleaning steps (remove quality assurance)
  const cleaningSteps = [
    {
      title: "Initial Data Loading & Filtering",
      description: "Source: Our World in Data CO₂ Dataset",
      details: [
        "Filter records from 1950 onward only",
        "Remove region-level aggregates by filtering to valid ISO-3 country codes",
        "Select relevant features for analysis"
      ]
    },
    {
      title: "Feature Selection",
      description: "Selected columns using VIF threshold",
      details: [
        "population, gdp, cement_co2_per_capita, co2_growth_abs, co2_including_luc_growth_abs, co2_including_luc_per_gdp, co2_including_luc_per_unit_energy, co2_per_gdp, co2_per_unit_energy, coal_co2_per_capita, energy_per_capita, flaring_co2_per_capita, nitrous_oxide_per_capita, temperature_change_from_n2o, co2"
      ]
    },
    {
      title: "Missing Value Treatment",
      description: "Systematic approach to handle gaps in data",
      details: [
        "Drop columns with >50% missing values (post-1950)",
        "Apply forward-fill within each country group",
        "Use backward-fill for remaining gaps",
        "Validate completeness of key indicators"
      ]
    }
  ];

  // Animation config
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen pt-16">
      <motion.section 
        className="relative py-16 bg-gradient-to-b from-green-50 to-white overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="section-container text-center">
          <div className="inline-block p-2 bg-green-100 rounded-full mb-4">
            <Database className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-green-800 mb-6">Dataset Overview</h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-4">
            Our analysis utilizes the comprehensive Our World in Data CO₂ emissions dataset, 
            covering the period from 1750 to 2023 (data analyzed from 1950 onward due to missingness).
          </p>
          <a
            href="https://ourworldindata.org/co2-dataset-sources"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-green-700 hover:text-green-800 underline mb-4"
          >
            <span className="font-semibold underline">View original dataset on Our World in Data</span>
          </a>
        </div>
      </motion.section>

      <section className="py-12">
        <div className="section-container">

          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-green-600" />
                <CardTitle className="text-green-700">Data Source</CardTitle>
              </div>
              <CardDescription>
                Primary dataset: owid-co2-data.csv from Our World in Data
                <br />
                Coverage: 1750-2023 (Data used only from 1950 onward due to missingness)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-start space-y-2">
                <a
                  href="https://ourworldindata.org/co2-dataset-sources"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-green-700 hover:text-green-800 underline"
                >
                  <span className="font-semibold underline">💾 Link to OWID - World Carbon Data</span>
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Responsive grid for Dashboard + Missing Ratio */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
            <motion.div {...fadeIn} className="col-span-1">
              {/* Thailand Trend Dashboard: ensure card/content does not overflow */}
              <div className="h-full flex flex-col">
                <ThailandTrendDashboard />
              </div>
            </motion.div>

            <motion.div {...fadeIn} className="col-span-1">
              {/* Average Missing Value Ratio: fix height and spacing */}
              <div className="h-full flex flex-col">
                <YearlyMissingRatio />
              </div>
            </motion.div>
          </div>

          {/* Dataset Split Summary */}
          <motion.div {...fadeIn} className="mb-8">
            <DatasetSplitSummary
              datasetSplit={[
                { split: "Global Train (World excl. ASEAN + Thailand)", rows: 15392 },
                { split: "ASEAN Train (60%)", rows: 399 },
                { split: "ASEAN Val (40%)", rows: 267 },
                { split: "Thailand Test", rows: 74 }
              ]}
            />
          </motion.div>

          {/* Status + Overview: adjust grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <CircleCheck className="h-5 w-5 text-green-600" />
                    <CardTitle className="text-green-700">Data Quality Status</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded">
                      <span>Country Code Validation</span>
                      <span className="text-green-600">Verified</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-amber-500" />
                    <CardTitle className="text-green-700">Dataset Overview</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-green-50/50 p-4 flex flex-col items-center justify-center">
                      <LineChart className="h-8 w-8 text-green-600 mb-2" />
                      <h3 className="font-medium text-green-700 text-center">Time-Series Format</h3>
                      <p className="text-sm text-gray-600 text-center">Annual observations from 1950-2023</p>
                    </Card>
                    <Card className="bg-green-50/50 p-4 flex flex-col items-center justify-center">
                      <BarChart3 className="h-8 w-8 text-green-600 mb-2" />
                      <h3 className="font-medium text-green-700 text-center">Feature Selection</h3>
                      <p className="text-sm text-gray-600 text-center">
                        Features selected using VIF threshold
                      </p>
                    </Card>
                    <Card className="bg-green-50/50 p-4 flex flex-col items-center justify-center">
                      <Database className="h-8 w-8 text-green-600 mb-2" />
                      <h3 className="font-medium text-green-700 text-center">Complete Records</h3>
                      <p className="text-sm text-gray-600 text-center">No missing values after processing</p>
                    </Card>
                    <Card className="bg-green-50/50 p-4 flex flex-col items-center justify-center">
                      <PieChart className="h-8 w-8 text-green-600 mb-2" />
                      <h3 className="font-medium text-green-700 text-center">Strategic Split</h3>
                      <p className="text-sm text-gray-600 text-center">Global + ASEAN training</p>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-green-600" />
                  <CardTitle className="text-green-700">Data Preprocessing Steps</CardTitle>
                </div>
                <Button
                  onClick={() => setShowPreprocessing(!showPreprocessing)}
                  variant="outline"
                  className="text-green-700 border-green-600"
                >
                  {showPreprocessing ? 'Hide Details' : 'Show Details'}
                </Button>
              </div>
              <CardDescription>
                Systematic approach to prepare the dataset for analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              {showPreprocessing && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Accordion type="single" collapsible className="w-full">
                    {cleaningSteps.map((step, index) => (
                      <AccordionItem key={index} value={`step-${index}`}>
                        <AccordionTrigger className="text-green-700 hover:text-green-800">
                          {step.title}
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="mb-3 text-gray-700">{step.description}</p>
                          <ul className="space-y-2 pl-5 list-disc text-gray-600">
                            {step.details.map((detail, idx) => (
                              <li key={idx}>{detail}</li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </motion.div>
              )}

              <div className="mt-8">
                <h3 className="text-lg font-medium text-green-700 mb-4">Sample Cleaned Records</h3>
                <div className="overflow-x-auto">
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
                        <TableHead>Temp Δ from N₂O</TableHead>
                        <TableHead>CO₂</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cleanedData.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell>{row.year}</TableCell>
                          <TableCell>{row.population.toLocaleString()}</TableCell>
                          <TableCell>{row.gdp.toExponential(3)}</TableCell>
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
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Dataset;
