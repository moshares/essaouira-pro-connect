import homeRepairsImage from "@/assets/blog/home-repairs-essaouira.jpg";
import electricianImage from "@/assets/blog/electrician-essaouira.jpg";
import humidityImage from "@/assets/blog/humidity-paint-coastal.jpg";
import plumbingImage from "@/assets/blog/plumbing-coastal-properties.jpg";

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
  }
];
