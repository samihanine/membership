import { type UploadFile } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { useAction } from "next-safe-action/hooks";
import { showError } from "../../lib/utils";
import { uploadFile } from "../../server/upload";
import { Input } from "../ui/input";

export default function UploadImageInput({
  setImageUrl,
  folder,
  className,
  ...props
}: React.ComponentProps<typeof Input> & {
  setImageUrl: (url: string) => void;
  folder: UploadFile["folder"];
}) {
  const { executeAsync, status } = useAction(uploadFile);

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
          showError({ message: "L'image ne doit pas dépasser 3Mo" });
          return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder);

        const result = await executeAsync(formData);

        if (result?.data?.fileUrl) {
          setImageUrl(result.data.fileUrl);
        } else {
          showError({
            message: "Une erreur s'est produite lors de l'envoi de l'image",
          });
        }
      }}
      {...props}
    />
  );
}
