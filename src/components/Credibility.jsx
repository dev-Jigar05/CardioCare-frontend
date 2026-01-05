import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Activity, Info } from "lucide-react";


function Credibility() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="border-primary/20">
        <CardContent className="pt-6 text-center space-y-2">
            <ShieldCheck className="mx-auto h-6 w-6 text-primary" />
            <p className="font-semibold">Clinically Curated Data</p>
            <p className="text-sm text-muted-foreground">
            Based on established cardiovascular risk factors.
            </p>
        </CardContent>
      </Card>

      <Card className="border-primary/20">
        <CardContent className="pt-6 text-center space-y-2">
            <Activity className="mx-auto h-6 w-6 text-primary" />
            <p className="font-semibold">Validated ML Model</p>
            <p className="text-sm text-muted-foreground">
            Optimized to minimize false negatives.
            </p>
        </CardContent>

      </Card>

      <Card className="border-primary/20">
        <CardContent className="pt-6 text-center space-y-2">
            <Info className="mx-auto h-6 w-6 text-primary" />
            <p className="font-semibold">Explainable Output</p>
            <p className="text-sm text-muted-foreground">
                Clear interpretation instead of raw predictions.
            </p>
        </CardContent>
      </Card>
    </section>
  );
}

export default Credibility;
