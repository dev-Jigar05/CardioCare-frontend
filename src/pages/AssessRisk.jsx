import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FaSpinner, FaHeartbeat, FaUser, FaRuler, FaFire } from "react-icons/fa";

const FormSection = ({ title, icon: Icon, children }) => (
  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div className="flex items-center gap-2 pb-2 border-b border-border/50">
      <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
        <Icon className="h-4 w-4" />
      </div>
      <h3 className="font-semibold text-lg">{title}</h3>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
      {children}
    </div>
  </div>
);

function AssessRisk() {
  const location = useLocation(); // Add useLocation hook
  const navigate = useNavigate();

  const [formData, setFormData] = useState(location.state?.formData || {
    age: "", gender: "",
    height: "", weight: "",
    ap_hi: "", ap_lo: "",
    cholesterol: "", gluc: "",
    smoke: "0", alco: "0", active: "1",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value, type } = e.target;
    // Prevent negative inputs
    if (type === "number" && value !== "" && Number(value) < 0) return;

    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  }

  function handleSelectChange(name, value) {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  }

  function validate() {
    const err = {};
    if (!formData.age || formData.age < 18 || formData.age > 100) err.age = "Age: 18-100";
    if (!formData.gender) err.gender = "Required";
    if (!formData.height || formData.height < 50 || formData.height > 250) err.height = "Height: 50-250cm";
    if (!formData.weight || formData.weight < 30 || formData.weight > 300) err.weight = "Weight: 30-300kg";
    if (!formData.ap_hi || formData.ap_hi < 60 || formData.ap_hi > 240) err.ap_hi = "Invalid Systolic";
    if (!formData.ap_lo || formData.ap_lo < 40 || formData.ap_lo > 180) err.ap_lo = "Invalid Diastolic";
    if (!formData.cholesterol) err.cholesterol = "Required";
    if (!formData.gluc) err.gluc = "Required";

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
      setLoading(true);
      const response = await axios.post("https://cardiocare-backend-ifle.onrender.com/predict", payload);
      // Pass both result data and original form data
      navigate("/result", { state: { ...response.data, formData } }); 
    } catch (error) {
      alert("Failed to get prediction. Please try again.");
    } finally {
      setLoading(false);
    }
  }



  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-8">
        <div className="text-center mb-12 space-y-4 animate-in fade-in zoom-in-95 duration-700">
           <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/5 text-primary mb-4">
              <FaHeartbeat className="h-8 w-8" />
           </div>
           <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Assess Your Risk</h1>
           <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Complete the form below with your recent health metrics. Our AI model will analyze your inputs instantly.
           </p>
        </div>

        <Card className="bg-card shadow-xl border">
          <CardHeader className="bg-muted/20 pb-8">
             <CardTitle className="text-xl">Patient Information</CardTitle>
             <CardDescription>Enter values accurately for the best results.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-8 space-y-10">
            <form onSubmit={handleSubmit} className="space-y-10">
                
                {/* Personal Details */}
                <FormSection title="Personal Details" icon={FaUser}>
                    <div className="space-y-2">
                        <Label htmlFor="age">Age (years)</Label>
                        <Input id="age" name="age" type="number" min="0" placeholder="45" value={formData.age} onChange={handleChange} className={errors.age ? "border-destructive ring-destructive/20" : ""} />
                        {errors.age && <p className="error">{errors.age}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="gender">Gender</Label>
                        <Select name="gender" value={formData.gender} onValueChange={(val) => handleSelectChange("gender", val)}>
                            <SelectTrigger className={errors.gender ? "border-destructive ring-destructive/20" : ""}>
                                <SelectValue placeholder="Select..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">Male</SelectItem>
                                <SelectItem value="0">Female</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.gender && <p className="error">{errors.gender}</p>}
                    </div>
                </FormSection>

                {/* Vitals */}
                <FormSection title="Body Metrics" icon={FaRuler}>
                    <div className="space-y-2">
                        <Label htmlFor="height">Height (cm)</Label>
                        <Input id="height" name="height" type="number" min="0" placeholder="175" value={formData.height} onChange={handleChange} className={errors.height ? "border-destructive ring-destructive/20" : ""} />
                        {errors.height && <p className="error">{errors.height}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="weight">Weight (kg)</Label>
                        <Input id="weight" name="weight" type="number" min="0" placeholder="75" value={formData.weight} onChange={handleChange} className={errors.weight ? "border-destructive ring-destructive/20" : ""} />
                        {errors.weight && <p className="error">{errors.weight}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="ap_hi">Systolic BP (mmHg)</Label>
                        <Input id="ap_hi" name="ap_hi" type="number" min="0" placeholder="120" value={formData.ap_hi} onChange={handleChange} className={errors.ap_hi ? "border-destructive ring-destructive/20" : ""} />
                        {errors.ap_hi && <p className="error">{errors.ap_hi}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="ap_lo">Diastolic BP (mmHg)</Label>
                        <Input id="ap_lo" name="ap_lo" type="number" min="0" placeholder="80" value={formData.ap_lo} onChange={handleChange} className={errors.ap_lo ? "border-destructive ring-destructive/20" : ""} />
                        {errors.ap_lo && <p className="error">{errors.ap_lo}</p>}
                    </div>
                </FormSection>

                {/* Lab Results & Lifestyle */}
                <FormSection title="Labs & Lifestyle" icon={FaFire}>
                     <div className="space-y-2">
                        <Label htmlFor="cholesterol">Cholesterol Level</Label>
                        <Select name="cholesterol" value={formData.cholesterol} onValueChange={(val) => handleSelectChange("cholesterol", val)}>
                            <SelectTrigger className={errors.cholesterol ? "border-destructive ring-destructive/20" : ""}>
                                <SelectValue placeholder="Select level" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">Normal</SelectItem>
                                <SelectItem value="2">Above Normal</SelectItem>
                                <SelectItem value="3">Well Above Normal</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.cholesterol && <p className="error">{errors.cholesterol}</p>}
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="gluc">Glucose Level</Label>
                        <Select name="gluc" value={formData.gluc} onValueChange={(val) => handleSelectChange("gluc", val)}>
                            <SelectTrigger className={errors.gluc ? "border-destructive ring-destructive/20" : ""}>
                                <SelectValue placeholder="Select level" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">Normal</SelectItem>
                                <SelectItem value="2">Above Normal</SelectItem>
                                <SelectItem value="3">Well Above Normal</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.gluc && <p className="error">{errors.gluc}</p>}
                    </div>
                    {/* Lifestyle Toggles - Grid of 3 */}
                    <div className="col-span-1 md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
                        <div className="space-y-2">
                            <Label>Smoker?</Label>
                            <Select name="smoke" value={formData.smoke} onValueChange={(val) => handleSelectChange("smoke", val)}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent><SelectItem value="0">No</SelectItem><SelectItem value="1">Yes</SelectItem></SelectContent>
                            </Select>
                        </div>
                         <div className="space-y-2">
                            <Label>Alcohol Intake?</Label>
                            <Select name="alco" value={formData.alco} onValueChange={(val) => handleSelectChange("alco", val)}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent><SelectItem value="0">No</SelectItem><SelectItem value="1">Yes</SelectItem></SelectContent>
                            </Select>
                        </div>
                         <div className="space-y-2">
                            <Label>Physical Activity?</Label>
                            <Select name="active" value={formData.active} onValueChange={(val) => handleSelectChange("active", val)}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent><SelectItem value="1">Active</SelectItem><SelectItem value="0">Inactive</SelectItem></SelectContent>
                            </Select>
                        </div>
                    </div>
                </FormSection>

                <div className="pt-6 space-y-4">
                    <Button type="submit" size="lg" disabled={loading} className="w-full text-base h-12 shadow-lg hover:shadow-primary/25 transition-all hover:scale-[1.01]">
                        {loading ? (
                        <>
                            <FaSpinner className="mr-2 h-5 w-5 animate-spin" />
                            Processing Analysis...
                        </>
                        ) : (
                        "Generate Risk Analysis"
                        )}
                    </Button>
                    
                    {loading && (
                      <p className="text-sm text-center text-muted-foreground animate-pulse">
                        Note: The server may take up to 1 minute to wake up. Please don't close this tab.
                      </p>
                    )}
                </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

export default AssessRisk;

