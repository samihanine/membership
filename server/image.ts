import { createCanvas, loadImage } from "canvas";

export const createImageBuffer = async (props: {
  backgroundImageUrl: string;
  images: {
    url: string;
    x: number;
    y: number;
    width?: number;
    height?: number;
  }[];
  text: {
    content: string;
    x: number;
    y: number;
    fontSize?: number;
    fontFamily?: string;
    color?: string;
  }[];
}) => {
  const canvas = createCanvas(1200, 630);
  const ctx = canvas.getContext("2d");

  const backgroundImage = await loadImage(props.backgroundImageUrl);
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

  for (const image of props.images) {
    const img = await loadImage(image.url);
    ctx.drawImage(
      img,
      image.x,
      image.y,
      image.width || 100,
      image.height || 100,
    );
  }

  for (const text of props.text) {
    ctx.font = `${text.fontSize || 24}px ${text.fontFamily || "Arial"}`;
    ctx.fillStyle = text.color || "black";
    ctx.fillText(text.content, text.x, text.y);
  }

  return canvas.toBuffer("image/png");
};
