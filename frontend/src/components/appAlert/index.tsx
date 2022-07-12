import { toast } from "react-toastify";

interface IAppAlert {
  type: "success" | "warn" | "error";
  message: string;
}
export const AppAlert = ({ message, type }: IAppAlert) => {
  switch (type) {
    case "success":
      return toast.success(message);
    case "warn":
      return toast.warn(message);
    case "error":
      return toast.error(message);
    default:
      return toast.success(message);
  }
};
