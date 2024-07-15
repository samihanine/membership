import { cn } from "@/lib/utils";
import { LeafIcon } from "../icons";
import {
  ClockIcon,
  CreditCardIcon,
  MusicalNoteIcon,
  ShieldCheckIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";

export default function ServiceFeatures() {
  return (
    <>
      <ServiceFeature
        title="Pour les entreprises"
        description="Voolta se dédie aux acteurs économiques tels que hôtels, entreprises, espaces de coworking et restaurants, en quête de solutions de transport éthiques et durables. Nos services s'adaptent à vos exigences professionnelles tout en soutenant fermement vos objectifs RSE avec une mobilité à empreinte carbone réduite. Engagez-vous aux côtés d'un partenaire qui facilite la transition de votre activité vers des pratiques plus vertes et responsables."
        features={[
          {
            title: "Politique RSE Engagée",
            description:
              "Voolta enrichit votre démarche durable avec une flotte éco-efficiente, réaffirmant votre engagement envers une mobilité professionnelle responsable.",
            Icon: LeafIcon as any,
          },
          {
            title: "Efficacité optimisée",
            description:
              "Nous proposons une logistique de transport fluide et un suivi en temps réel pour une gestion efficace de vos déplacements professionnels.",
            Icon: ClockIcon,
          },
          {
            title: "Partenaires dans la Durabilité",
            description:
              "Choisissez nous pour intégrer une conscience écologique dans chaque voyage d'affaires, consolidant ainsi votre engagement vers un avenir durable.",
            Icon: UserGroupIcon,
          },
        ]}
      />

      <ServiceFeature
        reverse
        title="Pour les particuliers"
        description="Voolta s'adresse aussi directement à vous, particuliers, qui cherchez un moyen de déplacement qui allie responsabilité écologique et service personnel de premier choix. Nous apportons une solution de mobilité qui non seulement respecte l'environnement, mais enrichit également vos expériences de voyage au quotidien."
        features={[
          {
            title: "Confort Sur-Mesure",
            description:
              "Nos véhicules haut de gamme et notre service client dédié s'associent pour rendre vos trajets quotidiens aussi confortables qu'exceptionnels.",
            Icon: MusicalNoteIcon,
          },
          {
            title: "Sécurité Prioritaire",
            description:
              "Chaque trajet est une promesse de sécurité avec nos chauffeurs formés aux meilleures pratiques, assurant votre tranquillité d'esprit.",
            Icon: ShieldCheckIcon,
          },
          {
            title: "Tarification Transparente",
            description:
              "Transparente et prévisible, notre tarification vous libère des soucis financiers, transformant chaque déplacement en une expérience agréable et fiable.",
            Icon: CreditCardIcon,
          },
        ]}
      />
    </>
  );
}

function ServiceFeature({
  title,
  description,
  features,
  reverse,
}: {
  title: string;
  description: string;
  features: {
    Icon: React.ForwardRefExoticComponent<
      Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
        title?: string | undefined;
        titleId?: string | undefined;
      } & React.RefAttributes<SVGSVGElement>
    >;
    title: string;
    description: string;
  }[];
  reverse?: boolean;
}) {
  return (
    <div className={cn(reverse && "dark bg-background")}>
      <div
        className={cn(
          "flex flex-col px-8 py-24 mx-auto md:px-12 lg:px-32 gap-12 sm:gap-24 md:gap-28 lg:gap-32 lg:flex-row max-w-7xl w-full",
          reverse && "lg:!flex-row-reverse",
        )}
      >
        <div className="flex-1">
          <h1 className="text-3xl font-semibold tracking-tighter text-foreground lg:text-4xl text-balance">
            {title}
          </h1>
          <p className="mt-4 text-base font-medium text-muted-foreground text-justify">
            {description}
          </p>
        </div>
        <div className="flex-1 flex flex-col gap-y-12">
          {features.map((feature) => (
            <div key={feature.title} className="flex gap-4">
              <feature.Icon className="text-foreground w-5 h-5"></feature.Icon>

              <div className="w-full flex flex-col">
                <h3 className="font-medium text-foreground">{feature.title}</h3>
                <p className="mt-2 text-base text-muted-foreground text-justify">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
