import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useTranslation } from "react-i18next";

const Testimonials = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">{t('testimonials.title')}</h2>
          <p className="text-xl text-muted-foreground">
            {t('testimonials.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[0, 1, 2].map((index) => (
            <Card key={index} className="p-6 shadow-card hover:shadow-soft transition-shadow">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-sand text-sand" />
                ))}
              </div>
              <p className="text-card-foreground mb-4 italic">"{t(`testimonials.reviews.${index}.text`)}"</p>
              <div className="border-t pt-4">
                <p className="font-bold text-card-foreground">{t(`testimonials.reviews.${index}.name`)}</p>
                <p className="text-sm text-muted-foreground">{t(`testimonials.reviews.${index}.location`)}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
