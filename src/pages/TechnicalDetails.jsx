import Layout from "../components/Layout";

function TechnicalDetails() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold">Technical Details</h1>

      <p className="mt-2 max-w-4xl text-muted-foreground">
        This page provides a complete technical overview of the CardioCare
        project, including data sources, feature engineering, machine learning
        model design, and system limitations.
      </p>

      {/* ================= High-Level Summary ================= */}
      <div className="mt-10 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <p className="text-sm text-muted-foreground">Model</p>
          <p className="mt-2 text-lg font-semibold">K-Nearest Neighbors (KNN)</p>
        </div>

        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <p className="text-sm text-muted-foreground">Data Type</p>
          <p className="mt-2 text-lg font-semibold">Structured Health Data</p>
        </div>

        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <p className="text-sm text-muted-foreground">Output</p>
          <p className="mt-2 text-lg font-semibold">Risk + Probability</p>
        </div>
      </div>

      {/* ================= System Pipeline ================= */}
      <div className="mt-16 max-w-4xl rounded-2xl border bg-card p-8 shadow-sm">
        <h2 className="text-xl font-semibold mb-6 text-center">
          End-to-End Prediction Pipeline
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center text-sm">
          {[
            "User Inputs",
            "Validation",
            "Feature Engineering",
            "ML Model",
            "Risk Output",
          ].map((step, idx) => (
            <div
              key={idx}
              className="rounded-xl border bg-muted/50 px-4 py-6 font-medium text-foreground"
            >
              {step}
            </div>
          ))}
        </div>
      </div>

      {/* ================= Dataset ================= */}
      <section className="mt-16 max-w-4xl rounded-2xl border bg-card p-8 shadow-sm">
        <h2 className="text-xl font-semibold">Dataset</h2>
        <p className="mt-4 text-muted-foreground">
          The model was trained on a publicly available cardiovascular health
          dataset containing anonymized patient records. The dataset includes
          demographic information, clinical measurements, and lifestyle-related
          indicators commonly used in cardiovascular risk analysis.
        </p>
      </section>

      {/* ================= Feature Engineering ================= */}
      <section className="mt-16 max-w-4xl">
        <h2 className="text-xl font-semibold">Feature Engineering</h2>

        <p className="mt-4 max-w-3xl text-muted-foreground">
          Input data is validated and transformed to ensure consistency with the
          training pipeline. Numerical features are scaled, categorical features
          are encoded, and clinically relevant derived features are computed.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {[
            "Age",
            "Gender",
            "Height & Weight",
            "Body Mass Index (BMI)",
            "Systolic & Diastolic BP",
            "Cholesterol",
            "Glucose",
            "Smoking",
            "Alcohol",
            "Physical Activity",
          ].map((feature) => (
            <div
              key={feature}
              className="rounded-xl border bg-muted/50 px-4 py-3 text-sm font-medium text-foreground"
            >
              {feature}
            </div>
          ))}
        </div>
      </section>

      {/* ================= Model Design ================= */}
      <section className="mt-16 max-w-4xl rounded-2xl border bg-card p-8 shadow-sm">
        <h2 className="text-xl font-semibold">Model Design</h2>

        <p className="mt-4 text-muted-foreground">
          CardioCare uses a supervised machine learning classification approach
          based on the <span className="font-medium">K-Nearest Neighbors (KNN)</span>{" "}
          algorithm. The model estimates cardiovascular risk by identifying
          similarity between a user’s health profile and historical records.
        </p>

        <p className="mt-3 text-muted-foreground">
          KNN was selected for its interpretability, simplicity, and effectiveness
          on structured tabular data, where distance-based similarity is
          meaningful and easy to reason about.
        </p>
      </section>

      {/* ================= Feature Influence (Illustrative) ================= */}
      <section className="mt-16 max-w-4xl">
        <h2 className="text-xl font-semibold">
          Key Factors Influencing Risk (Illustrative)
        </h2>

        <div className="mt-6 space-y-3 max-w-3xl text-sm">
          {[
            { label: "Blood Pressure", value: 80 },
            { label: "Cholesterol", value: 65 },
            { label: "BMI", value: 55 },
            { label: "Age", value: 50 },
            { label: "Lifestyle Factors", value: 40 },
          ].map((item) => (
            <div key={item.label}>
              <div className="mb-1 flex justify-between text-muted-foreground">
                <span>{item.label}</span>
                <span>{item.value}%</span>
              </div>
              <div className="h-2 rounded-full bg-secondary">
                <div
                  className="h-2 rounded-full bg-primary"
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <p className="mt-3 text-xs text-muted-foreground/80">
          *Illustrative representation to explain relative influence of features.
        </p>
      </section>

      {/* ================= Evaluation ================= */}
      <section className="mt-16 max-w-4xl rounded-2xl border bg-card p-8 shadow-sm">
        <h2 className="text-xl font-semibold">Model Evaluation</h2>
        <p className="mt-4 text-muted-foreground">
          Model performance was evaluated using standard classification metrics.
          The focus was on maintaining balanced sensitivity and generalization
          rather than optimizing a single performance score.
        </p>
      </section>

      {/* ================= Limitations ================= */}
      <section className="mt-16 max-w-4xl rounded-2xl border bg-card p-8 shadow-sm">
        <h2 className="text-xl font-semibold">Limitations & Future Improvements</h2>
        <p className="mt-4 text-muted-foreground">
          The model is limited by dataset size and population diversity. Future
          improvements could include ensemble models, deeper explainability
          techniques, and expanded datasets to improve robustness and fairness.
        </p>
      </section>
    </Layout>
  );
}

export default TechnicalDetails;
