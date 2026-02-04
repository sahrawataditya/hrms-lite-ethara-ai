import axios, { AxiosResponse } from "axios";
import toast from "react-hot-toast";

//Try catch wrapper
export async function tryCatchWrapper<T>(
  fn: () => Promise<AxiosResponse<T>>,
): Promise<T | null> {
  try {
    const response = await fn();
    return response.data as T;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      toast.error(err.response?.data?.detail ?? "Something went wrong");
      return null;
    }
    toast.error("Something went wrong");
    return null;
  }
}
