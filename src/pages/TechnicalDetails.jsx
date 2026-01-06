import Layout from "../components/Layout";
import {
  AgeDistributionChart,
  TargetDistributionChart,
  FeatureImportanceChart,
} from "../components/TechCharts";
import { Database, BrainCircuit, Activity, FileCheck } from "lucide-react";

function TechnicalDetails() {
  return (
    <Layout>
      {/* Header Section */}
      <div className="relative mb-16 rounded-3xl bg-gradient-to-br from-primary/5 via-primary/10 to-transparent p-10 text-center dark:from-primary/10 dark:via-primary/5">
        <div className="mx-auto max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/50 px-3 py-1 text-xs font-medium text-primary shadow-sm backdrop-blur-sm">
            <Activity className="h-3 w-3" />
            <span>Model Version 1.0.0 KNN</span>
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Technical Architecture
          </h1>
          <p className="text-lg text-muted-foreground">
            A deep dive into the data, model architecture, and performance metrics powering CardioCare's AI engine.
          </p>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Database, label: "Dataset Size", value: "70,000 Samples", sub: "Cardio Train Dataset" },
          { icon: BrainCircuit, label: "Model Type", value: "K-Nearest Neighbors", sub: "Scikit-Learn" },
          { icon: FileCheck, label: "Accuracy", value: "~70%", sub: "Test Set" },
          { icon: Activity, label: "Features", value: "12 Inputs", sub: "Clinical & Vitals" },
        ].map((stat, i) => (
          <div key={i} className="rounded-2xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
            <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-primary/10 p-3 text-primary">
              <stat.icon className="h-6 w-6" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
            <p className="mt-1 text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="mt-20 grid gap-12 lg:grid-cols-2">
        {/* Dataset Section */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">The Dataset</h2>
            <p className="text-muted-foreground">
              We utilized the comprehensive <strong>Cardio Train Dataset</strong> containing 70,000 patient records. 
              The data is perfectly balanced (50/50 split) between positive and negative cases, ensuring unbiased model training.
            </p>
          </div>
          
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Patient Age Distribution
            </h3>
            <AgeDistributionChart />
          </div>

          <div className="rounded-2xl border bg-card p-6 shadow-sm">
             <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Disease Prevalence in Dataset
            </h3>
            <TargetDistributionChart />
          </div>
        </section>

        {/* Model Section */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Model Architecture</h2>
            <p className="text-muted-foreground">
              Our core engine is a <strong>K-Nearest Neighbors (KNN) Classifier</strong>. 
              Simpler yet robust for this specific feature set, it classifies patients based on the similarity 
              of their vitals to known cases in the 70,000-sample database.
            </p>
          </div>

           <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Key Risk Factors Impact
            </h3>
            <FeatureImportanceChart />
            <p className="mt-4 text-xs text-muted-foreground">
              *Qualitative assessment of feature influence based on clinical correlations and model sensitivity.
            </p>
          </div>
        
        {/* Pipeline Section */}
        <div className="rounded-2xl bg-muted/30 p-8">
          <h3 className="mb-4 text-lg font-semibold">Preprocessing Pipeline</h3>
          <ol className="list-decimal space-y-3 pl-5 text-sm text-muted-foreground">
            <li>
              <strong className="text-foreground">Data Cleaning:</strong> Dropping ID column, converting Age from days to years.
            </li>
            <li>
              <strong className="text-foreground">Outlier Handling:</strong> Clipping extreme values for Height (120-220cm), Weight (30-200kg), and Blood Pressure.
            </li>
            <li>
              <strong className="text-foreground">Feature Engineering:</strong> Calculating <strong>BMI</strong> from Height and Weight.
            </li>
            <li>
              <strong className="text-foreground">Scaling:</strong> Standard Scaling applied to all Features to normalize range for KNN distance calculation.
            </li>
          </ol>
        </div>
      </section>
      </div>

      {/* Model Performance Metrics */}
      <section className="mt-20 mb-10">
        <h2 className="mb-8 text-2xl font-bold">Performance Matrix</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { metric: "Precision", val: "~71%", desc: "Reliability of positive predictions" },
            { metric: "Recall", val: "~69%", desc: "Ability to detect actual cases" },
            { metric: "F1-Score", val: "~70%", desc: "Harmonic mean of precision/recall" },
          ].map((m, i) => (
            <div key={i} className="group relative overflow-hidden rounded-xl border bg-card p-6 transition-all hover:border-primary/50">
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/5 transition-all group-hover:bg-primary/10"></div>
              <p className="text-sm font-medium text-muted-foreground">{m.metric}</p>
              <p className="mt-2 text-4xl font-bold text-foreground">{m.val}</p>
              <p className="mt-2 text-xs text-muted-foreground">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}

export default TechnicalDetails;
