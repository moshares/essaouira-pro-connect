import Hero from "@/components/Hero";
import Services from "@/components/Services";
import ServiceArea from "@/components/ServiceArea";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import ContactButtons from "@/components/ContactButtons";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Services />
      <ServiceArea />
      <Testimonials />
      <FAQ />
      <ContactButtons />
    </div>
  );
};

export default Index;
