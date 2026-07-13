"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, Keyboard } from "swiper/modules";
import { MapPin, Info, DollarSign, MoveRight } from "lucide-react";
import { ProjectItem } from "@/lib/db";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface ProjectsCarouselProps {
  projects: ProjectItem[];
}

export default function ProjectsCarousel({ projects }: ProjectsCarouselProps) {
  const publishedProjects = projects.filter((p) => p.publishStatus === "published");

  return (
    <div className="w-full relative py-4">
      <Swiper
        modules={[Autoplay, Pagination, Keyboard]}
        spaceBetween={20}
        slidesPerView={1.15}
        loop={true}
        centeredSlides={true}
        speed={800}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        keyboard={{
          enabled: true,
        }}
        pagination={{
          clickable: true,
          el: ".custom-swiper-pagination",
          bulletClass: "custom-bullet",
          bulletActiveClass: "custom-bullet-active",
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
            centeredSlides: false,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 24,
            centeredSlides: false,
          },
          1280: {
            slidesPerView: 3,
            spaceBetween: 24,
            centeredSlides: false,
          },
        }}
        className="w-full !pb-14"
      >
        {publishedProjects.map((project) => (
          <SwiperSlide key={project.slug} className="h-auto">
            <Link
              href={`/projects/${project.slug}`}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl border border-slate-100 hover:border-[#C0A060] overflow-hidden flex flex-col h-full group transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
            >
              {/* Card Banner Name (Screenshot Match) */}
              <div className="bg-[#2E3B26] group-hover:bg-[#3f5235] text-white text-center py-3.5 px-4 font-bold text-sm uppercase tracking-wider transition-colors">
                {project.name}
              </div>

              {/* Cover Image & Badges */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <Image
                  src={project.coverImage || "https://images.unsplash.com/photo-1524813686514-a57563d77965?auto=format&fit=crop&w=600&q=80"}
                  alt={project.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover transition-transform duration-[800ms] group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Status Badge */}
                <span className="absolute top-3 right-3 bg-[#C0A060] text-white text-[10px] font-bold px-2.5 py-1 rounded shadow-md uppercase tracking-wider">
                  {project.status}
                </span>
              </div>

              {/* Card Details Body */}
              <div className="p-5 flex flex-col flex-grow justify-between gap-4">
                <div className="space-y-2">
                  {/* Location */}
                  <div className="flex items-center gap-1.5 text-slate-500 text-xs font-semibold font-sans-montserrat">
                    <MapPin size={14} className="text-[#C0A060] shrink-0" />
                    <span className="truncate">{project.address}</span>
                  </div>

                  {/* Short Description */}
                  <p className="text-slate-600 text-xs sm:text-sm line-clamp-2 leading-relaxed font-sans-montserrat font-normal">
                    {project.shortDescription}
                  </p>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-slate-100 text-xs">
                  <div className="bg-[#2E3B26]/5 group-hover:bg-[#2E3B26]/10 rounded-lg p-2.5 flex flex-col justify-center border border-[#2E3B26]/10 group-hover:border-[#C0A060]/30 transition-all duration-300">
                    <span className="text-[#C0A060] font-bold uppercase tracking-wider text-[8px] mb-0.5">Starting Price</span>
                    <span className="text-[#2E3B26] font-bold text-sm">₹{project.startingPrice}</span>
                  </div>
                  <div className="bg-[#2E3B26]/5 group-hover:bg-[#2E3B26]/10 rounded-lg p-2.5 flex flex-col justify-center border border-[#2E3B26]/10 group-hover:border-[#C0A060]/30 transition-all duration-300">
                    <span className="text-[#C0A060] font-bold uppercase tracking-wider text-[8px] mb-0.5">Plot Sizes</span>
                    <span className="text-[#2E3B26] font-bold text-sm truncate">{project.plotSizes}</span>
                  </div>
                </div>

                {/* CTA Explore Button */}
                <div className="w-full bg-[#2E3B26] group-hover:bg-[#3f5235] text-white py-3 rounded-lg text-center font-bold text-xs uppercase tracking-wider shadow transition-all duration-300 flex items-center justify-center gap-2">
                  Explore Project
                  <MoveRight size={14} className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination Wrapper */}
      <div className="custom-swiper-pagination flex justify-center items-center gap-2 mt-2 w-full"></div>

      {/* Pagination bullet styles inside CSS helper */}
      <style jsx global>{`
        .custom-bullet {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #cbd5e1;
          display: inline-block;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .custom-bullet-active {
          width: 24px;
          background: #2E3B26;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}
