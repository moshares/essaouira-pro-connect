import homeRepairsImage from "@/assets/blog/home-repairs-essaouira.jpg";
import electricianImage from "@/assets/blog/electrician-essaouira.jpg";
import humidityImage from "@/assets/blog/humidity-paint-coastal.jpg";
import plumbingImage from "@/assets/blog/plumbing-coastal-properties.jpg";
import carpenterImage from "@/assets/blog/carpenter-essaouira.jpg";
import climatisationImage from "@/assets/blog/climatisation-essaouira.jpg";
import gardenImage from "@/assets/blog/jardinage-essaouira.jpg";
import renovationImage from "@/assets/blog/renovation-riad-essaouira.jpg";

export interface BlogPost {
  id: string;
  slug: string;
  titleKey: string;
  excerptKey: string;
  contentKey: string;
  author: string;
  publishedDate: string;
  category: string;
  readTime: number;
  image?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "top-5-reparations-maison-essaouira",
    titleKey: "blog.posts.repairs.title",
    excerptKey: "blog.posts.repairs.excerpt",
    contentKey: "blog.posts.repairs.content",
    author: "Essaouira Home Services",
    publishedDate: "2024-01-15",
    category: "Entretien Maison",
    readTime: 5,
    image: homeRepairsImage
  },
  {
    id: "2",
    slug: "choisir-electricien-essaouira",
    titleKey: "blog.posts.electrician.title",
    excerptKey: "blog.posts.electrician.excerpt",
    contentKey: "blog.posts.electrician.content",
    author: "Essaouira Home Services",
    publishedDate: "2024-01-20",
    category: "Services Professionnels",
    readTime: 6,
    image: electricianImage
  },
  {
    id: "3",
    slug: "humidite-peinture-maisons-cotieres",
    titleKey: "blog.posts.humidity.title",
    excerptKey: "blog.posts.humidity.excerpt",
    contentKey: "blog.posts.humidity.content",
    author: "Essaouira Home Services",
    publishedDate: "2024-01-25",
    category: "Vie Côtière",
    readTime: 7,
    image: humidityImage
  },
  {
    id: "4",
    slug: "conseils-plomberie-proprietes-cotieres",
    titleKey: "blog.posts.plumbing.title",
    excerptKey: "blog.posts.plumbing.excerpt",
    contentKey: "blog.posts.plumbing.content",
    author: "Essaouira Home Services",
    publishedDate: "2024-02-01",
    category: "Entretien Maison",
    readTime: 6,
    image: plumbingImage
  },
  {
    id: "5",
    slug: "menuisier-essaouira-meubles-sur-mesure",
    titleKey: "blog.posts.carpenter.title",
    excerptKey: "blog.posts.carpenter.excerpt",
    contentKey: "blog.posts.carpenter.content",
    author: "Essaouira Home Services",
    publishedDate: "2024-02-10",
    category: "Services Professionnels",
    readTime: 7,
    image: carpenterImage
  },
  {
    id: "6",
    slug: "climatisation-entretien-maison-essaouira",
    titleKey: "blog.posts.ac.title",
    excerptKey: "blog.posts.ac.excerpt",
    contentKey: "blog.posts.ac.content",
    author: "Essaouira Home Services",
    publishedDate: "2024-02-15",
    category: "Climatisation",
    readTime: 6,
    image: climatisationImage
  },
  {
    id: "7",
    slug: "entretien-jardin-essaouira-plantes-cotieres",
    titleKey: "blog.posts.garden.title",
    excerptKey: "blog.posts.garden.excerpt",
    contentKey: "blog.posts.garden.content",
    author: "Essaouira Home Services",
    publishedDate: "2024-02-20",
    category: "Jardinage",
    readTime: 5,
    image: gardenImage
  },
  {
    id: "8",
    slug: "renovation-riad-maison-ancienne-essaouira",
    titleKey: "blog.posts.renovation.title",
    excerptKey: "blog.posts.renovation.excerpt",
    contentKey: "blog.posts.renovation.content",
    author: "Essaouira Home Services",
    publishedDate: "2024-03-01",
    category: "Rénovation",
    readTime: 8,
    image: renovationImage
  }
];
