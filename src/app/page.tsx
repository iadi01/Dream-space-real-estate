import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone, Mail, Clock, MapPin, CheckCircle } from "lucide-react";

import { readDB } from "@/lib/db";
import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import ProjectsCarousel from "@/components/ProjectsCarousel";
import CityscapeDivider from "@/components/CityscapeDivider";
import ContactForm from "@/components/ContactForm";
import DynamicIcon from "@/components/DynamicIcon";

export const revalidate = 0; // Disable server caching to load live CMS updates

export default async function Home() {
  // Read CMS data directly on server side
  const db = await readDB();
  const { hero, about, statistics, services, projects, values, contact } = db;

  return (
    <div className="min-h-screen bg-[#faf9f6] text-slate-800 font-sans scroll-smooth">
      {/* Floating Navbar */}
      <Navbar contact={contact} />

      {/* Hero Section */}
      <section id="home">
        <HeroSlider slides={hero} />
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-28 bg-white overflow-hidden scroll-mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Text */}
            <div className="space-y-6 md:space-y-8 flex flex-col items-start">
              <div className="space-y-3">
                <span className="text-[#C0A060] font-sans-montserrat font-normal text-xs uppercase tracking-widest block">
                  {about.subtitle || "Your Trusted Property Partner"}
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-glacial font-normal text-[#2E3B26] tracking-tight leading-tight">
                  {about.title}
                </h2>
                <div className="h-1.5 w-20 bg-[#C0A060] rounded-full"></div>
              </div>

              <div className="text-slate-600 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line">
                {about.description}
              </div>

              <Link
                href={about.ctaLink || "#contact"}
                className="bg-[#2E3B26] hover:bg-[#3f5235] text-white px-8 py-3.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md inline-flex items-center gap-2 group"
              >
                {about.ctaText || "Know more"}
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Right Column: Slanted Image Mask (Screenshot Recreation) */}
            <div className="relative w-full h-[350px] sm:h-[450px] lg:h-[500px]">
              {/* Slanted Image Container using SVG clipPath mask */}
              <div 
                className="w-full h-full relative overflow-hidden bg-slate-100 shadow-2xl transition-transform duration-500 hover:scale-[1.01]"
                style={{
                  clipPath: "polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)",
                }}
              >
                <Image
                  src={about.image || "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80"}
                  alt="DreamSpace Realties Plotting Development Site Drone View"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 600px"
                  priority
                />
              </div>
              {/* Gold Accent Outline Frame */}
              <div 
                className="absolute inset-0 border-[3px] border-[#C0A060]/30 -translate-x-3 translate-y-3 -z-10"
                style={{
                  clipPath: "polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)",
                }}
              />
            </div>

          </div>
        </div>
      </section>

      {/* Statistics Banner */}
      <section className="bg-[#2E3B26] py-10 text-white relative z-10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x-0 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {statistics.map((stat) => (
              <div key={stat.id} className="flex flex-col items-center justify-center p-2 space-y-1">
                <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#C0A060] tracking-tight">
                  {stat.value}
                </span>
                <span className="text-[11px] sm:text-xs text-slate-300 font-semibold uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 md:py-28 bg-[#faf9f6] scroll-mt-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Heading and CTA */}
            <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6 md:space-y-8">
              <div className="space-y-3">
                <span className="text-[#C0A060] font-sans-montserrat font-normal text-xs uppercase tracking-widest block">
                  Our Services
                </span>
                <h2 className="text-3xl sm:text-4xl font-glacial font-normal text-[#2E3B26] tracking-tight leading-tight">
                  Services We Offer to Make Your Property Journey Easy
                </h2>
                <div className="h-1.5 w-16 bg-[#C0A060] rounded-full"></div>
              </div>

              <Link
                href="#contact"
                className="bg-[#2E3B26] hover:bg-[#3f5235] text-white px-8 py-3.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md inline-flex items-center gap-2 group"
              >
                Get In Touch
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Right Column: 6-Card Grid */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {services
                .sort((a, b) => a.displayOrder - b.displayOrder)
                .map((service) => (
                  <div
                    key={service.id}
                    className="bg-white p-6 rounded-xl border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-4 text-left group hover:-translate-y-1"
                  >
                    <div className="w-12 h-12 rounded-lg bg-[#2E3B26]/5 text-[#2E3B26] group-hover:bg-[#2E3B26] group-hover:text-white transition-all duration-300 flex items-center justify-center">
                      <DynamicIcon name={service.iconName} size={22} />
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="font-glacial font-bold text-sm sm:text-base text-slate-800 tracking-tight">
                        {service.title}
                      </h4>
                      <p className="font-sans-montserrat font-normal text-slate-500 text-xs sm:text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                ))}
            </div>

          </div>
        </div>

        {/* Skyline Divider bottom transition to White Background */}
        <div className="absolute bottom-0 left-0 w-full translate-y-1 z-20">
          <CityscapeDivider fillColor="fill-white" />
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 md:py-28 bg-white scroll-mt-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Heading and CTA */}
            <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6 md:space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="space-y-3 w-full">
                <span className="text-[#C0A060] font-sans-montserrat font-normal text-xs uppercase tracking-widest block">
                  Our Projects
                </span>
                <h2 className="text-3xl sm:text-4xl font-glacial font-normal text-[#2E3B26] tracking-tight leading-tight">
                  Explore Premium Plotted Developments
                </h2>
                <div className="h-1.5 w-16 bg-[#C0A060] rounded-full mx-auto lg:mx-0"></div>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed pt-2">
                  Browse verified residential layouts in hot growth corridors. We offer ready-to-construct villa plots with luxury amenities, wide roads, and bank approvals.
                </p>
              </div>

              <Link
                href="#contact"
                className="bg-[#2E3B26] hover:bg-[#3f5235] text-white px-8 py-3.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md inline-flex items-center gap-2 group w-full sm:w-auto justify-center"
              >
                View All Projects
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Right Column: Swiper Carousel */}
            <div className="lg:col-span-8 w-full min-w-0">
              <ProjectsCarousel projects={projects} />
            </div>

          </div>
        </div>

        {/* Skyline Divider bottom transition to Off-White Background */}
        <div className="absolute bottom-0 left-0 w-full translate-y-1 z-20">
          <CityscapeDivider fillColor="fill-[#faf9f6]" />
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose-us" className="py-20 md:py-28 bg-[#faf9f6] scroll-mt-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Header Title (Centered screenshot recreation) */}
          <div className="max-w-xl mx-auto space-y-4 mb-16 flex flex-col items-center">
            <span className="text-[#C0A060] font-sans-montserrat font-normal text-xs uppercase tracking-widest block">
              — Why —
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-glacial font-normal text-[#2E3B26] tracking-tight">
              Choose us ?
            </h2>
            <div className="h-1 w-20 bg-[#C0A060] rounded-full"></div>
            <p className="text-slate-500 text-xs sm:text-sm leading-normal max-w-md">
              We are committed to providing you the best real estate experience through our values and experts.
            </p>
          </div>

          {/* 4-Column Value Proposition */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((item) => (
              <div
                key={item.id}
                className="bg-white p-7 rounded-xl border border-slate-100 hover:border-[#C0A060] shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col items-center text-center gap-5 hover:-translate-y-2 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2E3B26] to-[#455A38] text-[#C0A060] flex items-center justify-center font-bold text-sm shadow-md transition-transform duration-500 group-hover:rotate-[360deg]">
                  <CheckCircle size={24} className="text-[#C0A060]" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-glacial font-bold text-sm sm:text-base text-slate-800 tracking-tight leading-tight group-hover:text-[#2E3B26] transition-colors">
                    {item.title}
                  </h4>
                  <p className="font-sans-montserrat font-normal text-slate-500 text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Skyline Divider bottom transition to White Contact Background */}
        <div className="absolute bottom-0 left-0 w-full translate-y-1 z-20">
          <CityscapeDivider fillColor="fill-white" />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-28 bg-white scroll-mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Contact info */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <span className="text-[#C0A060] font-bold text-xs uppercase tracking-widest block">
                  Reach Out
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2E3B26] tracking-tight">
                  Contact DreamSpace Realties
                </h2>
                <div className="h-1.5 w-16 bg-[#C0A060] rounded-full"></div>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed pt-2">
                  Have questions about RERA registration, bank loans, or plot bookings? Leave a message or contact us directly. Our sales office is open 6 days a week.
                </p>
              </div>

              {/* Direct Info List */}
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#2E3B26]/5 text-[#2E3B26] rounded-lg mt-0.5">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs uppercase text-slate-400 tracking-wider">Phone / WhatsApp</h5>
                    <a href={`tel:${contact.phone}`} className="text-slate-800 text-sm sm:text-base font-semibold hover:text-[#C0A060]">
                      {contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#2E3B26]/5 text-[#2E3B26] rounded-lg mt-0.5">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs uppercase text-slate-400 tracking-wider">Email Address</h5>
                    <a href={`mailto:${contact.email}`} className="text-slate-800 text-sm sm:text-base font-semibold hover:text-[#C0A060]">
                      {contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#2E3B26]/5 text-[#2E3B26] rounded-lg mt-0.5">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs uppercase text-slate-400 tracking-wider">Office Address</h5>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-sm">
                      {contact.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#2E3B26]/5 text-[#2E3B26] rounded-lg mt-0.5">
                    <Clock size={18} />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs uppercase text-slate-400 tracking-wider">Working Hours</h5>
                    <p className="text-slate-600 text-xs sm:text-sm">
                      {contact.workingHours}
                    </p>
                  </div>
                </div>
              </div>

              {/* Google Maps Embed iframe */}
              <div className="w-full h-[220px] rounded-xl overflow-hidden border border-slate-100 shadow-sm relative bg-slate-50">
                <iframe
                  title="Office Location Map"
                  src={contact.googleMapsLink.startsWith("http") ? contact.googleMapsLink : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1944111.4589998634!2d77.34005085449767!3d12.9815987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8513e4cfc!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"}
                  className="w-full h-full border-0 absolute inset-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            {/* Right Column: Contact form */}
            <div className="lg:col-span-7">
              <ContactForm projectName="General Website Inquiry" sourceName="Homepage Contact Section" />
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2E3B26] text-white py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-8">
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2 animate-fade-in">
                <img
                  src="/logo.png"
                  alt="DreamSpace Realties Logo"
                  className="h-12 w-auto object-contain brightness-0 invert"
                />
              </div>
              <p className="text-slate-300 text-xs leading-relaxed max-w-sm">
                DreamSpace Realties is a premier property advisory firm specialized in offering premium residential layouts, villa plots, and gated community properties with clear titles, full infrastructure, and high growth prospects.
              </p>
            </div>
            
            <div className="md:col-span-3 space-y-3">
              <h5 className="font-bold text-xs uppercase tracking-wider text-[#C0A060]">Quick Links</h5>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li><Link href="#home" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link href="#about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="#services" className="hover:text-white transition-colors">Our Services</Link></li>
                <li><Link href="#projects" className="hover:text-white transition-colors">Featured Projects</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors text-amber-100 font-semibold">Our Blog & Articles ↗</Link></li>
                <li><Link href="/admin" className="hover:text-white transition-colors text-amber-300 font-semibold">Admin CMS Panel ↗</Link></li>
              </ul>
            </div>

            <div className="md:col-span-4 space-y-3">
              <h5 className="font-bold text-xs uppercase tracking-wider text-[#C0A060]">Follow Us</h5>
              <div className="flex items-center gap-3">
                {contact.socialFacebook && (
                  <a href={contact.socialFacebook} className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors" aria-label="Facebook">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                    </svg>
                  </a>
                )}
                {contact.socialTwitter && (
                  <a href={contact.socialTwitter} className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors" aria-label="Twitter">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                )}
                {contact.socialLinkedin && (
                  <a href={contact.socialLinkedin} className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors" aria-label="LinkedIn">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                    </svg>
                  </a>
                )}
                {contact.socialInstagram && (
                  <a href={contact.socialInstagram} className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors" aria-label="Instagram">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 text-center text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>© {new Date().getFullYear()} DreamSpace Realties. All rights reserved.</p>
            <p>Designed with ❤️ for premium real estate. All plot properties are RERA registered.</p>
          </div>
        </div>
      </footer>

      {/* Sticky Quick Contact Float at bottom right */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        {/* Call Link */}
        <a
          href={`tel:${contact.phone}`}
          className="w-12 h-12 rounded-full bg-slate-800 text-white shadow-lg hover:bg-slate-700 flex items-center justify-center transition-all duration-300 transform hover:scale-110 border border-slate-700"
          title="Call Us"
        >
          <Phone size={20} />
        </a>
        {/* WhatsApp Link */}
        <a
          href={`https://wa.me/${contact.whatsapp}?text=Hi,%20I'm%20interested%20in%20your%20properties.%20Please%20send%20details.`}
          target="_blank"
          rel="noreferrer"
          className="w-12 h-12 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 flex items-center justify-center transition-all duration-300 transform hover:scale-110"
          title="Chat on WhatsApp"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.982L2 22l5.202-1.362a9.923 9.923 0 0 0 4.808 1.239h.005c5.507 0 9.99-4.478 9.99-9.985 0-2.667-1.039-5.176-2.927-7.064A9.903 9.903 0 0 0 12.012 2zm5.823 14.152c-.255.718-1.488 1.401-2.046 1.48-.521.074-1.2.1-3.486-.848-2.921-1.213-4.805-4.186-4.95-4.379-.146-.192-1.185-1.575-1.185-3.003 0-1.428.749-2.128 1.015-2.408.267-.28.583-.351.777-.351.194 0 .389.001.558.009.178.008.417-.074.654.496.242.583.829 2.023.901 2.169.073.146.121.316.024.51-.097.194-.146.316-.291.486-.146.17-.306.379-.437.51-.146.145-.3.303-.13.593.17.29.754 1.242 1.621 2.016.924.825 1.701 1.078 2.004 1.229.303.151.48.127.662-.084.182-.211.777-.903.983-1.213.206-.31.413-.26.697-.156.285.105 1.808.852 2.117.997.309.146.516.217.59.345.074.127.074.739-.181 1.457z"/>
          </svg>
        </a>
      </div>

    </div>
  );
}
