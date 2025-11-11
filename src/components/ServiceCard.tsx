import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  serviceType: string;
}

const ServiceCard = ({ icon: Icon, title, description, serviceType }: ServiceCardProps) => {
  const navigate = useNavigate();

  return (
    <Card 
      className="group p-6 hover:shadow-soft transition-all duration-300 cursor-pointer border-2 hover:border-primary bg-card"
      onClick={() => navigate(`/services/${serviceType.toLowerCase()}`)}
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-ocean-light flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <Icon className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h3 className="font-bold text-xl mb-2 text-card-foreground">{title}</h3>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </div>
    </Card>
  );
};

export default ServiceCard;
