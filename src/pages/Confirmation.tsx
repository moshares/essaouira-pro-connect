import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Home, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Confirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="p-8 md:p-12 max-w-2xl w-full shadow-soft text-center">
        <div className="mb-6">
          <CheckCircle className="h-20 w-20 text-primary mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-card-foreground">
            Request Received!
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Thank you for your request. A professional will contact you shortly to confirm the details and schedule a visit.
          </p>
          <div className="bg-ocean-light rounded-lg p-6 mb-8">
            <p className="text-card-foreground font-medium">
              We typically respond within 1-2 hours during business hours.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg"
            onClick={() => navigate('/')}
            className="bg-primary hover:bg-primary/90"
          >
            <Home className="mr-2 h-5 w-5" />
            Back to Home
          </Button>
          <Button 
            size="lg"
            variant="outline"
            asChild
          >
            <a href="tel:+212123456789">
              <Phone className="mr-2 h-5 w-5" />
              Call Us Directly
            </a>
          </Button>
        </div>

        <div className="mt-8 pt-8 border-t">
          <p className="text-sm text-muted-foreground">
            Need urgent assistance? Contact us on WhatsApp or call us directly.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Confirmation;
