import toast from "react-hot-toast";

export const displayError = (error: { message: string; code?: string }) => {
  console.error(error);
  toast.error(error.message);
};
