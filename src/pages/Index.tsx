import Hero from "@/components/Hero";
import Services from "@/components/Services";
import ServiceArea from "@/components/ServiceArea";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import ContactButtons from "@/components/ContactButtons";
import GoogleMaps from "@/components/GoogleMaps";
import SchemaMarkup from "@/components/SchemaMarkup";

const Index = () => {
  return (
    <>
      <SchemaMarkup />
      <div className="min-h-screen">
        <Hero />
        <Services />
        <ServiceArea />
        <Testimonials />
        <FAQ />
        <GoogleMaps />
        <ContactButtons />
      </div>
    </>
  );
};

export default Index;
