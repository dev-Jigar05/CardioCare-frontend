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

  const { risk, probability, formData } = state;
  const isHighRisk = risk === 1;

  // ---------------- Severity helpers ----------------
  const riskPercent =
    probability !== null ? Math.round(probability * 100) : null;

  function getRiskColor(percent) {
    if (percent < 30) return "bg-green-500";
    if (percent < 60) return "bg-yellow-500";
    return "bg-red-500";
  }

  // ---------------- Formatter helpers ----------------
  function formatGender(val) { return Number(val) === 1 ? "Male" : "Female"; }
  function formatYesNo(val) { return Number(val) === 1 ? "Yes" : "No"; }
  function formatActive(val) { return Number(val) === 1 ? "Active" : "Inactive"; }
  function formatLevel(val) {
    const v = Number(val);
    if (v === 1) return "Normal";
    if (v === 2) return "Above Normal";
    return "Well Above Normal";
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
    
    // Result Section
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 30);
    doc.text(`Risk Level: ${isHighRisk ? "High Risk" : "Low Risk"}`, 14, 40);
    if (riskPercent !== null) {
      doc.text(`Estimated Probability: ${riskPercent}%`, 14, 50);
    }

    // Patient Details Section
    if (formData) {
        doc.setFont("helvetica", "bold");
        doc.text("Patient Details:", 14, 65);
        doc.setFont("helvetica", "normal");
        
        const details = [
            `Age: ${formData.age} years`,
            `Gender: ${formatGender(formData.gender)}`,
            `Height: ${formData.height} cm`,
            `Weight: ${formData.weight} kg`,
            `Blood Pressure: ${formData.ap_hi}/${formData.ap_lo} mmHg`,
            `Cholesterol: ${formatLevel(formData.cholesterol)}`,
            `Glucose: ${formatLevel(formData.gluc)}`,
            `Smoker: ${formatYesNo(formData.smoke)}`,
            `Alcohol Intake: ${formatYesNo(formData.alco)}`,
            `Physical Activity: ${formatActive(formData.active)}`,
        ];

        let dy = 75;
        // Print in 2 columns
        details.forEach((item, i) => {
            const x = i % 2 === 0 ? 14 : 110;
            const y = dy + Math.floor(i / 2) * 8;
            doc.text(item, x, y);
        });
    }

    doc.setFont("helvetica", "bold");
    doc.text("Summary:", 14, 130);
    doc.setFont("helvetica", "normal");

    const summaryText = isHighRisk
      ? "This assessment indicates an elevated cardiovascular risk. This is not a diagnosis, but lifestyle changes and professional medical consultation are recommended."
      : "This assessment indicates a lower cardiovascular risk. Maintaining a healthy lifestyle is advised.";

    doc.text(summaryText, 14, 140, { maxWidth: 180 });

    doc.setFont("helvetica", "bold");
    doc.text("Recommended Actions:", 14, 160);
    doc.setFont("helvetica", "normal");

    const tips = getTips(risk, riskPercent);
    let y = 170;
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

            {/* Circular Risk Indicator */}
            {riskPercent !== null && (
              <div className="relative flex items-center justify-center p-4">
                {/* Outer Ring */}
                <svg className="h-48 w-48 -rotate-90 transform">
                  <circle
                    className="text-secondary"
                    strokeWidth="12"
                    stroke="currentColor"
                    fill="transparent"
                    r="90"
                    cx="96"
                    cy="96"
                  />
                  <circle
                    className={`${getRiskColor(riskPercent)} transition-all duration-1000 ease-out`}
                    strokeWidth="12"
                    strokeDasharray={2 * Math.PI * 90}
                    strokeDashoffset={2 * Math.PI * 90 * (1 - riskPercent / 100)}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="90"
                    cx="96"
                    cy="96"
                  />
                </svg>
                
                {/* Center Content */}
                <div className="absolute flex flex-col items-center">
                  <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Risk Score
                  </span>
                  <span className="text-5xl font-extrabold tracking-tighter">
                    {riskPercent}%
                  </span>
                </div>
              </div>
            )}

            {/* Interpretation */}
            <p className="max-w-xl text-muted-foreground leading-relaxed">
                {isHighRisk
                ? "Your inputs indicate an elevated cardiovascular risk. This assessment is not a diagnosis, but it suggests that lifestyle changes and professional medical consultation may be beneficial."
                : "Your inputs indicate a lower cardiovascular risk. Maintaining a healthy lifestyle and regular check-ups are recommended."}
            </p>

            {/* Patient Data Summary */}
            {formData && (
              <div className="w-full max-w-xl bg-muted/30 p-6 rounded-xl border border-border/50 text-left">
                 <h3 className="mb-4 font-semibold text-foreground flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Input Summary
                 </h3>
                 <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
                    <div className="text-muted-foreground">Age: <span className="text-foreground font-medium">{formData.age}</span></div>
                    <div className="text-muted-foreground">Gender: <span className="text-foreground font-medium">{formatGender(formData.gender)}</span></div>
                    <div className="text-muted-foreground">BP: <span className="text-foreground font-medium">{formData.ap_hi}/{formData.ap_lo}</span></div>
                    <div className="text-muted-foreground">BMI High: <span className="text-foreground font-medium">{Number(formData.weight) > 90 ? "Yes" : "No"}</span></div>
                    <div className="text-muted-foreground">Cholesterol: <span className="text-foreground font-medium">{formatLevel(formData.cholesterol)}</span></div>
                    <div className="text-muted-foreground">Glucose: <span className="text-foreground font-medium">{formatLevel(formData.gluc)}</span></div>
                    <div className="text-muted-foreground">Smoker: <span className="text-foreground font-medium">{formatYesNo(formData.smoke)}</span></div>
                    <div className="text-muted-foreground">Active: <span className="text-foreground font-medium">{formatActive(formData.active)}</span></div>
                 </div>
              </div>
            )}

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
                onClick={() => navigate("/assess", { state: { formData: state.formData } })}
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
