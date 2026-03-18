"use client";

import { useState, type FormEvent } from "react";
import type { WPService } from "@/types/wordpress";

interface QuoteFormProps {
  services?: WPService[];
  /** If provided, pre-selects a service in the dropdown */
  preselectedService?: string;
  /** Layout variant */
  variant?: "hero" | "page" | "detailed";
  /** Toggle service dropdown */
  showServiceSelect?: boolean;
}

type FormStatus = "idle" | "sending" | "success" | "error";

export const QuoteForm = ({
  services = [],
  preselectedService = "",
  variant = "hero",
  showServiceSelect = true,
}: QuoteFormProps) => {
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const formData = new FormData(e.currentTarget);
    const body = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const isHero = variant === "hero";
  const isDetailed = variant === "detailed";

  return (
    <form
      id="quote"
      onSubmit={handleSubmit}
      className={`border ${isDetailed ? "border-primary/60 rounded-none bg-white" : "border-border rounded-2xl bg-background/95 backdrop-blur-sm"} shadow-xl p-6 w-full ${
        isHero ? "max-w-md" : "max-w-2xl mx-auto"
      }`}
    >
      <h2 className={`font-bold text-foreground mb-6 ${isHero ? "text-xl" : "text-xl text-center"}`}>
        {isDetailed ? "Contact Us Today to Begin Your Project" : "Get Your Free Estimate"}
      </h2>

      {status === "success" ? (
        <div className="py-8 text-center space-y-2">
          <p className="text-2xl">✅</p>
          <p className="font-semibold text-foreground">We'll call you within 1 business day!</p>
          <p className="text-sm text-muted-foreground">Check your email for a confirmation.</p>
        </div>
      ) : (
        <fieldset disabled={status === "sending"} className="space-y-3">
          <div className={isHero ? "space-y-3" : "grid sm:grid-cols-2 gap-3"}>
            <input
              required
              name={isDetailed ? "firstName" : "name"}
              placeholder={isDetailed ? "First Name" : "Your Name"}
              autoComplete={isDetailed ? "given-name" : "name"}
              className="h-10 w-full rounded-none border border-border bg-white px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
            <input
              required
              type="tel"
              name="phone"
              placeholder="Phone Number"
              autoComplete="tel"
              className="h-10 w-full rounded-none border border-border bg-white px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          {isDetailed && (
            <div className="grid sm:grid-cols-2 gap-3">
              <input
                required
                name="lastName"
                placeholder="Last Name"
                autoComplete="family-name"
                className="h-10 w-full rounded-none border border-border bg-white px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              <input
                required
                type="email"
                name="email"
                placeholder="Email"
                autoComplete="email"
                className="h-10 w-full rounded-none border border-border bg-white px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
          )}

          {!isDetailed && (
            <input
              type="email"
              name="email"
              placeholder="Email Address (optional)"
              autoComplete="email"
              className="h-10 w-full rounded-none border border-border bg-white px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          )}

          {isDetailed && (
            <input
              name="propertyAddress"
              placeholder="Property Address"
              autoComplete="street-address"
              className="h-10 w-full rounded-none border border-border bg-white px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          )}

          {showServiceSelect && (services.length > 0 || isDetailed) && (
            <select
              name="service"
              defaultValue={preselectedService}
              className="h-10 w-full rounded-none border border-border bg-white px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              <option value="">Select a Service</option>
              {services.length > 0
                ? services.map((s) => (
                    <option key={s.slug} value={s.slug}>
                      {s.title.rendered}
                    </option>
                  ))
                : ["Fences", "Gates", "Outdoor Living"].map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
            </select>
          )}

          {isDetailed && (
            <div className="grid sm:grid-cols-2 gap-3">
              <select
                name="timeline"
                className="h-10 w-full rounded-none border border-border bg-white px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                <option value="">Best Time To Call You?</option>
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="evening">Evening</option>
                <option value="asap">ASAP</option>
                <option value="1-3-months">1-3 Months</option>
                <option value="3-6-months">3-6 Months</option>
                <option value="exploring">Just Exploring</option>
              </select>
              <select
                name="budget"
                className="h-10 w-full rounded-none border border-border bg-white px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                <option value="">Estimated Budget</option>
                <option value="under-5k">Under $5k</option>
                <option value="5-10k">$5k - $10k</option>
                <option value="10-20k">$10k - $20k</option>
                <option value="20k-plus">$20k+</option>
              </select>
            </div>
          )}

          <textarea
            name="message"
            rows={isHero ? 3 : 4}
            placeholder={isDetailed ? "Tell us about your project..." : "Tell us about your project…"}
            className="w-full rounded-none border border-border bg-white px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/40"
          />

          {status === "error" && (
            <p className="text-sm text-destructive">Something went wrong. Please call us directly.</p>
          )}

          <button
            type="submit"
            className="w-full h-12 rounded-none bg-primary text-primary-foreground text-sm font-semibold uppercase tracking-wide hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {status === "sending" ? "Sending…" : "Request Free Estimate"}
          </button>

          <p className="text-xs text-muted-foreground text-left">
            {isDetailed
              ? "By submitting this form, you agree to receive calls or texts from our team. Reply STOP to opt out."
              : "No spam. No obligations. We respect your privacy."}
          </p>
        </fieldset>
      )}
    </form>
  );
};
