import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { SearchX, Home } from "lucide-react";

function NotFound() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 animate-in fade-in zoom-in-95 duration-500">
        
        {/* Icon Animation */}
        <div className="relative">
          <div className="absolute -inset-4 bg-destructive/10 rounded-full blur-xl animate-pulse" />
          <div className="relative h-24 w-24 bg-card rounded-2xl border shadow-lg flex items-center justify-center text-destructive">
            <SearchX className="h-12 w-12" />
          </div>
        </div>

        <div className="space-y-2 max-w-md">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Page Not Found</h1>
          <p className="text-muted-foreground text-lg">
            We couldn't locate the cardiac record you're looking for. It might have been moved or deleted.
          </p>
        </div>

        <div className="flex gap-4">
          <Button 
            size="lg" 
            onClick={() => navigate("/")}
            className="gap-2"
          >
            <Home className="h-4 w-4" />
            Return Home
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </div>
      </div>
    </Layout>
  );
}

export default NotFound;
