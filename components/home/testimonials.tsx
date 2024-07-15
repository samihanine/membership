"use client";
import Testimonial from "./testimonial";
import TestimonialImg01 from "../../public/images/testimonial-01.png";
import TestimonialImg02 from "../../public/images/testimonial-02.png";
import TestimonialImg03 from "../../public/images/testimonial-03.png";
import TestimonialImg04 from "../../public/images/testimonial-04.png";
import TestimonialImg05 from "../../public/images/testimonial-05.png";
import TestimonialImg06 from "../../public/images/testimonial-06.png";
import TestimonialImg07 from "../../public/images/testimonial-07.png";
import TestimonialImg08 from "../../public/images/testimonial-08.png";

export default function Testimonials() {
  const testimonials01 = [
    {
      image: TestimonialImg01,
      name: "Lina D.",
      content:
        "Première fois avec Voolta, super expérience ! Chauffeur courtois, idéal pour travailler pendant le trajet.",
    },
    {
      image: TestimonialImg02,
      name: "Antoine G.",
      content:
        "Service top ! Chauffeur ponctuel et très pro, j'ai même pu travailler en route. Confort et tranquillité au rendez-vous.",
    },
    {
      image: TestimonialImg03,
      name: "Julie D.",
      content:
        "Ponctualité impeccable, trajet confortable, parfait pour se préparer avant une réunion. Vraiment professionnel.",
    },
    {
      image: TestimonialImg04,
      name: "Sophie A.",
      content:
        "Voolta a rendu mon voyage agréable. Confort au top et chauffeur discret, idéal pour se reposer ou travailler.",
    },
  ];

  const testimonials02 = [
    {
      image: TestimonialImg05,
      name: "Emma L.",
      content:
        "Ponctualité impeccable, trajet confortable, parfait pour se préparer avant une réunion. Vraiment professionnel.",
    },
    {
      image: TestimonialImg06,
      name: "Marc T.",
      content:
        "Voolta soigne toujours les détails. Sièges confortables et conversations agréables, toujours à l'heure.",
    },
    {
      image: TestimonialImg07,
      name: "Nadia B.",
      content:
        "Impressionné par la ponctualité et le service. Chauffeur sympa, parfait pour un trajet détendu.",
    },
    {
      image: TestimonialImg08,
      name: "Lucas C.",
      content:
        "Déplacements pros transformés avec Voolta. Arrivée à temps et dans le calme, parfait pour se concentrer.",
    },
  ];

  return (
    <section className="bg-foreground dark:bg-background py-12 md:py-20 h-[700px] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
          <h2 className="font-inter-tight text-3xl md:text-4xl font-bold text-zinc-200">
            Ce que nos clients disent de Voolta
          </h2>
        </div>
      </div>
      <div className="w-full mx-auto space-y-6 absolute">
        {/* Row #1 */}
        <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_28%,_black_calc(100%-28%),transparent_100%)] group">
          <div className="flex items-start justify-center md:justify-start [&>div]:mx-3 animate-infinite-scroll group-hover:[animation-play-state:paused]">
            {/* Items */}
            {testimonials01.map((testimonial, index) => (
              <Testimonial key={index} testimonial={testimonial}>
                {testimonial.content}
              </Testimonial>
            ))}
          </div>
          {/* Duplicated element for infinite scroll */}
          <div
            className="flex items-start justify-center md:justify-start [&>div]:mx-3 animate-infinite-scroll group-hover:[animation-play-state:paused]"
            aria-hidden="true"
          >
            {/* Items */}
            {testimonials01.map((testimonial, index) => (
              <Testimonial key={index} testimonial={testimonial}>
                {testimonial.content}
              </Testimonial>
            ))}
          </div>
        </div>
        {/* Row #2 */}
        <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_28%,_black_calc(100%-28%),transparent_100%)] group">
          <div className="flex items-start justify-center md:justify-start [&>div]:mx-3 animate-infinite-scroll-inverse group-hover:[animation-play-state:paused] [animation-delay:-7.5s]">
            {/* Items */}
            {testimonials02.map((testimonial, index) => (
              <Testimonial key={index} testimonial={testimonial}>
                {testimonial.content}
              </Testimonial>
            ))}
          </div>
          {/* Duplicated element for infinite scroll */}
          <div
            className="flex items-start justify-center md:justify-start [&>div]:mx-3 animate-infinite-scroll-inverse group-hover:[animation-play-state:paused] [animation-delay:-7.5s]"
            aria-hidden="true"
          >
            {/* Items */}
            {testimonials02.map((testimonial, index) => (
              <Testimonial key={index} testimonial={testimonial}>
                {testimonial.content}
              </Testimonial>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
