import axios from "axios";
import { randomUUID } from "crypto";
import { authActionClient } from "@/lib/safe-action";
import z from "zod";
import { zfd } from "zod-form-data";

export const uploadFile = authActionClient
  .schema(
    z.object({
      folder: z.enum(["PROFILE_PICTURES", "CARD_IMAGES", "OTHER"]),
      file: zfd.file(),
    }),
  )
  .action(async ({ parsedInput }) => {
    try {
      const baseUrl = "https://api.bytescale.com";
      const randomId = randomUUID().split("-")[0];
      const { folder, file } = parsedInput;

      const folderName = (() => {
        switch (folder) {
          case "PROFILE_PICTURES":
            return "/images/profile-pictures";
          case "CARD_IMAGES":
            return "/images/cards";
          case "OTHER":
          default:
            return "/images/other";
        }
      })();

      const path = `/v2/accounts/${process.env.UPLOADTHING_APP_ID}/uploads/binary?fileName=${randomId}-${file.name}&folderPath=${folderName}`;
      const buffer = await file.arrayBuffer();
      const blob = new Blob([buffer], { type: file.type });

      const result = await axios.post(`${baseUrl}${path}`, blob, {
        headers: {
          "Content-Type": file.type,
          Authorization: `Bearer ${process.env.UPLOADTHING_API_KEY}`,
        },
      });

      return {
        fileUrl: result.data.fileUrl,
        filePath: result.data.filePath,
      };
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message);
      }
      throw new Error("An error occurred while uploading the file");
    }
  });
