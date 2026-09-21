import axios from "axios";

function getBaseURL() {
  if (typeof window !== "undefined") {
    return "/api";
  }

  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) {
    return `https://${vercelUrl}/api`;
  }

  return "http://localhost:3000/api";
}

export const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  config.baseURL = getBaseURL();
  return config;
});
