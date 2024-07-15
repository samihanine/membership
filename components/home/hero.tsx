import HomeHeroImage from "../../public/images/home-hero.jpg";

export default function Hero() {
  // Utiliser des templates literals pour inclure le chemin de l'image dans les styles
  const heroBackgroundStyle = {
    backgroundImage: `url(${HomeHeroImage.src})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div
      style={heroBackgroundStyle}
      className="relative min-h-screen h-fit bg-black w-full flex justify-center items-center bg-cover"
    >
      {/* Ajouter un élément pour l'effet sombre en utilisant un pseudo-élément ou une div supplémentaire */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Contenu du héros, placé au-dessus de l'effet sombre */}
      <div className="z-10 w-full py-20 px-4 min-h-screen h-fit flex justify-center items-center flex-col gap-10">
        <h1 className="text-white text-2xl sm:text-4xl text-center font-semibold tracking-wider">
          Réservez votre course avec chauffeur
          <br /> privé à Lyon, en quelques clics.
        </h1>
      </div>
    </div>
  );
}
