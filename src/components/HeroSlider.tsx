"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { HeroSlide } from "@/lib/db";

interface HeroSliderProps {
  slides: HeroSlide[];
}

export default function HeroSlider({ slides }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play interval
  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // 5 seconds
    return () => clearInterval(interval);
  }, [slides.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  if (!slides || slides.length === 0) return null;

  return (
    <div id="home" className="relative w-full h-[85vh] md:h-[95vh] overflow-hidden bg-slate-900">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          {/* Background Image */}
          <Image
            src={slide.image || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80"}
            alt={slide.title}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover object-center scale-105 transition-transform duration-[5000ms]"
          />
          {/* Dark Overlay for Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent md:from-black/75 z-20" />

          {/* Slide Content */}
          <div className="absolute inset-0 z-30 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-3xl flex flex-col items-start text-left gap-6 md:gap-8">
                {/* Heading */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-glacial font-normal tracking-tight text-white leading-[1.1] animate-fade-in">
                  {slide.title}
                </h1>
                
                {/* Description */}
                <p className="text-sm sm:text-base md:text-lg text-slate-200/90 max-w-2xl leading-relaxed animate-fade-in-delay">
                  {slide.subtitle}
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap gap-4 items-center animate-fade-in-delay-2">
                  {slide.cta1Text && (
                    <Link
                      href={slide.cta1Link}
                      className="bg-[#2E3B26] hover:bg-[#3f5235] text-white px-6 sm:px-8 py-3.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg flex items-center gap-2 group"
                    >
                      {slide.cta1Text}
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  )}
                  {slide.cta2Text && (
                    <Link
                      href={slide.cta2Link}
                      className="bg-transparent hover:bg-white/10 text-white border border-white/60 hover:border-white px-6 sm:px-8 py-3.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all duration-300 backdrop-blur-[2px]"
                    >
                      {slide.cta2Text}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Manual Left/Right Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/25 hover:bg-black/45 text-white border border-white/10 hover:border-white/30 backdrop-blur-sm transition-all duration-300"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/25 hover:bg-black/45 text-white border border-white/10 hover:border-white/30 backdrop-blur-sm transition-all duration-300"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Pagination Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === currentSlide ? "w-8 bg-[#C0A060]" : "w-2.5 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
