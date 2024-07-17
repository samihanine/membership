import { Input } from "../ui/input";
import { displayError } from "../../lib/error";
import { useAction } from "next-safe-action/hooks";
import { uploadFile } from "../../server/upload";
import { type UploadFile } from "@/lib/schemas";
import { cn } from "@/lib/utils";

export default function UploadImageInput({
  setImageUrl,
  folder,
  className,
  ...props
}: React.ComponentProps<typeof Input> & {
  setImageUrl: (url: string) => void;
  folder: UploadFile["folder"];
}) {
  const { executeAsync, status, result } = useAction(uploadFile);

  return (
    <Input
      type="file"
      accept="image/*"
      className={cn("w-fit border border-border", className)}
      disabled={status === "executing"}
      onChange={async (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        if (file.size > 3_000_000) {
          displayError({ message: "L'image ne doit pas dépasser 3Mo" });
          return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder);

        const result = await executeAsync(formData);

        console.log(result?.validationErrors);
        console.log(result?.bindArgsValidationErrors);
        console.log(result?.serverError);

        if (result?.data?.fileUrl) {
          setImageUrl(result.data.fileUrl);
        } else {
          displayError({
            message: "Une erreur s'est produite lors de l'envoi de l'image",
          });
        }
      }}
      {...props}
    />
  );
}
