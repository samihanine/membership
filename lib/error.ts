import toast from "react-hot-toast";

export const displayError = (error: { message: string; code?: string }) => {
  toast.error(error.message);
};
