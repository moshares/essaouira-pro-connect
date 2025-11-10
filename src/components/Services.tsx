import { Wrench, Droplet, Paintbrush, Hammer, Lightbulb, Refrigerator } from "lucide-react";
import ServiceCard from "./ServiceCard";

const services = [
  {
    icon: Lightbulb,
    title: "Electrician",
    description: "Wiring, lighting, electrical repairs",
    serviceType: "Electrician"
  },
  {
    icon: Droplet,
    title: "Plumber",
    description: "Pipes, leaks, bathroom & kitchen fixes",
    serviceType: "Plumber"
  },
  {
    icon: Paintbrush,
    title: "Painter",
    description: "Interior & exterior painting services",
    serviceType: "Painter"
  },
  {
    icon: Hammer,
    title: "Carpenter",
    description: "Furniture, doors, custom woodwork",
    serviceType: "Carpenter"
  },
  {
    icon: Wrench,
    title: "Handyman",
    description: "General repairs & maintenance",
    serviceType: "Handyman"
  },
  {
    icon: Refrigerator,
    title: "Appliance Repair",
    description: "Washing machines, fridges, ovens",
    serviceType: "Appliance Repair"
  }
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Our Services</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose from our range of professional home services
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              serviceType={service.serviceType}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
