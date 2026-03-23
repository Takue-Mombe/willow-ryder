"use client";

import { useActionState } from "react";

import { submitInquiryAction } from "@/app/actions";
import type { InquiryState } from "@/lib/types";

const initialState: InquiryState = {
  ok: false,
  message: "",
};

export function ContactForm() {
  const [state, action, pending] = useActionState(submitInquiryAction, initialState);

  return (
    <form action={action} className="contact-form" noValidate>
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label" htmlFor="firstName">
            First Name
          </label>
          <input
            className="form-input"
            id="firstName"
            name="first_name"
            placeholder="Tendai"
            required
            type="text"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="lastName">
            Last Name
          </label>
          <input
            className="form-input"
            id="lastName"
            name="last_name"
            placeholder="Mhaka"
            required
            type="text"
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="email">
          Email Address
        </label>
        <input
          className="form-input"
          id="email"
          name="email"
          placeholder="you@example.com"
          required
          type="email"
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="phone">
          Phone / WhatsApp
        </label>
        <input
          className="form-input"
          id="phone"
          name="phone"
          placeholder="+263 XXX XXX XXX"
          type="tel"
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="service">
          Service Needed
        </label>
        <select className="form-input" defaultValue="" id="service" name="service">
          <option disabled value="">
            Select a service...
          </option>
          <option value="interior-design">Interior Design</option>
          <option value="flooring-solutions">Flooring Solutions</option>
          <option value="bespoke-carpentry">Bespoke Carpentry</option>
          <option value="kitchen-and-cabinetry">Kitchen & Cabinetry</option>
          <option value="commercial-fit-outs">Commercial Fit-Outs</option>
          <option value="repairs-and-restoration">Repairs & Restoration</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="message">
          Tell Us About Your Project
        </label>
        <textarea
          className="form-textarea"
          id="message"
          name="message"
          placeholder="Describe your project, style direction, and what you need help with..."
          required
        />
      </div>

      <button className="button button--primary contact-form__submit" disabled={pending} type="submit">
        {pending ? "Sending..." : "Send Enquiry →"}
      </button>

      <p className={`contact-form__status${state.ok ? " is-success" : ""}`}>
        {state.message || "We reply within 24 hours. No spam, ever."}
      </p>
    </form>
  );
}
