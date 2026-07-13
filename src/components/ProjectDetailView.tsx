"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Tag,
  Maximize,
  Compass,
  FileText,
  Calendar,
  ChevronDown,
  ChevronUp,
  Phone,
  MessageSquare,
  Award,
  ArrowLeft,
  Grid,
  CheckCircle2,
  FileSpreadsheet,
  X,
} from "lucide-react";
import { ProjectItem } from "@/lib/db";
import BookSiteVisitModal from "./BookSiteVisitModal";
import ContactForm from "./ContactForm";

interface ProjectDetailViewProps {
  project: ProjectItem;
  relatedProjects: ProjectItem[];
  contact?: {
    whatsapp: string;
    phone: string;
  };
}

export default function ProjectDetailView({
  project,
  relatedProjects,
  contact = { whatsapp: "919876543210", phone: "+91 98765 43210" },
}: ProjectDetailViewProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isSiteVisitOpen, setIsSiteVisitOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleDownloadBrochure = (e: React.MouseEvent) => {
    e.preventDefault();
    alert(`Downloading brochure for ${project.name}... In a production build, this links to the RERA-approved PDF file.`);
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] text-slate-800 font-sans pb-16">
      
      {/* Dynamic Hero Banner */}
      <section className="relative h-[45vh] md:h-[60vh] bg-slate-900 text-white overflow-hidden">
        <Image
          src={project.coverImage}
          alt={project.name}
          fill
          priority
          className="object-cover object-center scale-102 filter brightness-[0.45]"
        />
        
        {/* Floating Header Actions */}
        <div className="absolute top-6 left-0 right-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <Link
              href="/#projects"
              className="flex items-center gap-2 text-white bg-black/30 hover:bg-black/50 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-sm transition-all"
            >
              <ArrowLeft size={14} /> Back to Projects
            </Link>
            
            <span className="bg-[#C0A060] text-white text-xs font-bold px-3.5 py-1.5 rounded shadow-lg uppercase tracking-wider">
              {project.status}
            </span>
          </div>
        </div>

        {/* Content Box */}
        <div className="absolute inset-x-0 bottom-0 py-10 bg-gradient-to-t from-black/85 via-black/40 to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest">
                <Compass size={14} /> Gated Plotted Community
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
                {project.name}
              </h1>
              <div className="flex items-center gap-2 text-slate-200 text-xs sm:text-sm font-medium">
                <MapPin size={16} className="text-[#C0A060]" />
                <span>{project.address}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Overview Strip */}
      <section className="bg-white border-y border-slate-100 shadow-sm py-6 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 text-center md:text-left">
            <div>
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Starting Price</span>
              <span className="text-[#2E3B26] text-lg font-extrabold block mt-0.5">₹{project.startingPrice}</span>
            </div>
            <div className="border-l-0 md:border-l border-slate-100 md:pl-6">
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Plot Sizes</span>
              <span className="text-[#2E3B26] text-lg font-extrabold block mt-0.5">{project.plotSizes}</span>
            </div>
            <div className="border-l border-slate-100 pl-6">
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Project Status</span>
              <span className="text-green-700 text-base font-extrabold block mt-0.5">{project.status}</span>
            </div>
            <div className="border-l-0 md:border-l border-slate-100 md:pl-6">
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">RERA Registered</span>
              <span className="text-[#2E3B26] text-xs font-semibold block mt-1 truncate" title={project.reraNumber}>
                {project.reraNumber ? "Yes (Click for info)" : "Under Process"}
              </span>
            </div>
            <div className="border-l border-slate-100 pl-6 hidden lg:block col-span-2">
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Developer</span>
              <span className="text-slate-700 text-sm font-semibold block mt-1">{project.developer}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Details Body Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Details Content */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Gallery Section */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 space-y-4">
              <h3 className="font-extrabold text-lg text-slate-800 flex items-center gap-2">
                <Grid size={18} className="text-[#C0A060]" /> Gallery & Site Layout
              </h3>
              
              {/* Main Active Image with click-to-lightbox */}
              <div 
                className="relative aspect-[16/9] w-full rounded-lg overflow-hidden bg-slate-100 group cursor-zoom-in"
                onClick={() => setIsLightboxOpen(true)}
              >
                <Image
                  src={project.galleryImages[activeImageIndex] || project.coverImage}
                  alt={`${project.name} Site View`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-101"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-black/70 text-white text-xs font-bold uppercase tracking-widest px-4 py-2.5 rounded-full flex items-center gap-1.5 shadow-lg">
                    <Maximize size={14} /> View Lightbox
                  </span>
                </div>
              </div>

              {/* Thumbnail strip */}
              {project.galleryImages.length > 1 && (
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 pt-2">
                  {project.galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative aspect-[4/3] rounded-md overflow-hidden border-2 transition-all ${
                        activeImageIndex === idx ? "border-[#C0A060] scale-102 shadow-md" : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Overview & Highlights */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 sm:p-8 space-y-6">
              <div className="space-y-3">
                <h3 className="font-extrabold text-xl text-slate-800">Project Overview</h3>
                <div className="h-1 w-16 bg-[#C0A060] rounded-full"></div>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {project.description}
                </p>
              </div>

              {project.highlights && project.highlights.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h4 className="font-extrabold text-sm uppercase tracking-wider text-[#2E3B26]">Key Project Highlights</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-600 text-sm">
                    {project.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 size={16} className="text-[#C0A060] mt-0.5 flex-shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Amenities Grid */}
            {project.amenities && project.amenities.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 sm:p-8 space-y-5">
                <h3 className="font-extrabold text-lg text-slate-800">World Class Amenities</h3>
                <div className="h-1 w-16 bg-[#C0A060] rounded-full"></div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 pt-2">
                  {project.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-[#2E3B26]/5 text-[#2E3B26] flex items-center justify-center flex-shrink-0">
                        <Award size={16} className="text-[#C0A060]" />
                      </div>
                      <span className="text-slate-700 text-xs sm:text-sm font-semibold tracking-tight leading-snug">
                        {amenity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Layout Master Plan & Plotting Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 sm:p-8 space-y-6">
              <h3 className="font-extrabold text-lg text-slate-800">Layout Master Plan</h3>
              <div className="h-1 w-16 bg-[#C0A060] rounded-full"></div>
              
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                RERA-approved master plan layout featuring demarcated residential plots, wider access paths, civic amenities zone, overhead water storage, parks, and play structures.
              </p>
              
              <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden border border-slate-100 shadow bg-slate-50 group">
                <Image
                  src={project.masterPlanUrl || "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=1200&q=80"}
                  alt={`${project.name} Master Plan`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Location Advantages & Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Location Advantages */}
              {project.locationAdvantages && project.locationAdvantages.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 space-y-4">
                  <h4 className="font-extrabold text-base text-slate-800">Location Advantages</h4>
                  <div className="h-0.5 w-12 bg-[#C0A060]"></div>
                  <ul className="space-y-3.5 pt-2 text-slate-600 text-xs sm:text-sm">
                    {project.locationAdvantages.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 leading-snug">
                        <span className="w-5 h-5 rounded-full bg-[#C0A060]/10 text-[#C0A060] flex items-center justify-center font-bold text-[10px] mt-0.5 flex-shrink-0">
                          {idx + 1}
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Timeline Info */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 space-y-4">
                <h4 className="font-extrabold text-base text-slate-800">Development Timeline</h4>
                <div className="h-0.5 w-12 bg-[#C0A060]"></div>
                
                <div className="space-y-5 pt-2 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                  <div className="flex items-start gap-4 relative">
                    <div className="w-4 h-4 rounded-full border-4 border-[#2E3B26] bg-white z-10 mt-1 flex-shrink-0" />
                    <div>
                      <h5 className="font-bold text-xs text-slate-700">Phase 1: Roads & Underground Cabling</h5>
                      <p className="text-[11px] text-green-600 font-semibold uppercase mt-0.5">Completed</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 relative">
                    <div className="w-4 h-4 rounded-full border-4 border-[#C0A060] bg-white z-10 mt-1 flex-shrink-0" />
                    <div>
                      <h5 className="font-bold text-xs text-slate-700">Phase 2: Water Pipelines & Sewage STP</h5>
                      <p className="text-[11px] text-amber-600 font-semibold uppercase mt-0.5">In Progress</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 relative">
                    <div className="w-4 h-4 rounded-full border-4 border-slate-200 bg-white z-10 mt-1 flex-shrink-0" />
                    <div>
                      <h5 className="font-bold text-xs text-slate-400">Phase 3: Club House & Grand Arch</h5>
                      <p className="text-[11px] text-slate-400 font-semibold uppercase mt-0.5">Scheduled Q3 2026</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Document Downloads (PDF Downloads) */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 sm:p-8 space-y-4">
              <h3 className="font-extrabold text-lg text-slate-800">Approved Documentation</h3>
              <div className="h-1 w-16 bg-[#C0A060] rounded-full"></div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <button
                  onClick={handleDownloadBrochure}
                  className="flex items-center justify-between p-4 border border-slate-100 hover:border-slate-200 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-50 text-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText size={20} />
                    </div>
                    <div>
                      <span className="font-bold text-slate-700 text-xs sm:text-sm block">Project Brochure</span>
                      <span className="text-slate-400 text-[10px] block mt-0.5">PDF Document • 4.2 MB</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#2E3B26] hover:underline uppercase tracking-wider">Download</span>
                </button>

                <button
                  onClick={handleDownloadBrochure}
                  className="flex items-center justify-between p-4 border border-slate-100 hover:border-slate-200 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileSpreadsheet size={20} />
                    </div>
                    <div>
                      <span className="font-bold text-slate-700 text-xs sm:text-sm block">NOC & RERA Approvals</span>
                      <span className="text-slate-400 text-[10px] block mt-0.5">ZIP Archive • 12.8 MB</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#2E3B26] hover:underline uppercase tracking-wider">Download</span>
                </button>
              </div>
            </div>

            {/* FAQ Accordion */}
            {project.faqs && project.faqs.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 sm:p-8 space-y-5">
                <h3 className="font-extrabold text-lg text-slate-800">Frequently Asked Questions</h3>
                <div className="h-1 w-16 bg-[#C0A060] rounded-full"></div>
                
                <div className="space-y-3.5 pt-2">
                  {project.faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      className="border border-slate-100 rounded-lg overflow-hidden transition-all bg-white"
                    >
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full px-5 py-4 flex items-center justify-between text-left font-bold text-xs sm:text-sm text-slate-800 hover:bg-slate-50 transition-colors focus:outline-none"
                      >
                        <span>{faq.question}</span>
                        {openFaqIndex === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                      
                      {openFaqIndex === idx && (
                        <div className="px-5 pb-5 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-50">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Map Location Embed */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 sm:p-8 space-y-5">
              <h3 className="font-extrabold text-lg text-slate-800 flex items-center gap-2">
                <MapPin size={18} className="text-[#C0A060]" /> Location Coordinates
              </h3>
              <div className="h-1 w-16 bg-[#C0A060] rounded-full"></div>
              
              <div className="w-full h-[320px] rounded-lg overflow-hidden border border-slate-100 shadow-inner relative bg-slate-50">
                <iframe
                  title="Project Google Map Coordinate location"
                  src={project.googleMapEmbedUrl}
                  className="w-full h-full border-0 absolute inset-0"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>

          </div>

          {/* Right Column: Lead Form & Actions */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            
            {/* Quick Actions Panel */}
            <div className="bg-[#2E3B26] rounded-xl shadow-lg p-6 text-white space-y-5">
              <h4 className="font-bold text-base border-b border-white/10 pb-3">Site Visit Logistics</h4>
              <p className="text-slate-200 text-xs leading-normal">
                Register to arrange a free pick-up and drop-off facility. Our corporate vehicle coordinates site visits from your location.
              </p>
              
              <button
                onClick={() => setIsSiteVisitOpen(true)}
                className="w-full bg-[#C0A060] hover:bg-[#b09050] text-white py-3 rounded-lg text-center font-bold text-xs uppercase tracking-wider shadow transition-colors block"
              >
                Book Free Site Visit
              </button>

              <div className="flex flex-col gap-2 pt-2 text-center text-xs">
                <a
                  href={`https://wa.me/${contact.whatsapp}?text=Hi,%20I'm%20interested%20in%20${project.name}.%20Please%20send%20details.`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-[#25d366]/10 hover:bg-[#25d366]/20 border border-[#25d366]/40 text-[#25d366] py-2.5 rounded-lg font-bold flex items-center justify-center gap-2 transition-all"
                >
                  <MessageSquare size={14} /> WhatsApp Chat
                </a>
                <a
                  href={`tel:${contact.phone}`}
                  className="w-full bg-white/5 hover:bg-white/10 border border-white/20 text-white py-2.5 rounded-lg font-bold flex items-center justify-center gap-2 transition-all"
                >
                  <Phone size={14} /> Call Relationship Manager
                </a>
              </div>
            </div>

            {/* Sticky Lead Form */}
            <ContactForm projectName={project.name} sourceName={`Project Details Page - ${project.name}`} />

          </div>

        </div>
      </section>

      {/* Related Projects Grid */}
      {relatedProjects.length > 0 && (
        <section className="bg-white border-t border-slate-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
            <div className="space-y-2 flex flex-col items-center">
              <h3 className="font-extrabold text-2xl text-slate-800">Related Projects</h3>
              <div className="h-1 w-16 bg-[#C0A060] rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {relatedProjects.slice(0, 3).map((item) => (
                <div
                  key={item.slug}
                  className="bg-[#faf9f6] rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-slate-100 flex flex-col justify-between group transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div>
                    <div className="bg-[#2E3B26] text-white text-center py-2.5 px-4 font-bold text-xs uppercase tracking-wider">
                      {item.name}
                    </div>
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                      <Image src={item.coverImage} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="p-4 space-y-2">
                      <p className="text-slate-600 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                        {item.shortDescription}
                      </p>
                      <div className="flex items-center gap-1.5 text-slate-400 text-[11px] pt-1">
                        <MapPin size={12} className="text-[#C0A060]" />
                        <span className="truncate">{item.address}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 pt-0">
                    <Link
                      href={`/projects/${item.slug}`}
                      className="w-full bg-[#2E3B26] hover:bg-[#3f5235] text-white py-2.5 rounded-lg text-center font-bold text-xs uppercase tracking-wider shadow block transition-colors"
                    >
                      Explore Project
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Book Site Visit Modal */}
      <BookSiteVisitModal
        isOpen={isSiteVisitOpen}
        onClose={() => setIsSiteVisitOpen(false)}
        projectName={project.name}
      />

      {/* Interactive Lightbox Slider Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex flex-col justify-between p-4">
          <div className="flex items-center justify-between text-white py-2 px-4">
            <span className="font-bold text-xs uppercase tracking-wider">{project.name} Image Lightbox</span>
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="p-2 text-slate-400 hover:text-white bg-white/5 rounded-full"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="relative w-full max-w-4xl h-[70vh] mx-auto overflow-hidden rounded-lg">
            <Image
              src={project.galleryImages[activeImageIndex] || project.coverImage}
              alt="Lightbox View"
              fill
              className="object-contain"
            />
          </div>

          <div className="max-w-md mx-auto py-4">
            <div className="flex justify-center items-center gap-2.5 flex-wrap">
              {project.galleryImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-3.5 h-3.5 rounded-full border-2 transition-all ${
                    activeImageIndex === idx ? "bg-[#C0A060] border-[#C0A060]" : "bg-white/20 border-transparent hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
