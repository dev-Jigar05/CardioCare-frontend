import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Activity, ShieldCheck, Zap } from "lucide-react";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden py-8 md:py-12">


      <div className="container relative mx-auto px-4 text-center">

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          Your Heart Health, <br className="hidden md:block" />
          <span className="text-gradient">Powered by AI</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-100">
          Estimate your cardiovascular risk with clinical precision. Our advanced machine learning model 
          analyzes key health indicators to provide you with actionable insights.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
          <Button 
            size="lg" 
            className="w-full sm:w-auto text-base h-12 px-8 rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:scale-105" 
            onClick={() => navigate("/assess")}
          >
            Assess Your Risk
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full sm:w-auto text-base h-12 px-8 rounded-full border-2 hover:bg-secondary/50 transition-all" 
            onClick={() => navigate("/about")}
          >
            Learn How It Works
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          {[
            { icon: Activity, title: "Precision Analysis", text: "Driven by verified clinical datasets." },
            { icon: ShieldCheck, title: "Privacy First", text: "Your health data never leaves your device." },
            { icon: Zap, title: "Instant Results", text: "Get comprehensive insights in seconds." },
          ].map((feature, i) => (
            <div key={i} className="glass-card p-6 rounded-2xl text-left border border-white/20 dark:border-white/5">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
