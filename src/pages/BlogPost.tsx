import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";
import SchemaMarkup from "@/components/SchemaMarkup";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import NotFound from "./NotFound";

const BlogPost = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { slug } = useParams();

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <NotFound />;
  }

  return (
    <>
      <SchemaMarkup
        title={t(post.titleKey)}
        description={t(post.excerptKey)}
        type="article"
        article={{
          publishedTime: post.publishedDate,
          author: post.author
        }}
      />

      <div className="min-h-screen bg-background">
        <header className="bg-gradient-hero py-8 relative">
          <div className="absolute top-6 right-6">
            <LanguageSwitcher />
          </div>
          <div className="container mx-auto px-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/blog")}
              className="mb-4 text-primary-foreground hover:bg-white/10"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('blog.backToBlog')}
            </Button>
          </div>
        </header>

        <article className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                {t(post.titleKey)}
              </h1>
              <div className="flex items-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>{new Date(post.publishedDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{post.readTime} {t('blog.minRead')}</span>
                </div>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  {post.category}
                </span>
              </div>
            </div>

            {post.image && (
              <img 
                src={post.image} 
                alt={t(post.titleKey)}
                className="aspect-video w-full object-cover rounded-lg mb-8"
              />
            )}

            <div className="prose prose-lg max-w-none text-foreground">
              {t(post.contentKey).split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <Button
                onClick={() => navigate("/request-service")}
                size="lg"
                className="w-full md:w-auto"
              >
                {t('blog.requestService')}
              </Button>
            </div>
          </div>
        </article>
      </div>
    </>
  );
};

export default BlogPost;
