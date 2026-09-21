"use client";

import { useForm } from "react-hook-form";
import { useSubmitContact } from "@/hooks/use-submit-contact";

type ContactFormValues = {
  email: string;
  message: string;
};

const inputClassName =
  "w-full border border-footer-border bg-footer-input px-4 text-sm text-white outline-none transition-colors placeholder:text-footer-muted focus:border-brand";

export function ContactForm() {
  const contact = useSubmitContact();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    defaultValues: {
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    await contact.mutateAsync(data);
    reset();
  };

  const pending = isSubmitting || contact.isPending;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full shrink-0 lg:max-w-[420px]"
      noValidate
    >
      <h2 className="text-lg font-semibold text-white md:text-xl">
        Get in Touch
      </h2>

      <div className="mt-4">
        <label htmlFor="footer-email" className="sr-only">
          Email Address
        </label>
        <input
          id="footer-email"
          type="email"
          autoComplete="email"
          placeholder="Email Address"
          aria-invalid={errors.email ? "true" : "false"}
          className={`${inputClassName} h-12 rounded-xl md:h-[52px] md:rounded-2xl`}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email",
            },
          })}
        />
        {errors.email ? (
          <p className="mt-1.5 text-xs text-brand">{errors.email.message}</p>
        ) : null}
      </div>

      <div className="mt-4">
        <label htmlFor="footer-message" className="sr-only">
          Message
        </label>
        <textarea
          id="footer-message"
          placeholder="Message"
          rows={4}
          aria-invalid={errors.message ? "true" : "false"}
          className={`${inputClassName} h-[140px] resize-none rounded-[10px] py-3.5 md:h-[160px]`}
          {...register("message", {
            required: "Message is required",
          })}
        />
        {errors.message ? (
          <p className="mt-1.5 text-xs text-brand">{errors.message.message}</p>
        ) : null}
      </div>

      {contact.isError ? (
        <p className="mt-2 text-xs text-brand">Could not send. Try again.</p>
      ) : null}

      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          disabled={pending}
          className="h-11 min-w-[96px] cursor-pointer rounded-xl bg-brand px-7 text-sm font-medium text-white transition-colors hover:bg-brand/90 disabled:opacity-70 md:h-12 md:min-w-[180px] md:rounded-2xl md:px-10 lg:min-w-[120px] lg:px-8"
        >
          {pending ? "Sending" : "Send"}
        </button>
      </div>
    </form>
  );
}
