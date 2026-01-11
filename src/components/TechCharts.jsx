import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Label,
  LabelList,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart";

const ageChartConfig = {
  count: {
    label: "Patients",
    color: "var(--primary)",
  },
};

export const AgeDistributionChart = () => {
  const data = [
    { name: "<40", count: 7000 },
    { name: "40-49", count: 18000 },
    { name: "50-59", count: 25000 },
    { name: "60+", count: 20000 },
  ];

  return (
    <ChartContainer config={ageChartConfig} className="aspect-auto h-[300px] w-full">
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="name"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value}
        />
        <YAxis
           tickLine={false}
           axisLine={false}
           tickMargin={10}
        />
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <Bar dataKey="count" fill="var(--color-count)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  );
};

const targetChartConfig = {
  disease: {
    label: "Disease",
    color: "var(--destructive)",
  },
  noDisease: {
    label: "No Disease",
    color: "var(--primary)",
  },
};

export const TargetDistributionChart = () => {
  // Balanced dataset ~50/50
  const data = [
    { name: "noDisease", value: 35021, fill: "var(--color-noDisease)" },
    { name: "disease", value: 34979, fill: "var(--color-disease)" },
  ];

  return (
    <ChartContainer config={targetChartConfig} className="mx-auto aspect-auto h-[350px] w-full">
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={4}
        >
             <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        dy={-28}
                        className="fill-foreground text-3xl font-bold"
                      >
                        70k
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        dy={-5}
                        className="fill-muted-foreground text-xs"
                      >
                        Total Samples
                      </tspan>
                    </text>
                  )
                }
              }}
            />
        </Pie>
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <ChartLegend content={<ChartLegendContent nameKey="name" />} className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center" />
      </PieChart>
    </ChartContainer>
  );
};

const featureChartConfig = {
  value: {
    label: "Importance",
    color: "var(--chart-1)",
  },
};

export const FeatureImportanceChart = () => {
  const data = [
    { name: "Systolic BP", value: 41 },
    { name: "Cholesterol", value: 17 },
    { name: "Diastolic BP", value: 14 },
    { name: "Age", value: 6 },
    { name: "Glucose", value: 4 },
    { name: "Activity", value: 4 },
  ];

  return (
    <ChartContainer config={featureChartConfig} className="aspect-auto h-[400px] md:h-[350px] w-full">
      <BarChart
        accessibilityLayer
        data={data}
        layout="vertical"
        margin={{ left: 20 }}
      >
        <CartesianGrid horizontal={false} />
        <XAxis type="number" hide />
        <YAxis
          dataKey="name"
          type="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          width={80}
        />
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <Bar dataKey="value" fill="var(--color-value)" radius={[0, 4, 4, 0]} barSize={32} />
      </BarChart>
    </ChartContainer>
  );
};

const modelComparisonConfig = {
  accuracy: {
    label: "Accuracy",
    color: "hsl(var(--chart-1))",
  },
};

export const ModelComparisonChart = () => {
  const data = [
    { name: "XGBoost", accuracy: 73.3, fill: "var(--primary)" },
    { name: "Decision Tree", accuracy: 72.9, fill: "var(--muted-foreground)" },
    { name: "Logistic Reg.", accuracy: 72.4, fill: "var(--muted-foreground)" },
    { name: "KNN", accuracy: 71.7, fill: "var(--muted-foreground)" },
    { name: "Random Forest", accuracy: 70.6, fill: "var(--muted-foreground)" },
  ];

  return (
    <ChartContainer config={modelComparisonConfig} className="aspect-auto h-[400px] md:h-[300px] w-full">
      <BarChart accessibilityLayer data={data} layout="vertical" margin={{ left: 0, right: 30 }}>
        <CartesianGrid horizontal={false} />
        <XAxis type="number" domain={[65, 75]} hide />
        <YAxis
          dataKey="name"
          type="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          width={80}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey="accuracy" radius={4} barSize={24}>
           <LabelList dataKey="accuracy" position="right" className="fill-foreground font-bold" formatter={(val) => `${val}%`} />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
};

