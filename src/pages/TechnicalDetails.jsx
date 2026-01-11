import Layout from "../components/Layout";
import {
  AgeDistributionChart,
  TargetDistributionChart,
  FeatureImportanceChart,
  ModelComparisonChart,
} from "../components/TechCharts";
import { FaDatabase, FaBrain, FaHeartbeat, FaClipboardCheck } from "react-icons/fa";

function TechnicalDetails() {
  return (
    <Layout>
      {/* Header Section */}
      <div className="relative mb-10 md:mb-16 rounded-3xl bg-gradient-to-br from-primary/5 via-primary/10 to-transparent p-6 md:p-10 text-center dark:from-primary/10 dark:via-primary/5 animate-in fade-in slide-in-from-bottom-6 duration-700">
        <div className="mx-auto max-w-2xl">

          <h1 className="mb-4 text-3xl md:text-4xl font-extrabold tracking-tight sm:text-5xl">
            Technical Architecture
          </h1>
          <p className="text-base md:text-lg text-muted-foreground">
            A deep dive into the data, model architecture, and performance metrics powering CardioCare's AI engine.
          </p>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: FaDatabase, label: "Dataset Size", value: "70,000 Samples", sub: "Cardio Train Dataset" },
          { icon: FaBrain, label: "Model Type", value: "XGBoost Classifier", sub: "Gradient Boosting" },
          { icon: FaClipboardCheck, label: "Accuracy", value: "~73%", sub: "Test Set" },
          { icon: FaHeartbeat, label: "Features", value: "10 Inputs", sub: "Clinical & Vitals" },
        ].map((stat, i) => (
          <div key={i} className="rounded-2xl border bg-card p-4 md:p-6 shadow-sm transition-all hover:shadow-md">
            <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-primary/10 p-3 text-primary">
              <stat.icon className="h-6 w-6" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
            <p className="mt-1 text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 md:mt-20 grid gap-8 md:gap-12 lg:grid-cols-2">
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
              Our core engine is a <strong>XGBoost Classifier</strong>. 
              A powerful gradient boosting framework that builds an ensemble of decision trees 
              to capture complex non-linear relationships in the 70,000-sample database.
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
          </ol>
        </div>


      </section>
      </div>

      {/* Model Comparison Section */}
      <section className="mt-12 mb-20">
        <h2 className="text-2xl font-bold mb-6">Model Experimentation</h2>
        <div className="rounded-2xl border bg-card p-8 shadow-sm grid md:grid-cols-2 gap-12 items-center">
          <div>
              <h3 className="text-lg font-semibold mb-3">Why XGBoost?</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
              We rigorously tested 5 different algorithms. While Decision Trees and Logistic Regression performed well, 
              <strong> XGBoost</strong> provided the best balance of accuracy (73.3%) and generalizability (AUC 0.80).
              </p>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    Higher AUC score indicating better separation of classes.
                </li>
                <li className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    Robust handling of outliers in blood pressure data.
                </li>
              </ul>
          </div>
          <div>
              <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Model Accuracy Comparison
            </h3>
            <ModelComparisonChart />
          </div>
        </div>
      </section>

      {/* Model Performance Metrics */}
      <section className="mt-20 mb-10">
        <h2 className="mb-8 text-2xl font-bold">Performance Matrix</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { metric: "Precision", val: "~74%", desc: "Reliability of positive predictions" },
            { metric: "Recall", val: "~72%", desc: "Ability to detect actual cases" },
            { metric: "ROC AUC", val: "~0.80", desc: "Model discriminative ability" },
          ].map((m, i) => (
            <div key={i} className="group relative overflow-hidden rounded-xl border bg-card p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/50">
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
