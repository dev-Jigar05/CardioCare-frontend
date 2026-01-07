import { useState } from "react";
import Layout from "../components/Layout";
import { ChevronDown, MessageCircle, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Is this a medical diagnosis?",
    answer:
      "No. CardioCare is an educational tool designed to estimate cardiovascular risk based on statistical patterns in data. It does not replace professional medical diagnosis or advice.",
  },
  {
    question: "How accurate are the predictions?",
    answer:
      "The predictions are based on a machine learning model trained on historical health data. While the model can identify general risk patterns, accuracy may vary across individuals and populations.",
  },
  {
    question: "What data is required for assessment?",
    answer:
      "The assessment uses basic demographic information, clinical measurements such as blood pressure, and lifestyle indicators like smoking or physical activity.",
  },
  {
    question: "Is my data stored or shared?",
    answer:
      "No. CardioCare does not store or share user data. All inputs are used only for generating the prediction during the current session.",
  },
  {
    question: "Can this tool replace a doctor?",
    answer:
      "Absolutely not. This tool is intended to support awareness and education. Users should always consult qualified healthcare professionals for medical concerns.",
  },
  {
    question: "Why does the result include probability?",
    answer:
      "The probability reflects the model’s confidence based on input data. It helps users understand risk severity rather than relying only on a binary result.",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Layout>
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Everything you need to know about the product and how it works.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`group rounded-2xl border bg-card px-6 py-4 transition-all duration-200 ${
              openIndex === index ? "shadow-md ring-1 ring-primary/20" : "hover:bg-accent/50"
            }`}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="flex w-full items-center justify-between text-left"
            >
              <span className="text-lg font-medium pr-8">{faq.question}</span>
              <span className={`shrink-0 rounded-full bg-primary/10 p-2 text-primary transition-all duration-200 group-hover:bg-primary/20 ${openIndex === index ? "rotate-180 bg-primary/20" : ""}`}>
                <ChevronDown className="h-4 w-4" />
              </span>
            </button>
            <div
              className={`grid transition-all duration-200 ease-in-out ${
                openIndex === index ? "grid-rows-[1fr] opacity-100 pt-4" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden text-muted-foreground leading-relaxed">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>


    </Layout>
  );
}

export default FAQ;
