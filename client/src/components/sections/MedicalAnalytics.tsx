import { useState } from "react";
import { useAnalytics, ChartData } from "@/hooks/useAnalytics";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  RadarChart, 
  Radar, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Cell
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  PieChart as PieChartIcon, 
  BarChart as BarChartIcon, 
  LineChart as LineChartIcon, 
  Activity, 
  BookOpen, 
  Heart, 
  Users, 
  Calendar, 
  Radar as RadarIcon,
  RefreshCw,
  Download,
  Share2,
  Zap
} from "lucide-react";

// Custom colors for charts
const COLORS = [
  "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", 
  "#FF9F40", "#8AC926", "#1982C4", "#6A4C93", "#F94144"
];

const CHART_TYPES = {
  bar: "bar",
  line: "line",
  pie: "pie",
  radar: "radar"
} as const;

type ChartType = typeof CHART_TYPES[keyof typeof CHART_TYPES];

// Custom chart wrapper component
function ChartContainer({
  title,
  description,
  children,
  chartType = "bar",
  onChartTypeChange
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  chartType?: ChartType;
  onChartTypeChange?: (type: ChartType) => void;
}) {
  return (
    <Card className="backdrop-blur-md bg-black/30 border border-white/10 overflow-hidden">
      <CardHeader className="border-b border-white/10 px-6 py-4 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-white text-lg">{title}</CardTitle>
          <CardDescription className="text-gray-400 text-sm">{description}</CardDescription>
        </div>
        {onChartTypeChange && (
          <div className="flex space-x-1 bg-gray-900/70 rounded-lg p-1">
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-md h-7 w-7 ${chartType === "bar" ? "bg-primary/30 text-primary" : "text-gray-400"}`}
              onClick={() => onChartTypeChange("bar")}
            >
              <BarChartIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-md h-7 w-7 ${chartType === "line" ? "bg-primary/30 text-primary" : "text-gray-400"}`}
              onClick={() => onChartTypeChange("line")}
            >
              <LineChartIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-md h-7 w-7 ${chartType === "pie" ? "bg-primary/30 text-primary" : "text-gray-400"}`}
              onClick={() => onChartTypeChange("pie")}
            >
              <PieChartIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-md h-7 w-7 ${chartType === "radar" ? "bg-primary/30 text-primary" : "text-gray-400"}`}
              onClick={() => onChartTypeChange("radar")}
            >
              <RadarIcon className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent className="p-6">
        {children}
      </CardContent>
    </Card>
  );
}

// Chart component that renders different chart types
function DynamicChart({
  data,
  chartType,
  height = 300
}: {
  data: ChartData;
  chartType: ChartType;
  height?: number;
}) {
  if (!data || !data.labels || !data.datasets) {
    return <div className="flex items-center justify-center h-[300px] text-gray-400">No data available</div>;
  }

  // Transform data for recharts format
  const transformedData = data.labels.map((label, index) => {
    const item: any = { name: label };
    data.datasets.forEach(dataset => {
      item[dataset.name] = dataset.data[index];
    });
    return item;
  });

  // Render bar chart
  if (chartType === "bar") {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={transformedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#444" opacity={0.2} />
          <XAxis 
            dataKey="name" 
            stroke="#999" 
            fontSize={12} 
            tickMargin={10} 
            angle={-45}
            textAnchor="end"
          />
          <YAxis stroke="#999" fontSize={12} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '4px', color: '#eee' }} 
          />
          <Legend wrapperStyle={{ fontSize: '12px', color: '#eee', marginTop: '10px' }} />
          {data.datasets.map((dataset, index) => (
            <Bar 
              key={dataset.name} 
              dataKey={dataset.name} 
              fill={COLORS[index % COLORS.length]} 
              stackId={dataset.name.includes('%') ? '1' : undefined}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    );
  }

  // Render line chart
  if (chartType === "line") {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <LineChart
          data={transformedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#444" opacity={0.2} />
          <XAxis 
            dataKey="name" 
            stroke="#999" 
            fontSize={12} 
            tickMargin={10} 
            angle={-45}
            textAnchor="end"
          />
          <YAxis stroke="#999" fontSize={12} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '4px', color: '#eee' }} 
          />
          <Legend wrapperStyle={{ fontSize: '12px', color: '#eee', marginTop: '10px' }} />
          {data.datasets.map((dataset, index) => (
            <Line 
              key={dataset.name} 
              type="monotone" 
              dataKey={dataset.name} 
              stroke={COLORS[index % COLORS.length]} 
              strokeWidth={2}
              dot={{ r: 4, stroke: COLORS[index % COLORS.length], fill: "#111" }}
              activeDot={{ r: 6, stroke: COLORS[index % COLORS.length], strokeWidth: 2, fill: "#fff" }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    );
  }

  // Render pie chart
  if (chartType === "pie") {
    // If there are multiple datasets, use the first one for the pie chart
    const datasetToUse = data.datasets[0];
    
    const pieData = data.labels.map((label, index) => ({
      name: label,
      value: datasetToUse.data[index]
    }));

    return (
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '4px', color: '#eee' }} 
          />
          <Legend wrapperStyle={{ fontSize: '12px', color: '#eee', marginTop: '10px' }} />
        </PieChart>
      </ResponsiveContainer>
    );
  }

  // Render radar chart
  if (chartType === "radar") {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <RadarChart outerRadius={100} width={500} height={300} data={transformedData}>
          <PolarGrid stroke="#555" />
          <PolarAngleAxis dataKey="name" stroke="#999" fontSize={12} />
          <PolarRadiusAxis stroke="#999" fontSize={12} />
          {data.datasets.map((dataset, index) => (
            <Radar
              key={dataset.name}
              name={dataset.name}
              dataKey={dataset.name}
              stroke={COLORS[index % COLORS.length]}
              fill={COLORS[index % COLORS.length]}
              fillOpacity={0.2}
            />
          ))}
          <Tooltip 
            contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '4px', color: '#eee' }} 
          />
          <Legend wrapperStyle={{ fontSize: '12px', color: '#eee', marginTop: '10px' }} />
        </RadarChart>
      </ResponsiveContainer>
    );
  }

  return null;
}

export default function MedicalAnalytics() {
  const { data, isLoading, isError, refetch } = useAnalytics();
  const [activeTab, setActiveTab] = useState("overview");
  
  // State for chart types
  const [chartTypes, setChartTypes] = useState({
    ageDistribution: "bar" as ChartType,
    riskFactorCorrelation: "bar" as ChartType,
    survivalRates: "line" as ChartType,
    treatmentEfficacy: "bar" as ChartType,
    diagnosticAccuracy: "radar" as ChartType,
    geographicDistribution: "bar" as ChartType,
    biomarkerAnalysis: "pie" as ChartType,
    yearlyTrends: "line" as ChartType,
    featureImportance: "bar" as ChartType,
    sideEffectsComparison: "radar" as ChartType,
  });

  const updateChartType = (chart: string, type: ChartType) => {
    setChartTypes(prev => ({
      ...prev,
      [chart]: type
    }));
  };

  if (isLoading) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-20">
        <div className="w-16 h-16 rounded-full border-4 border-primary border-r-transparent animate-spin"></div>
        <p className="mt-4 text-gray-400">Loading analytics data...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-20">
        <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
          <Zap className="h-10 w-10 text-red-500" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Failed to load analytics</h3>
        <p className="text-gray-400 mb-6 text-center max-w-md">There was an error fetching the medical analytics data. Please try again later.</p>
        <Button onClick={() => refetch()} className="btn-futuristic">
          <RefreshCw className="h-4 w-4 mr-2" />
          Retry
        </Button>
      </div>
    );
  }

  return (
    <section id="analytics" className="relative py-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute w-[800px] h-[800px] bg-primary/20 rounded-full blur-[150px] -top-40 left-20 z-0"></div>
        <div className="absolute w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[100px] bottom-20 -right-20 z-0"></div>
        <div className="bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNmMtMy4zMTQgMC02LTIuNjg2LTYtNnMyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjA1Ii8+PGNpcmNsZSBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9Ii4wNSIgY3g9IjQwIiBjeT0iMzAiIHI9IjEiLz48Y2lyY2xlIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1IiBjeD0iMjAiIGN5PSIyMCIgcj0iMSIvPjxjaXJjbGUgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMDUiIGN4PSI0MCIgY3k9IjQwIiByPSIxIi8+PC9nPjwvc3ZnPg==')] absolute inset-0 opacity-10 z-0"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center mb-4 px-3 py-1 rounded-full text-primary bg-primary/10 backdrop-blur-sm border border-primary/20">
            <Activity className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Comprehensive Analytics</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-5 bg-clip-text text-transparent bg-gradient-to-r from-white via-primary to-white">
            Medical Analytics Dashboard
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-base md:text-lg px-2">
            Advanced analytics and visualizations of breast cancer data for healthcare professionals, 
            providing insights into demographics, risk factors, treatment outcomes, and more.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap justify-between items-center">
          <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
            <Label className="text-gray-400">Last updated: </Label>
            <span className="text-white">{new Date(data.lastUpdated).toLocaleString()}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="bg-black/30 text-white hover:bg-black/50 border-white/10">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button variant="outline" className="bg-black/30 text-white hover:bg-black/50 border-white/10">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button className="btn-futuristic" onClick={() => refetch()}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="mb-12" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 md:grid-cols-5 bg-gray-900/70 backdrop-blur-sm border border-gray-800">
            <TabsTrigger value="overview" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              <Activity className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="demographics" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              <Users className="h-4 w-4 mr-2" />
              Demographics
            </TabsTrigger>
            <TabsTrigger value="diagnosis" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              <Zap className="h-4 w-4 mr-2" />
              Diagnosis
            </TabsTrigger>
            <TabsTrigger value="treatment" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              <Heart className="h-4 w-4 mr-2" />
              Treatment
            </TabsTrigger>
            <TabsTrigger value="research" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              <BookOpen className="h-4 w-4 mr-2" />
              Research
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab Content */}
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="backdrop-blur-md bg-black/30 border border-white/10 hover:border-primary/30 transition-colors">
                <CardHeader className="flex flex-row items-center justify-between pb-2 pt-6">
                  <CardTitle className="text-sm font-medium text-gray-400">Age Distribution</CardTitle>
                  <Activity className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    45-65
                    <span className="text-sm ml-2 font-normal text-gray-400">peak range</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Most common age range for diagnosis</p>
                  <div className="h-[100px] mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={transformedData(data.ageDistribution)}>
                        <Line 
                          type="monotone" 
                          dataKey="Malignant Cases" 
                          stroke={COLORS[1]} 
                          strokeWidth={2}
                          dot={false}
                        />
                        <CartesianGrid stroke="#333" strokeDasharray="3 3" vertical={false} opacity={0.2} />
                        <XAxis dataKey="name" tick={false} stroke="#333" opacity={0.3} />
                        <YAxis tick={false} stroke="#333" opacity={0.3} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="backdrop-blur-md bg-black/30 border border-white/10 hover:border-primary/30 transition-colors">
                <CardHeader className="flex flex-row items-center justify-between pb-2 pt-6">
                  <CardTitle className="text-sm font-medium text-gray-400">Survival Rate</CardTitle>
                  <Heart className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    90%
                    <span className="text-sm ml-2 font-normal text-gray-400">overall</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">5-year survival rate in 2025</p>
                  <div className="h-[100px] mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={transformedData(data.survivalRates)}>
                        <Bar 
                          dataKey="5-Year Survival Rate" 
                          fill={COLORS[0]}
                          radius={[4, 4, 0, 0]}
                        />
                        <CartesianGrid stroke="#333" strokeDasharray="3 3" vertical={false} opacity={0.2} />
                        <XAxis dataKey="name" tick={false} stroke="#333" opacity={0.3} />
                        <YAxis tick={false} stroke="#333" opacity={0.3} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-md bg-black/30 border border-white/10 hover:border-primary/30 transition-colors">
                <CardHeader className="flex flex-row items-center justify-between pb-2 pt-6">
                  <CardTitle className="text-sm font-medium text-gray-400">Cases Trend</CardTitle>
                  <Calendar className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    -4.8%
                    <span className="text-sm ml-2 font-normal text-green-400">decreasing</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Annual change in new cases (2020-2025)</p>
                  <div className="h-[100px] mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={transformedData(data.yearlyTrends).slice(-5)}>
                        <Line 
                          type="monotone" 
                          dataKey="New Cases (thousands)" 
                          stroke={COLORS[2]} 
                          strokeWidth={2}
                          dot={false}
                        />
                        <CartesianGrid stroke="#333" strokeDasharray="3 3" vertical={false} opacity={0.2} />
                        <XAxis dataKey="name" tick={false} stroke="#333" opacity={0.3} />
                        <YAxis tick={false} stroke="#333" opacity={0.3} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <ChartContainer 
                title="Yearly Trends (2016-2025)" 
                description="New cases, mortality rates, and survival rates over the past decade"
                chartType={chartTypes.yearlyTrends}
                onChartTypeChange={(type) => updateChartType("yearlyTrends", type)}
              >
                <DynamicChart 
                  data={data.yearlyTrends}
                  chartType={chartTypes.yearlyTrends}
                  height={350}
                />
              </ChartContainer>
              
              <ChartContainer 
                title="Risk Factor Correlation" 
                description="Correlation strength between risk factors and breast cancer incidence"
                chartType={chartTypes.riskFactorCorrelation}
                onChartTypeChange={(type) => updateChartType("riskFactorCorrelation", type)}
              >
                <DynamicChart 
                  data={data.riskFactorCorrelation}
                  chartType={chartTypes.riskFactorCorrelation}
                  height={350}
                />
              </ChartContainer>
            </div>
          </TabsContent>

          {/* Demographics Tab Content */}
          <TabsContent value="demographics" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <ChartContainer 
                title="Age Distribution" 
                description="Distribution of benign and malignant cases by age group"
                chartType={chartTypes.ageDistribution}
                onChartTypeChange={(type) => updateChartType("ageDistribution", type)}
              >
                <DynamicChart 
                  data={data.ageDistribution}
                  chartType={chartTypes.ageDistribution}
                  height={350}
                />
              </ChartContainer>
              
              <ChartContainer 
                title="Geographic Distribution" 
                description="Global incidence and mortality rates per 100,000 population"
                chartType={chartTypes.geographicDistribution}
                onChartTypeChange={(type) => updateChartType("geographicDistribution", type)}
              >
                <DynamicChart 
                  data={data.geographicDistribution}
                  chartType={chartTypes.geographicDistribution}
                  height={350}
                />
              </ChartContainer>
            </div>
          </TabsContent>

          {/* Diagnosis Tab Content */}
          <TabsContent value="diagnosis" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <ChartContainer 
                title="Diagnostic Accuracy Comparison" 
                description="Sensitivity and specificity of different diagnostic methods"
                chartType={chartTypes.diagnosticAccuracy}
                onChartTypeChange={(type) => updateChartType("diagnosticAccuracy", type)}
              >
                <DynamicChart 
                  data={data.diagnosticAccuracy}
                  chartType={chartTypes.diagnosticAccuracy}
                  height={350}
                />
              </ChartContainer>
              
              <ChartContainer 
                title="Feature Importance in Prediction" 
                description="Relative importance of different clinical features in the prediction model"
                chartType={chartTypes.featureImportance}
                onChartTypeChange={(type) => updateChartType("featureImportance", type)}
              >
                <DynamicChart 
                  data={data.featureImportance}
                  chartType={chartTypes.featureImportance}
                  height={350}
                />
              </ChartContainer>
            </div>
            
            <ChartContainer 
              title="Biomarker Analysis" 
              description="Prevalence of different biomarker combinations in breast cancer cases"
              chartType={chartTypes.biomarkerAnalysis}
              onChartTypeChange={(type) => updateChartType("biomarkerAnalysis", type)}
            >
              <DynamicChart 
                data={data.biomarkerAnalysis}
                chartType={chartTypes.biomarkerAnalysis}
                height={350}
              />
            </ChartContainer>
          </TabsContent>

          {/* Treatment Tab Content */}
          <TabsContent value="treatment" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <ChartContainer 
                title="Treatment Efficacy" 
                description="Recurrence rates and recovery times for different treatment approaches"
                chartType={chartTypes.treatmentEfficacy}
                onChartTypeChange={(type) => updateChartType("treatmentEfficacy", type)}
              >
                <DynamicChart 
                  data={data.treatmentEfficacy}
                  chartType={chartTypes.treatmentEfficacy}
                  height={350}
                />
              </ChartContainer>
              
              <ChartContainer 
                title="Survival Rates by Stage" 
                description="5-year survival rates based on cancer stage at diagnosis"
                chartType={chartTypes.survivalRates}
                onChartTypeChange={(type) => updateChartType("survivalRates", type)}
              >
                <DynamicChart 
                  data={data.survivalRates}
                  chartType={chartTypes.survivalRates}
                  height={350}
                />
              </ChartContainer>
            </div>
            
            <ChartContainer 
              title="Treatment Side Effects Comparison" 
              description="Prevalence of different side effects across treatment modalities (%)"
              chartType={chartTypes.sideEffectsComparison}
              onChartTypeChange={(type) => updateChartType("sideEffectsComparison", type)}
            >
              <DynamicChart 
                data={data.sideEffectsComparison}
                chartType={chartTypes.sideEffectsComparison}
                height={350}
              />
            </ChartContainer>
          </TabsContent>

          {/* Research Tab Content */}
          <TabsContent value="research" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <ChartContainer 
                title="Risk Factor Research" 
                description="Correlation strength between risk factors and breast cancer incidence"
                chartType={chartTypes.riskFactorCorrelation}
                onChartTypeChange={(type) => updateChartType("riskFactorCorrelation", type)}
              >
                <DynamicChart 
                  data={data.riskFactorCorrelation}
                  chartType={chartTypes.riskFactorCorrelation}
                  height={350}
                />
              </ChartContainer>
              
              <ChartContainer 
                title="Feature Importance in AI Models" 
                description="Relative importance of different clinical features in prediction models"
                chartType={chartTypes.featureImportance}
                onChartTypeChange={(type) => updateChartType("featureImportance", type)}
              >
                <DynamicChart 
                  data={data.featureImportance}
                  chartType={chartTypes.featureImportance}
                  height={350}
                />
              </ChartContainer>
            </div>
            
            <ChartContainer 
              title="Annual Research Trends" 
              description="New cases, mortality rates, and survival rates, indicating research impact"
              chartType="line"
            >
              <DynamicChart 
                data={data.yearlyTrends}
                chartType="line"
                height={350}
              />
            </ChartContainer>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

// Helper function to transform the data format for recharts
function transformedData(data: ChartData) {
  return data.labels.map((label, index) => {
    const item: any = { name: label };
    data.datasets.forEach(dataset => {
      item[dataset.name] = dataset.data[index];
    });
    return item;
  });
}