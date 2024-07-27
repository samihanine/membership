import axios from "axios";
import { Card, Member } from "./schemas";
import { FormData, File } from "formdata-node";

export const createPrintagsFiles = async ({
  imageBuffer,
}: {
  imageBuffer: Buffer;
}) => {
  const form = new FormData();
  const file = new File([imageBuffer], "card.png", {
    type: "image/png",
  });
  form.append("file", file);

  const accountId = process.env.PRINTAGS_ACCOUNT_ID;

  if (!accountId) {
    throw new Error("Printags account not found");
  }

  const responseFile = await axios.post(
    `https://api.printags.com/accounts/${accountId}/files`,
    form,
    {
      headers: {
        Authorization: `Bearer ${process.env.PRINTAGS_API_KEY}`,
      },
    },
  );

  console.log(responseFile?.data);
  const fileId = responseFile?.data?.files?.file?.id;

  if (!fileId) {
    throw new Error("Printags file not found");
  }

  return fileId;
};

export const createPrintagsOrder = async ({ card }: { card: Card }) => {
  const data = {
    shipTo: {
      name: card.name,
      email: card.email,
      phone: card.phoneNumber,
      address: {
        addressLine: [card.address, card.address2],
        city: card.city,
        postcode: card.postalCode,
        countryCode: card.countryCode,
      },
    },
    shippingFiles: [card.printagsCardFrontId, card.printagsCardBackId],
    products: [
      {
        modelId: "ntag424_pvccard_white",
        nfc: {
          type: "dynamic",
          dynamic: {
            baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/cards/${card.id}`,
            records: {
              publicKey: card.privateKey,
              privateKey: card.adminKey,
              recordId: card.memberId,
            },
          },
        },
        printingVisuals: undefined,
      },
    ],
  };

  const accountId = process.env.PRINTAGS_ACCOUNT_ID;

  if (!accountId) {
    throw new Error("Printags account not found");
  }

  const responseOrder = await axios.post(
    `https://api.printags.com/accounts/${accountId}/orders`,
    data,
    {
      headers: {
        Authorization: `Bearer ${process.env.PRINTAGS_API_KEY}`,
      },
    },
  );

  console.log(responseOrder.data);

  const orderId = responseOrder?.data?.data?.id as string;

  if (!orderId) {
    throw new Error("Printags order not found");
  }

  return orderId;
};
