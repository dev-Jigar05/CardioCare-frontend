import Layout from "../components/Layout";
import Hero from "../components/Hero";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FaDatabase, FaHeartbeat, FaFileAlt, FaCheckCircle, FaArrowRight } from "react-icons/fa";

function Landing() {
  const navigate = useNavigate();

  return (
    <Layout>
      <Hero />

      {/* Stats Section */}
      <section className="py-8 border-y bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-6 text-center">
            {[
              { label: "Patient Records", value: "70k+" },
              { label: "Accuracy Rate", value: "~73%" },
              { label: "Risk Factors", value: "10" },
            ].map((stat, i) => (
              <div key={i} className="space-y-2 rounded-xl border border-transparent bg-background/50 p-6 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-md hover:-translate-y-1">
                <p className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-10">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-10 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">How CardioCare Works</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our streamlined process makes checking your heart health simple, fast, and secure.
            </p>
          </div>



          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-border to-transparent -z-10" />

            {[
              { 
                icon: FaFileAlt, 
                step: "01", 
                title: "Enter Data", 
                desc: "Input your basic health metrics like age, blood pressure, and cholesterol." 
              },
              { 
                icon: FaHeartbeat, 
                step: "02", 
                title: "AI Analysis", 
                desc: "Our machine learning model processes your data against 70,000+ known cases." 
              },
              { 
                icon: FaCheckCircle, 
                step: "03", 
                title: "Get Results", 
                desc: "Receive an instant risk assessment with personalized insights." 
              },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center space-y-4 bg-background p-4">
                <div className="relative">
                  <div className="absolute -inset-2 bg-primary/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="h-24 w-24 rounded-full border-2 border-primary/20 bg-background flex items-center justify-center shadow-sm z-10 relative">
                    <item.icon className="h-10 w-10 text-primary" />
                    <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                      {item.step}
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold pt-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-background via-muted/50 to-background px-6 py-10 md:px-16 md:py-12 text-center shadow-sm dark:from-background dark:via-primary/5 dark:to-background">
            {/* Decorative elements */}
            <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />
            <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
            
            <div className="relative z-10 max-w-3xl mx-auto space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
                Ready to take control of your <br className="hidden md:block"/>
                <span className="text-primary">Heart Health?</span>
              </h2>
              <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                Join thousands of users utilizing our advanced AI for early detection and peace of mind.
                It takes less than a minute.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button 
                  size="lg" 
                  className="h-14 px-8 text-base font-semibold rounded-full shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:scale-105 transition-all duration-300"
                  onClick={() => navigate("/assess")}
                >
                  Start Assessment Now
                  <FaArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Landing;
