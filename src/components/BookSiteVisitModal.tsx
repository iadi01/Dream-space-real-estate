"use client";

import React, { useState } from "react";
import { X, Calendar, Clock, CheckCircle2, AlertCircle } from "lucide-react";

interface BookSiteVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
}

export default function BookSiteVisitModal({
  isOpen,
  onClose,
  projectName,
}: BookSiteVisitModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.date) {
      setError("Name, Phone, and Preferred Date are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const message = `Site Visit Request for ${projectName} on ${formData.date} at ${formData.time || "any time"}.`;
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          project: projectName,
          message,
          source: "Book Site Visit Modal",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit request.");
      }

      setSuccess(true);
      setFormData({ name: "", phone: "", email: "", date: "", time: "" });
    } catch (err: any) {
      setError(err.message || "Failed to book site visit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-100 animate-in fade-in zoom-in duration-300">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-full transition-colors z-10"
        >
          <X size={20} />
        </button>

        {success ? (
          <div className="p-8 text-center space-y-4">
            <div className="mx-auto w-14 h-14 bg-green-50 text-green-600 rounded-full flex items-center justify-center shadow-inner">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="font-bold text-xl text-slate-800">Site Visit Requested!</h3>
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm mx-auto">
              We have received your site visit booking for <strong className="text-slate-800">{projectName}</strong>. Our logistics executive will call you to arrange a free pick-up and drop-off facility.
            </p>
            <button
              onClick={() => {
                setSuccess(false);
                onClose();
              }}
              className="w-full bg-[#2E3B26] hover:bg-[#3f5235] text-white font-bold py-3 rounded-lg text-xs uppercase tracking-wider shadow transition-colors mt-2"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
            <div>
              <span className="text-[#C0A060] text-[10px] font-bold uppercase tracking-widest block mb-1">Interactive Scheduler</span>
              <h3 className="font-extrabold text-xl text-slate-800">Book Free Site Visit</h3>
              <p className="text-slate-500 text-xs mt-1">
                Schedule a site visit for <strong className="text-slate-700">{projectName}</strong>. We provide free pick-up and drop from your location.
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
                <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-1.5">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-[#2E3B26] focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-1.5">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter 10-digit phone number"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-[#2E3B26] focus:bg-white transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Calendar size={12} className="text-[#C0A060]" /> Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-[#2E3B26] focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Clock size={12} className="text-[#C0A060]" /> Time Slot
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-[#2E3B26] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-1.5">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-[#2E3B26] focus:bg-white transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2E3B26] hover:bg-[#3f5235] disabled:bg-slate-400 text-white font-bold py-3.5 rounded-lg text-xs uppercase tracking-wider shadow transition-colors mt-2"
            >
              {loading ? "Scheduling..." : "Schedule Site Visit"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
