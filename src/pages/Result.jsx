import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Safety check
  if (!state) {
    return (
      <Layout>
        <Card className="max-w-xl mx-auto mt-10">
          <CardContent className="pt-6 text-center space-y-4">
            <p className="text-muted-foreground">
              No assessment data found. Please complete the risk assessment first.
            </p>
            <Button
              variant="link"
              onClick={() => navigate("/assess")}
              className="text-primary"
            >
              Go to Assessment
            </Button>
          </CardContent>
        </Card>
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
      <div className="max-w-4xl mx-auto py-8 text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Risk Assessment Result</h1>
        <p className="text-muted-foreground">
            Summary based on the information you provided.
        </p>
      </div>

      {/* Result Card */}
      <Card className="max-w-3xl mx-auto shadow-lg">
        <CardContent className="pt-8 space-y-8">
            <div className="flex flex-col items-center text-center space-y-6">

            {/* Risk Status */}
            <div
                className={`text-3xl md:text-5xl font-bold ${
                isHighRisk ? "text-red-500" : "text-green-500"
                }`}
            >
                {isHighRisk ? "High Risk" : "Low Risk"}
            </div>

            {/* Probability */}
            {probability !== null && (
                <p className="text-lg text-muted-foreground">
                Estimated probability:&nbsp;
                <span className="font-semibold text-foreground">
                    {(probability * 100).toFixed(1)}%
                </span>
                </p>
            )}

            {/* Severity Bar */}
            {riskPercent !== null && (
                <div className="w-full max-w-md">
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>Low</span>
                    <span>High</span>
                </div>

                <div className="h-3 w-full rounded-full bg-secondary overflow-hidden">
                    <div
                    className={`h-full ${getRiskColor(riskPercent)} transition-all duration-1000 ease-out`}
                    style={{ width: `${riskPercent}%` }}
                    />
                </div>

                <p className="mt-2 text-sm text-muted-foreground">
                    Risk severity:{" "}
                    <span className="font-medium text-foreground">{riskPercent}%</span>
                </p>
                </div>
            )}

            {/* Interpretation */}
            <p className="max-w-xl text-muted-foreground leading-relaxed">
                {isHighRisk
                ? "Your inputs indicate an elevated cardiovascular risk. This assessment is not a diagnosis, but it suggests that lifestyle changes and professional medical consultation may be beneficial."
                : "Your inputs indicate a lower cardiovascular risk. Maintaining a healthy lifestyle and regular check-ups are recommended."}
            </p>

            {/* Personalized Tips */}
            <div className="w-full max-w-xl text-left bg-muted/50 p-6 rounded-xl">
                <h3 className="mb-4 font-semibold text-foreground">
                Recommended Actions
                </h3>

                <ul className="space-y-3 text-muted-foreground">
                {getTips(risk, riskPercent).map((tip, idx) => (
                    <li key={idx} className="flex gap-3 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{tip}</span>
                    </li>
                ))}
                </ul>
            </div>

            {/* Disclaimer */}
            <p className="text-xs text-muted-foreground/60 max-w-lg">
                This tool is for educational purposes only and does not replace
                professional medical advice, diagnosis, or treatment.
            </p>
            </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-center gap-4 py-8 bg-muted/20">
            <Button
                variant="outline"
                onClick={downloadPDF}
                className="w-full sm:w-auto"
            >
                Download PDF Report
            </Button>

            <Button
                variant="default"
                onClick={() => navigate("/assess")}
                className="w-full sm:w-auto"
            >
                Recalculate
            </Button>

            <Button
                variant="ghost"
                onClick={() => navigate("/")}
                className="w-full sm:w-auto"
            >
                Back to Home
            </Button>
        </CardFooter>
      </Card>
    </Layout>
  );
}

export default Result;
