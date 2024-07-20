import sharp from "sharp";
import fetch from "node-fetch";

// Fonction pour charger une image depuis une URL
async function loadImage(url: string): Promise<Buffer> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to load image from URL: ${url}`);
  return response.buffer();
}

async function modifyImage() {
  const backgroundUrl = "https://exemple.com/background.jpg";
  const logoUrl = "https://exemple.com/logo.png";
  const text = "Ton texte ici";
  const textWidth = 300;
  const textHeight = 100;

  // Charger les images
  const backgroundImage = await loadImage(backgroundUrl);
  const logoImage = await loadImage(logoUrl);

  // Créer une image de texte
  const textImage = await sharp({
    create: {
      width: textWidth,
      height: textHeight,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      {
        input: Buffer.from(`<svg>
            <text x="0" y="50" font-family="Arial" font-size="50" fill="white">${text}</text>
        </svg>`),
        top: 0,
        left: 0,
      },
    ])
    .png()
    .toBuffer();

  // Combiner le tout
  const outputImage = await sharp(backgroundImage)
    .composite([
      { input: logoImage, top: 50, left: 100 },
      { input: textImage, top: 200, left: 150 },
    ])
    .png()
    .toBuffer();

  // Tu peux maintenant utiliser `outputImage` qui est un Buffer de l'image finale
  console.log("Image processed successfully.");
  // Si tu dois renvoyer cette image par exemple sur un serveur web:
  // res.type('png').send(outputImage);
}
