"use client";

import Carousel02 from "@/public/images/service-02.jpg";
import Carousel03 from "@/public/images/service-03.jpg";
import Carousel06 from "@/public/images/service-06.jpg";
import Carousel07 from "@/public/images/service-07.jpg";
import Carousel08 from "@/public/images/service-08.jpg";
import Image from "next/image";
import { useEffect } from "react";
import Swiper from "swiper";
import "swiper/css";
import { Navigation } from "swiper/modules";
import { BranchIcon, CirclesIcon, HandIcon, PlaneIcon } from "../icons";

Swiper.use([Navigation]);

export default function ServiceHero() {
  useEffect(() => {
    new Swiper(".carousel", {
      slidesPerView: "auto",
      grabCursor: true,
      loop: false,
      centeredSlides: false,
      initialSlide: 0,
      spaceBetween: 24,
      watchSlidesProgress: true,
      navigation: {
        nextEl: ".carousel-next",
        prevEl: ".carousel-prev",
      },
    });
  }, []);

  return (
    <section className="relative bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="pb-8 md:pb-12">
            <h2 className="text-3xl md:text-5xl text-white mt-10">
              Nos services
            </h2>
            <p className="font-base text-gray-300 mt-6">
              Voolta se distingue par sa capacité à servir avec excellence deux
              marchés distincts : les professionnels et les particuliers. Nous
              avons une équipe de professionnels dévouée, spécialisée dans le
              transport de passagers, engagée à fournir une prestation de
              service de chauffeurs privés exceptionnelle pour répondre aux
              exigences de ses clients.
            </p>
          </div>

          {/* Carousel */}
          <div className="pb-12 md:pb-16">
            {/* Carousel built with Swiper.js [https://swiperjs.com/] */}
            {/* * Custom styles in src/css/additional-styles/theme.scss */}
            <div className="carousel swiper-container max-w-sm mx-auto sm:max-w-none overflow-hidden">
              <div className="swiper-wrapper">
                {/* Carousel items */}$
                <div className="swiper-slide max-w-[446px] h-auto">
                  {/* Image */}
                  <Image
                    className="w-full aspect-[4/3] object-cover h-full"
                    src={Carousel07}
                    width="446"
                    height="335"
                    alt="Carousel 05"
                  />
                </div>
                <div className="swiper-slide max-w-[446px] h-auto">
                  {/* Image */}
                  <Image
                    className="w-full aspect-[4/3] object-cover h-full"
                    src={Carousel02}
                    width="446"
                    height="335"
                    alt="Carousel 02"
                  />
                </div>
                <div className="swiper-slide max-w-[446px] h-auto">
                  {/* Image */}
                  <Image
                    className="w-full aspect-[4/3] object-cover h-full"
                    src={Carousel03}
                    width="446"
                    height="335"
                    alt="Carousel 03"
                  />
                </div>
                <div className="swiper-slide max-w-[446px] h-auto">
                  {/* Image */}
                  <Image
                    className="w-full aspect-[4/3] object-cover h-full"
                    src={Carousel06}
                    width="446"
                    height="335"
                    alt="Carousel 05"
                  />
                </div>
                <div className="swiper-slide max-w-[446px] h-auto">
                  {/* Image */}
                  <Image
                    className="w-full aspect-[4/3] object-cover h-full"
                    src={Carousel08}
                    width="446"
                    height="335"
                    alt="Carousel 05"
                  />
                </div>
              </div>
            </div>

            {/* Arrows */}
            <div className="flex mt-12 space-x-3 justify-end">
              <button className="carousel-prev relative z-20 w-11 h-11 rounded-full flex items-center justify-center group bg-white hover:bg-white/80">
                <span className="sr-only">Previous</span>
                <svg
                  className="fill-black"
                  width="13"
                  height="12"
                  viewBox="0 0 13 12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m3.914 5 3.5-3.5L6 .086 1.086 5H1v.086L.086 6 1 6.914V7h.086L6 11.914 7.414 10.5 3.914 7H13V5z" />
                </svg>
              </button>
              <button className="carousel-next relative z-20 w-11 h-11 rounded-full flex items-center justify-center group bg-white hover:bg-white/80">
                <span className="sr-only">Next</span>
                <svg
                  className="fill-black"
                  width="13"
                  height="12"
                  viewBox="0 0 13 12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m9.086 5-3.5-3.5L7 .086 11.914 5H12v.086l.914.914-.914.914V7h-.086L7 11.914 5.586 10.5l3.5-3.5H0V5z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Grid */}
          <div className="max-w-sm mx-auto grid sm:grid-cols-2 sm:max-w-3xl lg:grid-cols-4 lg:max-w-none items-start">
            {/* #2 */}
            <div
              className="relative p-5 before:opacity-0 hover:before:opacity-20 before:absolute before:inset-0 before:rounded before:bg-gradient-to-tr before:from-white before:to-white/25 before:shadow-xl before:transition-all before:duration-150 before:ease-in-out"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <HandIcon className="mb-3 text-white" />
              <h3 className="font-cabinet-grotesk font-bold text-lg text-white">
                Services ponctuels{" "}
              </h3>
              <div className="text-gray-300 text-sm mt-3">
                Pour vos besoins immédiats, choisissez nos services réactifs et
                discrets.
              </div>
            </div>

            {/* #3 */}
            <div
              className="relative p-5 before:opacity-0 hover:before:opacity-20 before:absolute before:inset-0 before:rounded before:bg-gradient-to-tr before:from-white before:to-white/25 before:shadow-xl before:transition-all before:duration-150 before:ease-in-out"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <BranchIcon className="mb-3 text-white" />
              <h3 className="font-cabinet-grotesk font-bold text-lg text-white">
                Longs Trajets
              </h3>
              <div className="text-gray-300 text-sm mt-3">
                Parcourez de longues distances avec luxe et conscience
                écologique.
              </div>
            </div>

            {/* #4 */}
            <div
              className="relative p-5 before:opacity-0 hover:before:opacity-20 before:absolute before:inset-0 before:rounded before:bg-gradient-to-tr before:from-white before:to-white/25 before:shadow-xl before:transition-all before:duration-150 before:ease-in-out"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <CirclesIcon className="mb-3 text-white" />
              <h3 className="font-cabinet-grotesk font-bold text-lg text-white">
                Transferts Événementiels{" "}
              </h3>
              <div className="text-gray-300 text-sm mt-3">
                Arrivez avec style et à temps à chaque événement grâce à notre
                service dédié.
              </div>
            </div>

            {/* #1 */}
            <div
              className="relative p-5 before:opacity-0 hover:before:opacity-20 before:absolute before:inset-0 before:rounded before:bg-gradient-to-tr before:from-white before:to-white/25 before:shadow-xl before:transition-all before:duration-150 before:ease-in-out"
              data-aos="fade-up"
            >
              <PlaneIcon className="mb-3 text-white" />
              <h3 className="font-cabinet-grotesk font-bold text-lg text-white">
                Aéroports et Gares
              </h3>
              <div className="text-gray-300 text-sm mt-3">
                Voyagez sans stress avec nos transferts directs vers aéroports
                et gares.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
