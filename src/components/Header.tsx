import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import LanguageSwitcher from "./LanguageSwitcher";
import logo from "@/assets/logo.svg";

const Header = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigation = [
    { name: t('nav.home'), action: () => navigate('/') },
    { name: t('services.title'), action: () => scrollToSection('services') },
    { name: t('serviceArea.title'), action: () => scrollToSection('areas') },
    { name: t('testimonials.title'), action: () => scrollToSection('testimonials') },
    { name: t('faq.title'), action: () => scrollToSection('faq') },
    { name: t('nav.blog'), action: () => navigate('/blog') },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-20 lg:h-24 items-center justify-between lg:justify-center relative">
          <Link to="/" className="lg:absolute left-4 rtl:left-auto rtl:right-4 flex items-center gap-2">
            <img src={logo} alt="Essaouira Home Services" className="h-16 lg:h-24 w-auto" />
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden lg:flex items-center gap-6">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={item.action}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors cursor-pointer"
              >
                {item.name}
              </button>
            ))}
          </nav>

          <div className="absolute right-4 rtl:right-auto rtl:left-4 hidden lg:flex items-center gap-2">
            <LanguageSwitcher />
            <Button asChild size="default">
              <a href="tel:+212652659003">{t('hero.callNow')}</a>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="flex lg:hidden items-center gap-2 rtl:flex-row-reverse">
            <LanguageSwitcher />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col gap-4 mt-8">
                  {navigation.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => {
                        item.action();
                        // Close sheet after navigation
                        document.querySelector('[data-state="open"]')?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
                      }}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors text-left"
                    >
                      {item.name}
                    </button>
                  ))}
                  <Button asChild className="mt-4">
                    <a href="tel:+212652659003">{t('hero.callNow')}</a>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
