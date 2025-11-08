"use client";
import { useFormik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

import { useToast } from "@/core/hooks/useToast";
import { Link } from "@/i18n/navigation";

const emailSchema = z.object({
  email: z.email("Please enter a valid email address"),
});

type EmailFormValues = z.infer<typeof emailSchema>;

const Footer = () => {
  const { showSuccess, showError, showLoading, dismissToast } = useToast();

  const footerLinks = [
    { path: "/about", label: "About" },
    { path: "/our-strategy", label: "Our Strategy" },
    { path: "/our-advantages", label: "Our Advantages" },
    { path: "/social-responsibility", label: "Social Responsibility" },
    { path: "/our-services", label: "Our Services" },
  ];

  const formik = useFormik<EmailFormValues>({
    initialValues: { email: "" },
    validationSchema: toFormikValidationSchema(emailSchema),
    onSubmit: async (values, { resetForm }) => {
      showLoading("Subscribing...", { duration: Infinity });

      try {
        const response = await fetch("/server-api/newsletter-subscriptions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              email: values.email,
              subscribedAt: new Date().toISOString(),
            },
          }),
        });

        const data = await response.json();

        dismissToast();

        if (data.error) {
          if (data.error.status === 400) {
            showError("This email is already subscribed to our newsletter.");
          } else {
            showError(
              data.error.message ?? "Failed to subscribe. Please try again."
            );
          }
          return;
        }

        showSuccess("Successfully subscribed to our newsletter!");
        resetForm();
      } catch {
        dismissToast();
        showError("An unexpected error occurred. Please try again.");
      }
    },
  });

  return (
    <div className="flex flex-col gap-8 p-6">
      <div className="flex flex-col md:flex-row items-end md:items-center justify-end gap-6 self-end">
        <div className="flex flex-col">
          <form
            className="rounded-md px-3 py-2 flex bg-foreground"
            onSubmit={formik.handleSubmit}
          >
            <input
              className="bg-transparent text-accent placeholder:text-accent max-w-[150px] text-primary border-0 outline-0"
              disabled={formik.isSubmitting}
              name="email"
              placeholder="Enter your email"
              type="email"
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <button
              className="bg-background px-2 py-1 rounded-xl cursor-pointer text-foreground"
              disabled={formik.isSubmitting || !formik.isValid}
              type="submit"
            >
              {formik.isSubmitting ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
          )}
        </div>

        <span>Contacts</span>
        <div className="flex justify-between gap-7">
          <svg
            fill="none"
            height="13"
            viewBox="0 0 16 13"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.8303 1.52682C15.3816 2.18307 14.8392 2.74222 14.2031 3.20428C14.2098 3.29803 14.2131 3.43865 14.2131 3.62615C14.2131 4.49669 14.0859 5.36722 13.8314 6.23776C13.577 7.1016 13.1886 7.93195 12.6662 8.72883C12.1506 9.5257 11.5345 10.2322 10.818 10.8482C10.1015 11.4576 9.23767 11.9465 8.22651 12.3148C7.21535 12.6764 6.13388 12.8572 4.98209 12.8572C3.16736 12.8572 1.50664 12.3717 -5.22919e-05 11.4007C0.234323 11.4275 0.495483 11.4409 0.78343 11.4409C2.29013 11.4409 3.63276 10.9788 4.81133 10.0547C4.10821 10.0413 3.47874 9.82704 2.92294 9.41186C2.36714 8.98999 1.98544 8.45428 1.77785 7.80472C1.99883 7.8382 2.20307 7.85495 2.39057 7.85495C2.67852 7.85495 2.96312 7.81812 3.24437 7.74445C2.49437 7.59044 1.8716 7.21878 1.37606 6.6295C0.887224 6.03352 0.642805 5.34378 0.642805 4.5603V4.52012C1.09816 4.77459 1.587 4.91186 2.10932 4.93195C1.66736 4.63731 1.3158 4.25227 1.05464 3.77682C0.793475 3.30137 0.662894 2.78575 0.662894 2.22994C0.662894 1.64066 0.810216 1.0949 1.10486 0.592669C1.91513 1.59044 2.8995 2.39066 4.05798 2.99334C5.22316 3.58932 6.4687 3.92079 7.79459 3.98776C7.74102 3.73329 7.71423 3.48553 7.71423 3.24445C7.71423 2.34713 8.02897 1.58374 8.65843 0.954275C9.29459 0.318115 10.0613 3.45707e-05 10.9587 3.45707e-05C11.8962 3.45707e-05 12.6863 0.341552 13.3292 1.02459C14.0591 0.883963 14.7455 0.622802 15.3883 0.241106C15.1406 1.0112 14.6651 1.60718 13.962 2.02905C14.5848 1.96209 15.2075 1.79468 15.8303 1.52682Z"
              fill="white"
            />
          </svg>
          <svg
            fill="none"
            height="17"
            viewBox="0 0 9 17"
            width="9"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.67859 0.12043V2.77222H7.10158C6.52569 2.77222 6.13729 2.89275 5.9364 3.13382C5.73551 3.37489 5.63506 3.7365 5.63506 4.21865V6.11708H8.57814L8.1864 9.0903H5.63506V16.7142H2.5614V9.0903H1.74865e-05V6.11708H2.5614V3.92735C2.5614 2.68181 2.90962 1.71753 3.60604 1.03449C4.30247 0.34476 5.22993 -0.000105858 6.38841 -0.000105858C7.37279 -0.000105858 8.13618 0.0400729 8.67859 0.12043Z"
              fill="white"
            />
          </svg>

          <svg
            fill="none"
            height="15"
            viewBox="0 0 24 15"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.4342 7.53345C14.4342 8.9263 14.1429 10.1685 13.5603 11.26C12.9777 12.3448 12.1473 13.1919 11.0692 13.8013C9.99107 14.4174 8.75558 14.7254 7.36272 14.7254C6.36496 14.7254 5.41071 14.5312 4.5 14.1428C3.58929 13.7544 2.8058 13.2321 2.14955 12.5759C1.4933 11.9196 0.970982 11.1361 0.582589 10.2254C0.194196 9.3147 0 8.36046 0 7.36269C0 6.36492 0.194196 5.41068 0.582589 4.49996C0.970982 3.58925 1.4933 2.80577 2.14955 2.14952C2.8058 1.49327 3.58929 0.970947 4.5 0.582554C5.41071 0.194161 6.36496 -3.56436e-05 7.36272 -3.56436e-05C9.2779 -3.56436e-05 10.9219 0.642822 12.2946 1.92854L10.2958 3.84706C9.51228 3.09037 8.5346 2.71202 7.36272 2.71202C6.53906 2.71202 5.77567 2.91961 5.07254 3.33479C4.37612 3.74996 3.82366 4.31581 3.41518 5.03233C3.0067 5.74215 2.80246 6.51894 2.80246 7.36269C2.80246 8.20644 3.0067 8.98657 3.41518 9.70309C3.82366 10.4129 4.37612 10.9754 5.07254 11.3906C5.77567 11.8058 6.53906 12.0134 7.36272 12.0134C7.91853 12.0134 8.42746 11.9363 8.88951 11.7823C9.35826 11.6283 9.7433 11.4375 10.0446 11.2098C10.346 10.9754 10.6071 10.7109 10.8281 10.4163C11.0558 10.1216 11.2199 9.84371 11.3203 9.58255C11.4275 9.32139 11.5011 9.07363 11.5413 8.83925H7.36272V6.308H14.3136C14.394 6.72988 14.4342 7.13836 14.4342 7.53345ZM23.1429 6.308V8.41738H21.0435V10.5167H18.9342V8.41738H16.8348V6.308H18.9342V4.20867H21.0435V6.308H23.1429Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
      <hr />
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <nav className="flex flex-wrap justify-center gap-3 text-sm">
          {footerLinks.map((link) => (
            <Link key={link.label} href={link.path}>
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="text-center sm:text-right">
          © {new Date().getFullYear()} . All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
