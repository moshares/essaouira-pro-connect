import Hero from "@/components/Hero";
import Services from "@/components/Services";
import ServiceArea from "@/components/ServiceArea";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import ContactButtons from "@/components/ContactButtons";
import GoogleMaps from "@/components/GoogleMaps";
import SchemaMarkup from "@/components/SchemaMarkup";
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t } = useTranslation();

  const faqItems = [0, 1, 2, 3, 4, 5].map(i => ({
    question: t(`faq.questions.${i}.question`),
    answer: t(`faq.questions.${i}.answer`)
  }));

  return (
    <>
      <SchemaMarkup faqItems={faqItems} />
      <main className="min-h-screen">
        <Hero />
        <Services />
        <ServiceArea />
        <Testimonials />
        <FAQ />
        <GoogleMaps />
        <ContactButtons />
      </main>
    </>
  );
};

export default Index;
