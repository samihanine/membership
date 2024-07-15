import {
  BookOpenIcon,
  CurrencyDollarIcon,
  GlobeEuropeAfricaIcon,
  ShieldCheckIcon,
  UserPlusIcon,
  ChatBubbleBottomCenterIcon,
} from "@heroicons/react/24/solid";

export const Values = () => {
  const values: {
    title: string;
    description: string;
    Icon: React.ForwardRefExoticComponent<
      Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
        title?: string | undefined;
        titleId?: string | undefined;
      } & React.RefAttributes<SVGSVGElement>
    >;
  }[] = [
    {
      title: "Tarif fixe",
      description: "Clarté et prévisibilité, sans surprises.",
      Icon: CurrencyDollarIcon,
    },
    {
      title: "Garantie",
      description:
        "Une réservation garantie, sans annulation de dernière minute.",
      Icon: ShieldCheckIcon,
    },
    {
      title: "Écologie",
      description: "Engagés pour un environnement plus sain.",
      Icon: GlobeEuropeAfricaIcon,
    },
    {
      title: "Transparence",
      description:
        "Nous cultivons une communication ouverte et honnête, assurant une clarté totale dans nos tarifs et services.",
      Icon: ChatBubbleBottomCenterIcon,
    },
    {
      title: "Fiabilité",
      description:
        "Chaque réservation est une promesse tenue, garantissant votre mobilité sans faille.",
      Icon: BookOpenIcon,
    },
    {
      title: "Engagement",
      description:
        "Nous nous dédions à l'excellence et à la durabilité, pour une différence qui va bien au-delà du trajet.",
      Icon: UserPlusIcon,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-24 lg:mt-32 mb-20">
      <h2 className="text-3xl font-semibold text-foreground text-center mb-8">
        Vos Avantages avec Voolta
      </h2>

      <p className="text-center text-muted-foreground mb-12">
        Nos avantages sont le socle de notre excellence. Nous nous engageons à
        fournir non seulement un service de transport de premier ordre, mais
        également une expérience inégalée où chaque détail est pensé pour
        répondre à vos attentes.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16">
        {values.map((value) => (
          <div key={value.title}>
            <div className="flex items-center mb-1">
              <value.Icon className="w-5 h-5 mr-3 text-foreground" />
              <h3 className="font-semibold text-foreground text-lg">
                {value.title}
              </h3>
            </div>
            <p className="text-sm text-muted-foreground">{value.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
