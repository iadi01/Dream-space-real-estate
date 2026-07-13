"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

interface ContactFormProps {
  projectName?: string;
  sourceName?: string;
}

export default function ContactForm({
  projectName = "General Enquiry",
  sourceName = "Website Contact Form",
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setError("Name and Phone number are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          project: projectName,
          source: sourceName,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setSuccess(true);
      setFormData({ name: "", phone: "", email: "", message: "" });
    } catch (err: any) {
      setError(err.message || "Failed to submit enquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-6 sm:p-8">
      {success ? (
        <div className="text-center py-8 space-y-3">
          <div className="mx-auto w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
            <CheckCircle2 size={28} />
          </div>
          <h3 className="font-bold text-lg text-slate-800">Enquiry Submitted!</h3>
          <p className="text-slate-500 text-sm max-w-xs mx-auto leading-relaxed">
            Thank you for contacting DreamSpace Realties. Our property expert will call you back shortly.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="mt-4 text-xs font-semibold text-[#2E3B26] hover:underline"
          >
            Send another enquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <h3 className="font-bold text-lg text-slate-800">Connect With Us</h3>
            <p className="text-slate-500 text-xs leading-normal">
              Fill out the form below and our relationship manager will call you within 15 minutes.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-700 text-xs p-3 rounded-md flex items-center gap-2 border border-red-100">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-3.5">
            <div>
              <label htmlFor="name" className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#2E3B26] focus:bg-white transition-all"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-1.5">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter 10-digit mobile number"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#2E3B26] focus:bg-white transition-all"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-1.5">
                Email Address (Optional)
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#2E3B26] focus:bg-white transition-all"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-1.5">
                Message / Requirement Details
              </label>
              <textarea
                id="message"
                name="message"
                rows={3}
                value={formData.message}
                onChange={handleChange}
                placeholder="Share any specific requirements (e.g. plot size, budget, site visit request)"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#2E3B26] focus:bg-white transition-all resize-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2E3B26] hover:bg-[#3f5235] disabled:bg-slate-400 text-white font-bold py-3 rounded-lg text-xs uppercase tracking-wider shadow transition-all duration-300 flex items-center justify-center gap-2 mt-2"
          >
            {loading ? "Submitting..." : "Send Request"}
            <Send size={12} />
          </button>
        </form>
      )}
    </div>
  );
}
