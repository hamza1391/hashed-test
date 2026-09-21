"use client";

import { useMutation } from "@tanstack/react-query";
import { submitContact } from "@/lib/api/contact";

export function useSubmitContact() {
  return useMutation({
    mutationFn: submitContact,
  });
}
