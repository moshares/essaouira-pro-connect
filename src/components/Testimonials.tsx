import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ahmed K.",
    location: "Essaouira",
    rating: 5,
    text: "Quick response and professional work. The electrician fixed my problem the same day!"
  },
  {
    name: "Sarah M.",
    location: "Diabat",
    rating: 5,
    text: "Excellent plumbing service. Very reliable and fair prices. Highly recommend!"
  },
  {
    name: "Mohamed B.",
    location: "Sidi Kaouki",
    rating: 5,
    text: "The painter did an amazing job on our villa. Clean work and friendly service."
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">What Our Customers Say</h2>
          <p className="text-xl text-muted-foreground">
            Trusted by hundreds of satisfied customers in Essaouira
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 shadow-card hover:shadow-soft transition-shadow">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-sand text-sand" />
                ))}
              </div>
              <p className="text-card-foreground mb-4 italic">"{testimonial.text}"</p>
              <div className="border-t pt-4">
                <p className="font-bold text-card-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.location}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
