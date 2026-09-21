import { api } from "@/lib/api/client";

export type ContactPayload = {
  email: string;
  message: string;
};

export type ContactResponse = {
  ok: boolean;
};

export async function submitContact(
  payload: ContactPayload
): Promise<ContactResponse> {
  const { data } = await api.post<ContactResponse>("/contact", payload);
  return data;
}
