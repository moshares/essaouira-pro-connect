import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslation } from "react-i18next";

const FAQ = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">{t('faq.title')}</h2>
          <p className="text-xl text-muted-foreground">
            {t('faq.subtitle')}
          </p>
        </div>
        
        <Accordion type="single" collapsible className="max-w-3xl mx-auto bg-card rounded-lg shadow-card p-6">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-semibold text-card-foreground hover:text-primary">
                {t(`faq.questions.${index}.question`)}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {t(`faq.questions.${index}.answer`)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
