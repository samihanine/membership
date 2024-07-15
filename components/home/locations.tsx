import Image from "next/image";
import { PinContainer } from "./animated-pin";

export default function Locations() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 w-full pb-40">
      {/* Section header */}
      <div className="max-w-3xl mx-auto text-center pb-12 md:pb-28">
        <h2 className="text-3xl md:text-4xl font-medium font-cabinet-grotesk">
          Mobilité et ponctualité assurée avec Voolta
        </h2>
      </div>

      <div className="flex gap-10 flex-col sm:flex-row sm:gap-20">
        <div className="w-full flex flex-col gap-5">
          <h3 className="text-2xl font-medium text-foreground">
            Où opérons nous ?
          </h3>

          <p className="text-muted-foreground">
            Nos chauffeurs assurent vos déplacements à Lyon et ses alentours,
            répondant avec excellence à tous vos besoins de transport.
          </p>

          <h3 className="text-2xl font-medium text-foreground mt-8">
            L’importance du timing chez Voolta
          </h3>

          <p className="text-muted-foreground">
            La ponctualité est essentielle pour nos chauffeurs. Nous vous
            promettons un service à l&apos;heure, soutenu par notre système de
            réservation simple et des étapes claires. Tout dans notre service
            est pensé pour rendre vos déplacements agréables et sans souci.{" "}
          </p>
        </div>
        <PinContainer
          title="Lyon et ses alentours"
          containerClassName=" w-full"
        >
          <div className="flex flex-col justify-center gap-3 p-4">
            <h4 className="text-lg text-background font-medium">
              Au coeur de vos déplacements
            </h4>
            <p className="text-muted-foreground">
              Voyagez sereinement à travers la ville et ses environs.{" "}
            </p>

            <Image
              src="/images/lyon-map.png"
              alt="Lyon"
              className="w-60 sm:w-80 !max-w-6xl mt-5"
              width={400}
              height={400}
            />
          </div>
        </PinContainer>
      </div>
    </div>
  );
}
