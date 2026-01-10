import Layout from "../components/Layout";
import { FaHeartbeat, FaBullseye, FaExclamationCircle, FaBrain, FaShieldAlt, FaInfoCircle } from "react-icons/fa";

function About() {
  return (
    <Layout>
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Empowering Heart Health</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Bridging the gap between advanced machine learning and daily health awareness.
        </p>
      </div>

      {/* Mission Grid */}
      <section className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="rounded-2xl border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="h-7 w-7 mb-4">
            <img src="/logo.png" alt="CardioCare Logo" className="h-full w-full object-contain" />
          </div>
          <h2 className="text-xl font-semibold mb-2">What is CardioCare?</h2>
          <p className="text-muted-foreground leading-relaxed">
            An intelligent risk assessment tool that uses your health data—like age, BP, and cholesterol—to 
            estimate cardiovascular health.
          </p>
        </div>

        <div className="rounded-2xl border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
           <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
            <FaBullseye className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Our Goal</h2>
          <p className="text-muted-foreground leading-relaxed">
            We aim to democratize health screening, providing an accessible first step 
             towards proactive heart care and awareness.
          </p>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">Why This Matters</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { icon: FaExclamationCircle, title: "Early Detection", text: "Identifying risks early can significantly improve long-term outcomes." },
            { icon: FaBrain, title: "AI Precision", text: "Leveraging 70,000+ records to find patterns invisible to the human eye." },
            { icon: FaShieldAlt, title: "Privacy First", text: "Your health data is processed securely and never stored without consent." },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center p-4">
              <div className="mb-3 rounded-full bg-secondary p-3 text-secondary-foreground">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-900 mx-auto max-w-3xl p-4 flex gap-4 items-start">
        <FaInfoCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h3 className="font-semibold text-amber-900 dark:text-amber-200">Medical Disclaimer</h3>
           <p className="text-sm text-amber-800/90 dark:text-amber-300/80 leading-relaxed">
            CardioCare is an educational tool based on statistical data. It is <strong>not a diagnostic device</strong>. 
            Always consult a qualified healthcare professional for medical advice, diagnosis, or treatment.
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default About;
