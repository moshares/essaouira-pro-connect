import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";
import SchemaMarkup from "@/components/SchemaMarkup";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Blog = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <SchemaMarkup 
        title={t('blog.title')}
        description={t('blog.subtitle')}
      />
      
      <div className="min-h-screen bg-background">
        <header className="bg-gradient-hero py-8 relative">
          <div className="absolute top-6 right-6">
            <LanguageSwitcher />
          </div>
          <div className="container mx-auto px-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="mb-4 text-primary-foreground hover:bg-white/10"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('blog.backHome')}
            </Button>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              {t('blog.title')}
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl">
              {t('blog.subtitle')}
            </p>
          </div>
        </header>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {blogPosts.map((post) => (
                <Card
                  key={post.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                  onClick={() => navigate(`/blog/${post.slug}`)}
                >
                  {post.image && (
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={t(post.titleKey)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(post.publishedDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime} {t('blog.minRead')}</span>
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold mb-3 text-card-foreground group-hover:text-primary transition-colors">
                      {t(post.titleKey)}
                    </h2>
                    <p className="text-muted-foreground mb-4">
                      {t(post.excerptKey)}
                    </p>
                    <Button variant="outline" className="w-full">
                      {t('blog.readMore')}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Blog;
