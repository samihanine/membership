"use client";

import { useState, useRef, useEffect } from "react";
import { Transition } from "@headlessui/react";
import Image from "next/image";
import HomeCarousel1 from "../../public/images/home-carousel-1.png";
import HomeCarousel2 from "../../public/images/home-carousel-2.png";
import HomeCarousel3 from "../../public/images/home-carousel-3.png";

export default function ServicesCarousel() {
  const [tab, setTab] = useState<number>(1);

  const tabs = useRef<HTMLDivElement>(null);

  const heightFix = () => {
    if (tabs.current && tabs.current.parentElement)
      tabs.current.parentElement.style.height = `${tabs.current.clientHeight}px`;
  };

  useEffect(() => {
    heightFix();
  }, []);

  return (
    <div className="bg-foreground dark:bg-background">
      <div className="max-w-7xl flex py-20 w-full mx-auto px-4 sm:px-6 flex-col sm:flex-row gap-12 md:gap-20 lg:gap-28">
        {/* Content */}
        <div className="flex-1">
          <div className="mb-8">
            <div className="inline-flex text-sm font-medium text-zinc-400 px-4 py-0.5 border border-transparent [background:linear-gradient(theme(colors.zinc.800),theme(colors.zinc.800))_padding-box,linear-gradient(120deg,theme(colors.zinc.700),theme(colors.zinc.700/0),theme(colors.zinc.700))_border-box] rounded-full mb-4">
              Haut de gamme et écoresponsable
            </div>
            <h3 className="font-inter-tight text-3xl font-bold text-zinc-200 mb-4">
              Pourquoi choisir Voolta ?
            </h3>
            <p className="text-lg text-zinc-500">
              Découvrez une nouvelle dimension de mobilité avec Voolta, où luxe
              et responsabilité environnementale se rencontrent pour transformer
              chaque déplacement en une expérience exceptionnelle.
            </p>
          </div>
          {/* Tabs buttons */}
          <div className="mb-8 md:mb-0 space-y-2">
            <button
              className={`text-left flex items-center px-6 py-4 rounded border border-transparent ${
                tab !== 1
                  ? ""
                  : "[background:linear-gradient(#2E2E32,#2E2E32)_padding-box,linear-gradient(120deg,theme(colors.zinc.700),theme(colors.zinc.700/0),theme(colors.zinc.700))_border-box]"
              }`}
              onClick={(e) => {
                e.preventDefault();
                setTab(1);
              }}
            >
              <svg
                className="shrink-0 fill-zinc-400 mr-3"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
              >
                <path d="m7.951 14.537 6.296-7.196 1.506 1.318-7.704 8.804-3.756-3.756 1.414-1.414 2.244 2.244Zm11.296-7.196 1.506 1.318-7.704 8.804-1.756-1.756 1.414-1.414.244.244 6.296-7.196Z" />
              </svg>
              <div>
                <div className="font-inter-tight text-lg font-semibold text-zinc-200 mb-1">
                  Service Unique
                </div>
                <div className="text-zinc-500">
                  Nous ne proposons pas simplement du transport, mais une
                  expérience luxueuse et inégalée.
                </div>
              </div>
            </button>
            <button
              className={`text-left flex items-center px-6 py-4 rounded border border-transparent ${
                tab !== 2
                  ? ""
                  : "[background:linear-gradient(#2E2E32,#2E2E32)_padding-box,linear-gradient(120deg,theme(colors.zinc.700),theme(colors.zinc.700/0),theme(colors.zinc.700))_border-box]"
              }`}
              onClick={(e) => {
                e.preventDefault();
                setTab(2);
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 14 14"
                className="shrink-0 text-zinc-400 mr-3"
                xmlns="http://www.w3.org/2000/svg"
                fill={"currentColor"}
              >
                <path
                  d="M9.57837 4.70296C4.70337 5.7863 3.56587 9.12838 2.4392 11.9288L3.46295 12.2863L3.97754 11.0405C4.23754 11.1325 4.50837 11.203 4.70337 11.203C10.6617 11.203 12.2867 1.99463 12.2867 1.99463C11.745 3.07796 7.95337 3.21338 5.24504 3.75505C2.5367 4.29671 1.45337 6.5988 1.45337 7.68213C1.45337 8.76546 2.40129 9.71338 2.40129 9.71338C4.1617 4.70296 9.57837 4.70296 9.57837 4.70296Z"
                  fill="currentColor"
                />
              </svg>

              <div>
                <div className="font-inter-tight text-lg font-semibold text-zinc-200 mb-1">
                  Éco-Responsable
                </div>
                <div className="text-zinc-500">
                  Contribuez à la préservation de l&apos;environnement en
                  choisissant notre flotte de Tesla Model Y, des véhicules
                  électriques haut de gamme.
                </div>
              </div>
            </button>
            <button
              className={`text-left flex items-center px-6 py-4 rounded border border-transparent ${
                tab !== 3
                  ? ""
                  : "[background:linear-gradient(#2E2E32,#2E2E32)_padding-box,linear-gradient(120deg,theme(colors.zinc.700),theme(colors.zinc.700/0),theme(colors.zinc.700))_border-box]"
              }`}
              onClick={(e) => {
                e.preventDefault();
                setTab(3);
              }}
            >
              <svg
                className="shrink-0 fill-zinc-400 mr-3"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
              >
                <path d="m11.293 5.293 1.414 1.414-8 8-1.414-1.414 8-8Zm7-1 1.414 1.414-8 8-1.414-1.414 8-8Zm0 6 1.414 1.414-8 8-1.414-1.414 8-8Z" />
              </svg>
              <div>
                <div className="font-inter-tight text-lg font-semibold text-zinc-200 mb-1">
                  Disponibilité 7/7
                </div>
                <div className="text-zinc-500">
                  Profitez d&apos;une flexibilité maximale avec plusieurs
                  chauffeurs à votre disposition, prêts à vous servir tous les
                  jours de la semaine.
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Tabs items */}
        <div className="flex-1">
          <div className="relative flex flex-col" ref={tabs}>
            {/* Item 1 */}
            <Transition
              show={tab === 1}
              className="w-full"
              enter="transition ease-in-out duration-700 transform order-first"
              enterFrom="opacity-0 -translate-y-4"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in-out duration-300 transform absolute"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-4"
              beforeEnter={() => heightFix()}
              unmount={false}
            >
              <div>
                <Image
                  className="w-full h-auto"
                  src={HomeCarousel1}
                  alt="Carousel 01"
                />
              </div>
            </Transition>
            {/* Item 2 */}
            <Transition
              show={tab === 2}
              className="w-full"
              enter="transition ease-in-out duration-700 transform order-first"
              enterFrom="opacity-0 -translate-y-4"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in-out duration-300 transform absolute"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-4"
              beforeEnter={() => heightFix()}
              unmount={false}
            >
              <div>
                <Image
                  className="w-full h-auto"
                  src={HomeCarousel2}
                  width={800}
                  height={620}
                  alt="Carousel 02"
                />
              </div>
            </Transition>
            {/* Item 3 */}
            <Transition
              show={tab === 3}
              className="w-full"
              enter="transition ease-in-out duration-700 transform order-first"
              enterFrom="opacity-0 -translate-y-4"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in-out duration-300 transform absolute"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-4"
              beforeEnter={() => heightFix()}
              unmount={false}
            >
              <div>
                <Image
                  className="w-full h-auto"
                  src={HomeCarousel3}
                  width={800}
                  height={620}
                  alt="Carousel 03"
                />
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>
  );
}
