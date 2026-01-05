import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import Layout from "../components/Layout";

function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Safety check
  if (!state) {
    return (
      <Layout>
        <div className="max-w-xl mx-auto rounded-2xl border bg-white p-6">
          <p className="text-slate-600">
            No assessment data found. Please complete the risk assessment first.
          </p>
          <button
            onClick={() => navigate("/assess")}
            className="mt-4 text-primary underline"
          >
            Go to Assessment
          </button>
        </div>
      </Layout>
    );
  }

  const { risk, probability } = state;
  const isHighRisk = risk === 1;

  // ---------------- Severity helpers ----------------
  const riskPercent =
    probability !== null ? Math.round(probability * 100) : null;

  function getRiskColor(percent) {
    if (percent < 30) return "bg-green-500";
    if (percent < 60) return "bg-yellow-500";
    return "bg-red-500";
  }

  // ---------------- Personalized tips ----------------
  function getTips(risk, percent) {
    if (risk === 1) {
      const tips = [
        "Consult a healthcare professional for a detailed cardiovascular evaluation.",
        "Monitor blood pressure and cholesterol levels regularly.",
        "Adopt a heart-healthy diet (low salt, low saturated fat).",
        "Engage in moderate physical activity for at least 150 minutes per week.",
        "Avoid smoking and limit alcohol consumption.",
      ];

      if (percent !== null && percent > 70) {
        tips.unshift(
          "Your estimated risk is significantly elevated. Early medical guidance is strongly recommended."
        );
      }
      return tips;
    }

    return [
      "Maintain a balanced diet rich in fruits, vegetables, and whole grains.",
      "Continue regular physical activity to support cardiovascular health.",
      "Schedule routine health check-ups to monitor key indicators.",
      "Avoid smoking and maintain moderate alcohol intake.",
      "Manage stress through adequate sleep and relaxation.",
    ];
  }

  // ---------------- PDF Generator ----------------
  function downloadPDF() {
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Cardiovascular Risk Assessment Report", 14, 20);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(
      `Risk Level: ${isHighRisk ? "High Risk" : "Low Risk"}`,
      14,
      35
    );

    if (riskPercent !== null) {
      doc.text(`Estimated Probability: ${riskPercent}%`, 14, 45);
    }

    doc.text("Summary:", 14, 60);

    const summaryText = isHighRisk
      ? "This assessment indicates an elevated cardiovascular risk. This is not a diagnosis, but lifestyle changes and professional medical consultation are recommended."
      : "This assessment indicates a lower cardiovascular risk. Maintaining a healthy lifestyle is advised.";

    doc.text(summaryText, 14, 70, { maxWidth: 180 });

    doc.text("Recommended Actions:", 14, 100);

    const tips = getTips(risk, riskPercent);
    let y = 110;
    tips.forEach((tip) => {
      doc.text(`• ${tip}`, 14, y, { maxWidth: 180 });
      y += 8;
    });

    doc.setFontSize(10);
    doc.text(
      "Disclaimer: This report is for educational purposes only and does not replace professional medical advice, diagnosis, or treatment.",
      14,
      270,
      { maxWidth: 180 }
    );

    doc.save("cardio-risk-report.pdf");
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold">Risk Assessment Result</h1>
      <p className="mt-2 text-slate-600">
        Summary based on the information you provided.
      </p>

      {/* Result Card */}
      <div className="mt-10 max-w-3xl mx-auto rounded-2xl border bg-white p-8">
        <div className="flex flex-col items-center text-center space-y-6">

          {/* Risk Status */}
          <div
            className={`text-5xl font-bold ${
              isHighRisk ? "text-red-600" : "text-green-600"
            }`}
          >
            {isHighRisk ? "High Risk" : "Low Risk"}
          </div>

          {/* Probability */}
          {probability !== null && (
            <p className="text-slate-700">
              Estimated probability:&nbsp;
              <span className="font-semibold">
                {(probability * 100).toFixed(1)}%
              </span>
            </p>
          )}

          {/* Severity Bar */}
          {riskPercent !== null && (
            <div className="w-full max-w-md">
              <div className="flex justify-between text-sm text-slate-500 mb-1">
                <span>Low</span>
                <span>High</span>
              </div>

              <div className="h-3 w-full rounded-full bg-slate-200 overflow-hidden">
                <div
                  className={`h-full ${getRiskColor(riskPercent)} transition-all`}
                  style={{ width: `${riskPercent}%` }}
                />
              </div>

              <p className="mt-2 text-sm text-slate-600">
                Risk severity:{" "}
                <span className="font-medium">{riskPercent}%</span>
              </p>
            </div>
          )}

          {/* Interpretation */}
          <p className="max-w-xl text-slate-600">
            {isHighRisk
              ? "Your inputs indicate an elevated cardiovascular risk. This assessment is not a diagnosis, but it suggests that lifestyle changes and professional medical consultation may be beneficial."
              : "Your inputs indicate a lower cardiovascular risk. Maintaining a healthy lifestyle and regular check-ups are recommended."}
          </p>

          {/* Personalized Tips */}
          <div className="w-full max-w-xl text-left">
            <h3 className="mb-3 font-semibold text-slate-900">
              Recommended Actions
            </h3>

            <ul className="space-y-2 text-slate-600">
              {getTips(risk, riskPercent).map((tip, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Divider */}
          <div className="w-full border-t" />

          {/* Disclaimer */}
          <p className="text-sm text-slate-500">
            This tool is for educational purposes only and does not replace
            professional medical advice, diagnosis, or treatment.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex justify-center gap-8">
        <button
          onClick={downloadPDF}
          className="text-primary font-medium underline"
        >
          Download PDF Report
        </button>

        <button
          onClick={() => navigate("/assess")}
          className="text-slate-600 underline"
        >
          Recalculate
        </button>

        <button
          onClick={() => navigate("/")}
          className="text-slate-600 underline"
        >
          Back to Home
        </button>
      </div>
    </Layout>
  );
}

export default Result;
