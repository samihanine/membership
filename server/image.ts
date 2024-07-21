import { createCanvas, loadImage } from "canvas";

export const generateImageBuffer = async (props: {
  backgroundImageUrl: string;
  width: number;
  height: number;
  images: {
    url?: string;
    x: number;
    y: number;
    width: number;
    height: number;
    alt: string;
    borderRadius?: number;
  }[];
  texts: {
    content: string;
    x: number;
    y: number;
    fontSize?: number;
    fontFamily?: string;
    color?: string;
    align?: "left" | "center" | "right";
  }[];
}) => {
  const canvas = createCanvas(props.width, props.height);
  const ctx = canvas.getContext("2d");

  const backgroundImage = await loadImage(props.backgroundImageUrl);
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

  for (const image of props.images) {
    if (image.url) {
      const img = await loadImage(image.url);
      ctx.drawImage(img, image.x, image.y, image.width, image.height);
    } else {
      const fontSize = image.height * 0.4;
      ctx.font = `${fontSize}px Arial`;
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.fillText(
        image.alt,
        image.x + image.width / 2,
        image.y + image.height / 2 + fontSize / 4,
      );
    }
  }

  for (const text of props.texts) {
    ctx.font = `${text.fontSize || 24}px ${text.fontFamily || "Arial"}`;
    ctx.fillStyle = text.color || "black";
    ctx.textAlign = text.align || "left";
    ctx.fillText(text.content, text.x, text.y);
  }

  return canvas.toBuffer("image/png");
};
