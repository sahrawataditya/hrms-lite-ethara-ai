import axios from "axios";

export const axiosService = axios.create({
  baseURL:
    (process.env.BASE_URL as string) ||
    (process.env.NEXT_PUBLIC_BASE_URL as string),
  headers: {
    "Content-Type": "application/json",
  },
});
