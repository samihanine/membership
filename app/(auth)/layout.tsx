import AuthCarousel from "@/components/auth/auth-carousel";
import { LogoText } from "@/components/ui/logo-text";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const testimonials = [
    {
      quote: "Gérer vos membres et vos adhésions n'a jamais été aussi simple.",
      imageUrl: "/images/auth/auth-carousel-1.jpg",
    },
    {
      quote: "Gérer vos membres et vos adhésions n'a jamais été aussi simple.",
      imageUrl: "/images/auth/auth-carousel-2.jpg",
    },
    {
      quote: "Gérer vos membres et vos adhésions n'a jamais été aussi simple.",
      imageUrl: "/images/auth/auth-carousel-3.jpg",
    },
    {
      quote: "Gérer vos membres et vos adhésions n'a jamais été aussi simple.",
      imageUrl: "/images/auth/auth-carousel-4.jpg",
    },
    {
      quote: "Gérer vos membres et vos adhésions n'a jamais été aussi simple.",
      imageUrl: "/images/auth/auth-carousel-5.jpg",
    },
  ];

  return (
    <>
      <div className="flex min-h-screen w-full px-8 py-12">
        <div className="px-5 md:px-20 space-y-8 lg:max-w-lg w-full">
          <LogoText />

          {children}
        </div>

        <AuthCarousel testimonials={testimonials} />
      </div>
    </>
  );
}
