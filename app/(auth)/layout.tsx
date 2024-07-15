import { LogoText } from "@/components/ui/logo-text";
import AuthCarousel from "@/components/auth/auth-carousel";
import Link from "next/link";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const testimonials = [
    {
      quote:
        "Réservez votre course avec chauffeur privé à Lyon, en quelques clics.",
      imageUrl: "/images/auth/auth-carousel-1.jpg",
    },
    {
      quote:
        "Réservez votre course avec chauffeur privé à Lyon, en quelques clics.",
      imageUrl: "/images/auth/auth-carousel-2.jpg",
    },
    {
      quote:
        "Réservez votre course avec chauffeur privé à Lyon, en quelques clics.",
      imageUrl: "/images/auth/auth-carousel-3.jpg",
    },
    {
      quote:
        "Réservez votre course avec chauffeur privé à Lyon, en quelques clics.",
      imageUrl: "/images/auth/auth-carousel-4.jpg",
    },
    {
      quote:
        "Réservez votre course avec chauffeur privé à Lyon, en quelques clics.",
      imageUrl: "/images/auth/auth-carousel-5.jpg",
    },
    {
      quote:
        "Réservez votre course avec chauffeur privé à Lyon, en quelques clics.",
      imageUrl: "/images/auth/auth-carousel-6.jpg",
    },
    {
      quote:
        "Réservez votre course avec chauffeur privé à Lyon, en quelques clics.",
      imageUrl: "/images/auth/auth-carousel-7.jpg",
    },
  ];

  return (
    <>
      <div className="flex min-h-screen w-full px-8 py-12">
        <div className="px-5 md:px-20 space-y-14 mt-10 lg:max-w-lg w-full">
          <Link href="/">
            <LogoText />
          </Link>

          {children}
        </div>

        <AuthCarousel testimonials={testimonials} />
      </div>
    </>
  );
}
