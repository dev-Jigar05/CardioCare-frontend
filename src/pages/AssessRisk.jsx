import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";

function AssessRisk() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    ap_hi: "",
    ap_lo: "",
    cholesterol: "",
    gluc: "",
    smoke: "0",
    alco: "0",
    active: "1",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    const err = {};

    if (!formData.age || formData.age < 18 || formData.age > 100)
      err.age = "Age must be between 18 and 100";

    if (!formData.gender)
      err.gender = "Gender is required";

    if (!formData.height || formData.height < 120 || formData.height > 220)
      err.height = "Height must be between 120–220 cm";

    if (!formData.weight || formData.weight < 30 || formData.weight > 200)
      err.weight = "Weight must be between 30–200 kg";

    if (!formData.ap_hi || formData.ap_hi < 90 || formData.ap_hi > 200)
      err.ap_hi = "Invalid systolic BP";

    if (!formData.ap_lo || formData.ap_lo < 60 || formData.ap_lo > 130)
      err.ap_lo = "Invalid diastolic BP";

    if (!formData.cholesterol)
      err.cholesterol = "Required";

    if (!formData.gluc)
      err.gluc = "Required";

    setErrors(err);
    return Object.keys(err).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      age: Number(formData.age),
      gender: Number(formData.gender),
      height: Number(formData.height),
      weight: Number(formData.weight),
      ap_hi: Number(formData.ap_hi),
      ap_lo: Number(formData.ap_lo),
      cholesterol: Number(formData.cholesterol),
      gluc: Number(formData.gluc),
      smoke: Number(formData.smoke),
      alco: Number(formData.alco),
      active: Number(formData.active),
    };

    try {
      setLoading(true); // ✅ START loading

      const response = await axios.post(
        "http://127.0.0.1:8000/predict",
        payload
      );

      navigate("/result", {
        state: response.data,
      });
    } catch (error) {
      alert("Failed to get prediction. Please try again.");
    } finally {
      setLoading(false); // ✅ STOP loading
    }
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold">Assess Cardiovascular Risk</h1>
      <p className="mt-2 text-slate-600">
        Enter your health details to estimate cardiovascular risk.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 max-w-3xl rounded-2xl border bg-white p-6 space-y-6"
      >
        {/* Age + Gender */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="label">Age</label>
            <input
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              className="input"
            />
            {errors.age && <p className="error">{errors.age}</p>}
          </div>

          <div>
            <label className="label">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select</option>
              <option value="1">Male</option>
              <option value="0">Female</option>
            </select>
            {errors.gender && <p className="error">{errors.gender}</p>}
          </div>
        </div>

        {/* Height + Weight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="label">Height (cm)</label>
            <input
              name="height"
              type="number"
              value={formData.height}
              onChange={handleChange}
              className="input"
            />
            {errors.height && <p className="error">{errors.height}</p>}
          </div>

          <div>
            <label className="label">Weight (kg)</label>
            <input
              name="weight"
              type="number"
              value={formData.weight}
              onChange={handleChange}
              className="input"
            />
            {errors.weight && <p className="error">{errors.weight}</p>}
          </div>
        </div>

        {/* Blood Pressure */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="label">Systolic BP</label>
            <input
              name="ap_hi"
              type="number"
              value={formData.ap_hi}
              onChange={handleChange}
              className="input"
            />
            {errors.ap_hi && <p className="error">{errors.ap_hi}</p>}
          </div>

          <div>
            <label className="label">Diastolic BP</label>
            <input
              name="ap_lo"
              type="number"
              value={formData.ap_lo}
              onChange={handleChange}
              className="input"
            />
            {errors.ap_lo && <p className="error">{errors.ap_lo}</p>}
          </div>
        </div>

        {/* Cholesterol + Glucose */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="label">Cholesterol</label>
            <select
              name="cholesterol"
              value={formData.cholesterol}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select</option>
              <option value="1">Normal</option>
              <option value="2">Above Normal</option>
              <option value="3">Well Above Normal</option>
            </select>
            {errors.cholesterol && (
              <p className="error">{errors.cholesterol}</p>
            )}
          </div>

          <div>
            <label className="label">Glucose</label>
            <select
              name="gluc"
              value={formData.gluc}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select</option>
              <option value="1">Normal</option>
              <option value="2">Above Normal</option>
              <option value="3">Well Above Normal</option>
            </select>
            {errors.gluc && <p className="error">{errors.gluc}</p>}
          </div>
        </div>

        {/* Lifestyle */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="label">Smoking</label>
            <select name="smoke" onChange={handleChange} className="input">
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>

          <div>
            <label className="label">Alcohol</label>
            <select name="alco" onChange={handleChange} className="input">
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>

          <div>
            <label className="label">Physical Activity</label>
            <select name="active" onChange={handleChange} className="input">
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-3 w-full rounded-md bg-primary py-3 font-medium text-white transition active:scale-95 disabled:opacity-60"
        >
          {loading ? (
            <>
              <div className="spinner"></div>
              Calculating Risk...
            </>
          ) : (
            "Calculate Risk"
          )}
        </button>
      </form>
    </Layout>
  );
}

export default AssessRisk;
