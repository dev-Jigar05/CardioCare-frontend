import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#00C896", "#0A192F", "#94a3b8", "#cbd5e1"];

export const AgeDistributionChart = () => {
  // Approximate distribution based on 70k dataset (mean ~53, range 30-65)
  const data = [
    { name: "<40", count: 7000 },
    { name: "40-49", count: 18000 },
    { name: "50-59", count: 25000 },
    { name: "60+", count: 20000 },
  ];

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "#64748B", fontSize: 12 }} 
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "#64748B", fontSize: 12 }} 
          />
          <Tooltip 
            cursor={{ fill: "#F1F5F9" }}
            contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
          />
          <Bar dataKey="count" fill="#00C896" radius={[4, 4, 0, 0]} barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const TargetDistributionChart = () => {
  // Balanced dataset ~50/50
  const data = [
    { name: "No Disease", value: 35021 },
    { name: "Disease", value: 34979 },
  ];

  return (
    <div className="h-[300px] w-full flex justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ borderRadius: "8px", border: "none" }} />
          <Legend verticalAlign="bottom" height={36} iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export const FeatureImportanceChart = () => {
  // Key Risk Factors (General Knowledge + EDA correlations)
  const data = [
    { name: "Age", value: 90 },
    { name: "Systolic BP", value: 85 },
    { name: "Weight/BMI", value: 80 },
    { name: "Cholesterol", value: 70 },
    { name: "Glucose", value: 40 },
    { name: "Smoking", value: 30 },
  ];

  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ left: 40 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
          <XAxis type="number" hide />
          <YAxis 
            dataKey="name" 
            type="category" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "#475569", fontSize: 13, fontWeight: 500 }}
            width={100}
          />
          <Tooltip cursor={{ fill: "transparent" }} />
          <Bar dataKey="value" fill="#0A192F" radius={[0, 4, 4, 0]} barSize={24} background={{ fill: "#F1F5F9", radius: 4 }} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

