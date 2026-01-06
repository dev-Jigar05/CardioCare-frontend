import Layout from "../components/Layout";

function About() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold">About CardioCare</h1>

      <p className="mt-2 max-w-3xl text-muted-foreground">
        CardioCare is a web-based cardiovascular risk assessment tool designed
        to provide users with an early indication of potential heart disease
        risk using machine learning.
      </p>

      {/* Section 1 */}
      <section className="mt-12 max-w-3xl space-y-4">
        <h2 className="text-xl font-semibold">What is CardioCare?</h2>

        <p className="text-muted-foreground">
          CardioCare allows users to input basic health indicators such as age,
          blood pressure, cholesterol levels, and lifestyle factors. Based on
          these inputs, the system estimates cardiovascular risk using a trained
          machine learning model.
        </p>

        <p className="text-muted-foreground">
          The goal is not to replace medical professionals, but to provide an
          accessible and educational tool that encourages early awareness and
          proactive health management.
        </p>
      </section>

      {/* Section 2 */}
      <section className="mt-12 max-w-3xl space-y-4">
        <h2 className="text-xl font-semibold">Why This Project?</h2>

        <p className="text-muted-foreground">
          Cardiovascular diseases remain one of the leading causes of mortality
          worldwide. Early identification of risk factors can significantly
          improve outcomes through lifestyle changes and timely medical
          intervention.
        </p>

        <p className="text-muted-foreground">
          This project was built to explore the practical application of machine
          learning in healthcare while maintaining a strong focus on user
          experience, explainability, and ethical responsibility.
        </p>
      </section>

      {/* Section 3 */}
      <section className="mt-12 max-w-3xl space-y-4">
        <h2 className="text-xl font-semibold">How Does It Work?</h2>

        <p className="text-muted-foreground">
          The system uses a supervised machine learning model trained on
          historical cardiovascular health data. User inputs are preprocessed
          and transformed before being passed to the model for prediction.
        </p>

        <p className="text-muted-foreground">
          The output includes a risk classification along with an estimated
          probability. This information is then translated into user-friendly
          insights and recommendations to improve understanding and usability.
        </p>
      </section>

      {/* Section 4 */}
      <section className="mt-12 max-w-3xl space-y-4">
        <h2 className="text-xl font-semibold">Limitations & Disclaimer</h2>

        <p className="text-muted-foreground">
          CardioCare is an educational tool and should not be considered a
          diagnostic system. The predictions are based on statistical patterns
          in historical data and may not account for all individual medical
          conditions.
        </p>

        <p className="text-muted-foreground">
          Users are strongly advised to consult qualified healthcare
          professionals for medical advice, diagnosis, or treatment.
        </p>
      </section>
    </Layout>
  );
}

export default About;
