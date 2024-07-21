"use server";
import axios from "axios";
import { randomUUID } from "crypto";
import { authActionClient } from "@/lib/safe-action";
import { uploadFileSchema, UploadFile } from "@/lib/schemas";
import { File } from "formdata-node";

export const uploadFile = authActionClient
  .schema(uploadFileSchema)
  .action(async ({ parsedInput }) => {
    const { file, folder } = parsedInput;

    return uploadFileToTheCloud({ file, folder });
  });

export const uploadFileToTheCloud = async ({
  file,
  folder,
}: {
  file: File;
  folder: UploadFile["folder"];
}) => {
  try {
    const baseUrl = "https://api.bytescale.com";
    const randomId = randomUUID().split("-")[0];

    if (!file) {
      throw new Error("No file provided");
    }

    if (file.size > 3_000_000) {
      throw new Error("The file must not exceed 3MB");
    }

    const folderName = (() => {
      switch (folder) {
        case "MEMBER_PROFILE_PICTURES":
          return "/images/member-profile-pictures";
        case "USER_PROFILE_PICTURES":
          return "/images/user-profile-pictures";
        case "ORGANIZATION_LOGOS":
          return "/images/organization-logos";
        case "CARD_IMAGES":
          return "/images/cards";
        case "OTHER":
        default:
          return "/images/other";
      }
    })();

    const path = `/v2/accounts/${process.env.BYTESCALE_APP_ID}/uploads/binary?fileName=${randomId}-${file.name}&folderPath=${folderName}`;
    const buffer = await file.arrayBuffer();
    const blob = new Blob([buffer], { type: file.type });

    const result = await axios.post(`${baseUrl}${path}`, blob, {
      headers: {
        "Content-Type": file.type,
        Authorization: `Bearer ${process.env.BYTESCALE_SECRET_KEY}`,
      },
    });

    return {
      fileUrl: result.data.fileUrl,
      filePath: result.data.filePath,
    };
  } catch (error: any) {
    console.log("Error uploading file:", error);
    if (error.response) {
      console.log(error.response.data);
      throw new Error(error.response.data.message);
    }
    throw new Error("An error occurred while uploading the file");
  }
};
