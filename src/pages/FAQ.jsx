import Layout from "../components/Layout";

function FAQ() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>

      <p className="mt-2 max-w-3xl text-slate-600">
        Answers to common questions about CardioCare and how the risk assessment
        works.
      </p>

      <div className="mt-12 max-w-3xl space-y-8">

        {/* Q1 */}
        <div>
          <h3 className="text-lg font-semibold">
            Is this a medical diagnosis?
          </h3>
          <p className="mt-2 text-slate-600">
            No. CardioCare is an educational tool designed to estimate
            cardiovascular risk based on statistical patterns in data. It does
            not replace professional medical diagnosis or advice.
          </p>
        </div>

        {/* Q2 */}
        <div>
          <h3 className="text-lg font-semibold">
            How accurate are the predictions?
          </h3>
          <p className="mt-2 text-slate-600">
            The predictions are based on a machine learning model trained on
            historical health data. While the model can identify general risk
            patterns, accuracy may vary across individuals and populations.
          </p>
        </div>

        {/* Q3 */}
        <div>
          <h3 className="text-lg font-semibold">
            What data is required for assessment?
          </h3>
          <p className="mt-2 text-slate-600">
            The assessment uses basic demographic information, clinical
            measurements such as blood pressure, and lifestyle indicators like
            smoking or physical activity.
          </p>
        </div>

        {/* Q4 */}
        <div>
          <h3 className="text-lg font-semibold">
            Is my data stored or shared?
          </h3>
          <p className="mt-2 text-slate-600">
            No. CardioCare does not store or share user data. All inputs are used
            only for generating the prediction during the current session.
          </p>
        </div>

        {/* Q5 */}
        <div>
          <h3 className="text-lg font-semibold">
            Can this tool replace a doctor?
          </h3>
          <p className="mt-2 text-slate-600">
            Absolutely not. This tool is intended to support awareness and
            education. Users should always consult qualified healthcare
            professionals for medical concerns.
          </p>
        </div>

        {/* Q6 */}
        <div>
          <h3 className="text-lg font-semibold">
            Why does the result include probability?
          </h3>
          <p className="mt-2 text-slate-600">
            The probability reflects the model’s confidence based on input data.
            It helps users understand risk severity rather than relying only on
            a binary result.
          </p>
        </div>

      </div>
    </Layout>
  );
}

export default FAQ;
