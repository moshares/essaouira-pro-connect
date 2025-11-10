import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How quickly can you send someone?",
    answer: "Most of our professionals can respond within 2-4 hours for urgent requests, and same-day service is often available."
  },
  {
    question: "What areas do you cover?",
    answer: "We serve Essaouira, Diabat, Ghazoua, Sidi Kaouki, and surrounding regions. Contact us to confirm service availability in your area."
  },
  {
    question: "How much do your services cost?",
    answer: "Pricing varies by service type and complexity. After submitting your request, we'll provide a free estimate before any work begins."
  },
  {
    question: "Are your professionals vetted and insured?",
    answer: "Yes, all our service providers are carefully vetted, experienced professionals. Insurance coverage varies by service provider."
  },
  {
    question: "How do I request a service?",
    answer: "Simply select the service you need, fill out the quick request form with your details, and we'll connect you with the right professional."
  }
];

const FAQ = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Frequently Asked Questions</h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about our services
          </p>
        </div>
        
        <Accordion type="single" collapsible className="max-w-3xl mx-auto bg-card rounded-lg shadow-card p-6">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-semibold text-card-foreground hover:text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
