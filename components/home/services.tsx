import Image from "next/image";
import Service01 from "../../public/images/service-01.jpg";
import Service02 from "../../public/images/service-02.jpg";
import Service03 from "../../public/images/service-03.jpg";
import Service04 from "../../public/images/service-04.jpg";
import Service05 from "../../public/images/service-05.jpg";
import Service06 from "../../public/images/service-06.jpg";
import Service07 from "../../public/images/service-07.jpg";
import Service08 from "../../public/images/service-08.jpg";
import Service09 from "../../public/images/service-09.jpg";
import Service10 from "../../public/images/service-10.jpg";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Services() {
  const services = [
    {
      src: Service01,
      title: "System Design",
    },
    {
      src: Service02,
      title: "Remote Team",
    },
    {
      src: Service03,
      title: "Illustration",
    },
    {
      src: Service04,
      title: "Articles & Posts",
    },
    {
      src: Service05,
      title: "Wireframing",
    },
    {
      src: Service06,
      title: "Website Content",
    },
    {
      src: Service07,
      title: "Copywriting",
    },
    {
      src: Service08,
      title: "Virtual Assistant",
    },
    {
      src: Service09,
      title: "Video Editing",
    },
    {
      src: Service10,
      title: "Web Development",
    },
  ];

  return (
    <section className="bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="relative">
            {/* Section header */}
            <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
              <h3 className="font-inter-tight text-3xl font-bold text-foreground mb-4">
                Excellence en transport privé pour Entreprises et Particuliers
              </h3>
            </div>

            {/* Grid */}
            <div className="max-w-2xl mx-auto grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 lg:max-w-none items-start">
              {services.map((service, index) => (
                <div key={index} className="h-full flex flex-col">
                  {/* Image */}
                  <div className="mb-4">
                    <a className="block group overflow-hidden" href="#0">
                      <Image
                        className="w-full aspect-[101/64] object-cover group-hover:scale-105 transition duration-700 ease-out"
                        src={service.src}
                        width="202"
                        height="128"
                        alt={service.title}
                      />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom gradient */}
            <div className="flex justify-center items-center absolute bottom-0 w-full h-48 bg-gradient-to-t from-gray-900 pointer-events-none"></div>
          </div>

          <div className="w-full flex justify-center items-center mt-6 md:mt-8 lg:mt-12">
            <Link className="mx-auto self-center" href="/services">
              <Button size={"lg"}>
                Voir tous les services
                <span className="tracking-normal text-white group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-2">
                  <svg
                    className="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="8"
                  >
                    <path d="m10.865.013.747.148c.243.065.481.143.716.235.495.18.97.42 1.415.716.265.192.571.343.858.55.096.064.192.135.288.209l.196.154.192.178c.09.08.175.168.254.262.189.21.33.466.414.747.076.275.073.568-.008.84-.09.27-.236.513-.427.708-.096.1-.198.191-.306.274l-.152.117-.116.074c-.369.252-.75.482-1.14.69-.577.315-1.153.585-1.701.932-.408.262-.803.549-1.182.86-.083.064-.16.136-.247.193a.918.918 0 0 1-.113.072.644.644 0 0 1-.118.016.708.708 0 0 1-.191.01.559.559 0 0 1-.246-.088l-.072-.054a1.481 1.481 0 0 1-.141-.107c-.128-.122-.1-.377.05-.726.036-.08.079-.156.128-.226l.316-.401c.164-.188.336-.372.514-.543.178-.17.356-.342.546-.493.19-.152.394-.265.59-.39.53-.329 1.05-.626 1.552-.93-.159.018-.32.034-.48.04-.511.036-1.026.044-1.546.048a43.432 43.432 0 0 1-2.31-.058l-.005-.02a78.728 78.728 0 0 0-2.292-.148c-.279-.016-.558.01-.837-.006L4.543 3.81l-.977-.046a19.357 19.357 0 0 1-.49-.029 12.6 12.6 0 0 0-1.303.013l-.828.055-.406.021H.335l-.18.008c-.145 0-.208-.15-.102-.356.16-.268.422-.46.723-.531.57-.117 1.144-.205 1.72-.264.287-.026.576-.048.865-.053.29-.004.578.01.865.042.69.065 1.408-.015 2.113-.015.776.003 1.549.02 2.324.04l1.428.039 1.087.039c.359.012.716.02 1.075.013.442-.008.879-.065 1.318-.112a3.672 3.672 0 0 0-.186-.166 9.045 9.045 0 0 0-1.06-.762 9.82 9.82 0 0 0-1.034-.537 5.9 5.9 0 0 1-1.284-.854c-.12-.115-.053-.199.12-.26a1.55 1.55 0 0 1 .738-.083Z" />
                  </svg>
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
