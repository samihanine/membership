"use client";

import Image, { StaticImageData } from "next/image";
import { useEffect, useMemo, useState } from "react";
import { cn } from "../../lib/utils";

export default function AuthCarousel({
  testimonials,
}: {
  testimonials: {
    imageUrl: string | StaticImageData;
    quote: string;
  }[];
}) {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  const testimonial = useMemo(
    () => testimonials[currentTestimonialIndex],
    [currentTestimonialIndex, testimonials],
  );

  const handleNext = () => {
    setCurrentTestimonialIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1,
    );
  };

  const handlePrevious = () => {
    setCurrentTestimonialIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1,
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonialIndex((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1,
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="relative hidden w-0 flex-1 lg:block">
      <div className="absolute inset-0">
        <Image
          className="h-full w-full object-cover rounded-tl-[4rem] rounded-br-[4rem]"
          src={testimonial.imageUrl}
          alt={"Testimonial image"}
          width={1920}
          height={1080}
        />
        <div className="absolute bottom-0 w-full h-80 bg-gradient-to-t from-black to-transparent rounded-br-[4rem]"></div>
        <div className="absolute bottom-0 w-full px-12 py-10 text-white space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h3 className="text-lg text-medium">{testimonial.quote}</h3>
            </div>

            <div className="flex gap-6">
              <button onClick={handlePrevious} className="group">
                <RoundedArrowLeft className="h-14 w-14 rounded-full group-hover:text-foreground group-hover:bg-background" />
                <span className="sr-only">Précédent</span>
              </button>
              <button onClick={handleNext} className="group">
                <RoundedArrowRight className="h-14 w-14 rounded-full group-hover:text-foreground group-hover:bg-background" />
                <span className="sr-only">Suivant</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const RoundedArrowLeft: React.FC<{
  color?: string;
  className?: string;
}> = ({ className }) => (
  <svg
    width="49"
    height="50"
    viewBox="0 0 49 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn(className)}
  >
    <path
      clipRule="currentColor"
      d="M15.4986 26.6529L23.439 34.5806C23.829 34.9699 24.4621 34.9699 24.8531 34.5806C25.2431 34.1902 25.2431 33.5583 24.8531 33.1679L18.4121 26.7388C18.0972 26.4243 18.3202 25.8872 18.7661 25.8872H33.5586C34.1106 25.8872 34.5586 25.432 34.5586 24.8799V24.8769C34.5586 24.3249 34.1106 23.8906 33.5586 23.8906H18.7661C18.3202 23.8906 18.0972 23.3525 18.4121 23.038L24.8838 16.5769C25.2748 16.1876 25.2748 15.5547 24.8838 15.1653C24.4938 14.775 23.8602 14.775 23.4702 15.1653L15.1446 23.4763C14.3636 24.256 14.3636 25.5198 15.1446 26.2995L15.4986 26.6529Z"
      fill="currentColor"
    />
    <path
      d="M24.5588 49.0564C19.4517 49.0564 14.4757 47.4396 10.3439 44.4377C6.21218 41.4358 3.13683 37.2029 1.55864 32.3458C-0.0195465 27.4886 -0.0195465 22.2565 1.55864 17.3993C3.13683 12.5422 6.21218 8.30931 10.3439 5.30742C14.4757 2.30553 19.4517 0.68872 24.5588 0.688721C29.666 0.688721 34.642 2.30553 38.7737 5.30742C42.9055 8.30932 45.9808 12.5422 47.559 17.3993C49.1372 22.2565 49.1372 27.4886 47.559 32.3458L46.409 31.9721C47.9083 27.3578 47.9083 22.3873 46.409 17.773C44.9097 13.1587 41.9882 9.13748 38.063 6.28568C34.1378 3.43388 29.4106 1.89791 24.5588 1.89791C19.7071 1.89791 14.9798 3.43388 11.0547 6.28568C7.12952 9.13748 4.20793 13.1587 2.70865 17.773C1.20937 22.3873 1.20937 27.3578 2.70865 31.9721C4.20793 36.5864 7.12952 40.6076 11.0547 43.4594C14.9798 46.3112 19.7071 47.8472 24.5588 47.8472L24.5588 49.0564Z"
      fill="currentColor"
    />
  </svg>
);

export const RoundedArrowRight: React.FC<{
  color?: string;
  className?: string;
}> = ({ className }) => (
  <svg
    width="50"
    height="50"
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn(className)}
  >
    <path
      clipRule="currentColor"
      d="M33.9868 23.0922L26.0464 15.1646C25.6564 14.7752 25.0233 14.7752 24.6323 15.1646C24.2423 15.5549 24.2423 16.1868 24.6323 16.5772L31.0732 23.0063C31.3882 23.3208 31.1652 23.8579 30.7192 23.8579H15.9267C15.3747 23.8579 14.9267 24.3131 14.9267 24.8652V24.8682C14.9267 25.4203 15.3747 25.8545 15.9267 25.8545H30.7192C31.1652 25.8545 31.3882 26.3926 31.0732 26.7071L24.6015 33.1682C24.2105 33.5575 24.2105 34.1905 24.6015 34.5798C24.9915 34.9701 25.6251 34.9701 26.0151 34.5798L34.3408 26.2688C35.1218 25.4891 35.1218 24.2253 34.3408 23.4456L33.9868 23.0922Z"
      fill="currentColor"
    />
    <path
      d="M24.9265 0.688721C30.0336 0.688721 35.0097 2.30553 39.1414 5.30742C43.2732 8.30931 46.3485 12.5422 47.9267 17.3993C49.5049 22.2565 49.5049 27.4886 47.9267 32.3458C46.3485 37.2029 43.2732 41.4358 39.1414 44.4377C35.0097 47.4396 30.0336 49.0564 24.9265 49.0564C19.8194 49.0564 14.8434 47.4396 10.7116 44.4377C6.57986 41.4358 3.5045 37.2029 1.92632 32.3458C0.348128 27.4886 0.348129 22.2565 1.92632 17.3993L3.07633 17.773C1.57705 22.3873 1.57705 27.3578 3.07633 31.9721C4.5756 36.5864 7.49719 40.6076 11.4224 43.4594C15.3475 46.3112 20.0747 47.8472 24.9265 47.8472C29.7783 47.8472 34.5055 46.3112 38.4307 43.4594C42.3558 40.6076 45.2774 36.5864 46.7767 31.9721C48.276 27.3578 48.276 22.3873 46.7767 17.773C45.2774 13.1587 42.3558 9.13748 38.4307 6.28568C34.5055 3.43388 29.7783 1.89791 24.9265 1.89791V0.688721Z"
      fill="currentColor"
    />
  </svg>
);

export const Quote: React.FC<{ color?: string; className?: string }> = ({
  className,
}) => (
  <svg
    width="24"
    height="19"
    viewBox="0 0 24 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn(className)}
  >
    <path
      d="M10.271 1.38452L9.40723 0.0563965C3.43066 4.07371 0.110352 8.95483 0.110352 12.9721C0.110352 16.8566 2.96635 18.6831 5.38991 18.6831C8.4446 18.6831 10.6025 16.0927 10.6025 13.3706C10.6025 11.0798 9.1416 9.12058 7.18235 8.38958C6.61816 8.18983 6.08691 8.02408 6.08691 7.06146C6.08691 5.83321 6.98366 4.00783 10.271 1.38452ZM23.4524 1.38452L22.5886 0.0563965C16.6779 4.07371 13.2917 8.95483 13.2917 12.9721C13.2917 16.8566 16.2136 18.6831 18.6372 18.6831C21.7248 18.6831 23.9167 16.0927 23.9167 13.3706C23.9167 11.0798 22.4229 9.12058 20.3967 8.38958C19.8325 8.18983 19.3342 8.02408 19.3342 7.06146C19.3342 5.83321 20.2639 4.00677 23.4514 1.38346L23.4524 1.38452Z"
      fill="white"
    />
  </svg>
);
