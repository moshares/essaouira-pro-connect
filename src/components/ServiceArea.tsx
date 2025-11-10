import { MapPin } from "lucide-react";

const locations = [
  "Essaouira",
  "Diabat",
  "Ghazoua",
  "Sidi Kaouki",
  "Nearby Regions"
];

const ServiceArea = () => {
  return (
    <section className="py-20 bg-sand-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Service Coverage</h2>
          <p className="text-xl text-muted-foreground">
            Proudly serving Essaouira and surrounding areas
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
          {locations.map((location, index) => (
            <div 
              key={index}
              className="bg-card px-6 py-3 rounded-full border-2 border-primary/20 shadow-card hover:shadow-soft transition-shadow"
            >
              <span className="text-card-foreground font-medium">{location}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceArea;
