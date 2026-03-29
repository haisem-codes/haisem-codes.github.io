"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { personal } from "@/data/personal";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const WEB3FORMS_KEY = "08386709-3da8-4862-be31-e2d9a7a38f64";

const PROJECT_TYPES = [
  "AI Agent / Chatbot",
  "Voice AI / Call Automation",
  "Full-Stack Web App",
  "Mobile App",
  "AI Automation / n8n",
  "Data Science / ML",
  "Consulting",
  "Other",
];

const BUDGET_RANGES = [
  "Under $1,000",
  "$1,000 - $5,000",
  "$5,000 - $15,000",
  "$15,000+",
  "Not sure yet",
];

type FormStatus = "idle" | "sending" | "success" | "error";

interface FormFields {
  name: string;
  email: string;
  projectType: string;
  budgetRange: string;
  message: string;
  botcheck: string;
}

const INITIAL_FORM: FormFields = {
  name: "",
  email: "",
  projectType: "",
  budgetRange: "",
  message: "",
  botcheck: "",
};

const INPUT_CLASS =
  "w-full px-4 py-3 rounded-xl bg-bg-card border border-border text-text text-sm focus:border-accent/50 focus:outline-none transition-colors";

function EmailIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect
        x="1.333"
        y="2.667"
        width="13.333"
        height="10.667"
        rx="1.333"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.333 4 8 9.333 14.667 4"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UpworkIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function getSocialIcon(platform: string) {
  switch (platform) {
    case "Email":
      return <EmailIcon />;
    case "Upwork":
      return <UpworkIcon />;
    case "GitHub":
      return <GitHubIcon />;
    case "LinkedIn":
      return <LinkedInIcon />;
    default:
      return null;
  }
}

export function Contact() {
  const [formData, setFormData] = useState<FormFields>(INITIAL_FORM);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Honeypot check — if filled, silently bail
    if (formData.botcheck) return;

    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New project inquiry from ${formData.name}`,
          from_name: formData.name,
          email: formData.email,
          project_type: formData.projectType,
          budget_range: formData.budgetRange,
          message: formData.message,
          botcheck: formData.botcheck,
        }),
      });

      const result = (await response.json()) as {
        success: boolean;
        message?: string;
      };

      if (result.success) {
        setStatus("success");
        setFormData(INITIAL_FORM);
      } else {
        setStatus("error");
        setErrorMessage(
          result.message ?? "Something went wrong. Please try again."
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage(
        "Network error. Please check your connection and try again."
      );
    }
  }

  function handleReset() {
    setStatus("idle");
    setErrorMessage("");
  }

  return (
    <section id="contact" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left column */}
          <ScrollReveal>
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl font-bold text-text leading-tight">
                  {"Let's build something "}
                  <span className="bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
                    extraordinary.
                  </span>
                </h2>
                <p className="text-text-muted text-base leading-relaxed">
                  Have a project in mind? I&apos;d love to hear about it. Send
                  me a message and let&apos;s talk about how we can work
                  together to build something great.
                </p>
              </div>

              <div className="space-y-3">
                {personal.socials.map((social) => (
                  <motion.a
                    key={social.platform}
                    href={social.url}
                    target={
                      social.platform !== "Email" ? "_blank" : undefined
                    }
                    rel={
                      social.platform !== "Email"
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="flex items-center gap-3 group w-fit"
                    whileHover={{ x: 4 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                  >
                    <span className="flex items-center justify-center w-9 h-9 rounded-full glass border border-border text-accent group-hover:border-accent/50 transition-colors">
                      {getSocialIcon(social.platform)}
                    </span>
                    <span className="text-text-muted text-sm group-hover:text-text transition-colors">
                      {social.label}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Right column — form */}
          <ScrollReveal delay={0.15}>
            {status === "success" ? (
              <div className="rounded-2xl bg-bg-card border border-accent/30 p-8 flex flex-col items-center text-center gap-4">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 border border-accent/30">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-accent"
                    aria-hidden="true"
                  >
                    <path
                      d="M20 6 9 17l-5-5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="space-y-1">
                  <p className="text-text font-semibold text-lg">
                    Message Sent!
                  </p>
                  <p className="text-text-muted text-sm">
                    Thanks for reaching out. I&apos;ll get back to you as soon
                    as possible.
                  </p>
                </div>
                <button
                  onClick={handleReset}
                  className="text-accent text-sm underline underline-offset-4 hover:text-accent/80 transition-colors mt-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Honeypot — hidden from real users, traps bots */}
                <input
                  type="checkbox"
                  name="botcheck"
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                  checked={formData.botcheck === "on"}
                  onChange={handleChange}
                  aria-hidden="true"
                />

                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-text-muted text-xs font-medium mb-1.5"
                  >
                    Name <span className="text-accent">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className={INPUT_CLASS}
                    disabled={status === "sending"}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-text-muted text-xs font-medium mb-1.5"
                  >
                    Email <span className="text-accent">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className={INPUT_CLASS}
                    disabled={status === "sending"}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-project-type"
                    className="block text-text-muted text-xs font-medium mb-1.5"
                  >
                    Project Type
                  </label>
                  <select
                    id="contact-project-type"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className={INPUT_CLASS}
                    disabled={status === "sending"}
                  >
                    <option value="">Select a project type</option>
                    {PROJECT_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-budget"
                    className="block text-text-muted text-xs font-medium mb-1.5"
                  >
                    Budget Range
                  </label>
                  <select
                    id="contact-budget"
                    name="budgetRange"
                    value={formData.budgetRange}
                    onChange={handleChange}
                    className={INPUT_CLASS}
                    disabled={status === "sending"}
                  >
                    <option value="">Select a budget range</option>
                    {BUDGET_RANGES.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-text-muted text-xs font-medium mb-1.5"
                  >
                    Message <span className="text-accent">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    className={`${INPUT_CLASS} resize-none`}
                    disabled={status === "sending"}
                  />
                </div>

                {status === "error" && errorMessage && (
                  <p className="text-red-400 text-sm" role="alert">
                    {errorMessage}
                  </p>
                )}

                <motion.button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-3.5 rounded-xl bg-accent text-bg font-medium text-sm disabled:opacity-60 disabled:cursor-not-allowed transition-opacity"
                  whileHover={status !== "sending" ? { scale: 1.02 } : {}}
                  whileTap={status !== "sending" ? { scale: 0.98 } : {}}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {status === "sending" ? "Sending..." : "Send Message"}
                </motion.button>
              </form>
            )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
