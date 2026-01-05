import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="text-center space-y-6 bg-secondary py-24 rounded-2xl">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
        Cardiovascular Risk Assessment
      </h1>

      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Estimate your heart disease risk using clinically guided machine learning
        and interpretable health indicators.
      </p>

      <Button size="lg" className="transition-all duration-150 active:scale-95 active:opacity-90" onClick={() => navigate("/assess")}>
        Assess Your Risk
      </Button>
    </section>
  );
}

export default Hero;
