"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, MessageSquare } from "lucide-react";
import { ContactInfo } from "@/lib/db";

interface NavbarProps {
  contact: ContactInfo;
}

export default function Navbar({ contact }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Determine active section based on scroll position
      const sections = ["home", "about", "services", "projects", "why-choose-us", "contact"];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Home", href: "#home", id: "home" },
    { label: "About us", href: "#about", id: "about" },
    { label: "Services", href: "#services", id: "services" },
    { label: "Our Projects", href: "#projects", id: "projects" },
    { label: "Why Choose us", href: "#why-choose-us", id: "why-choose-us" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md py-3 text-slate-800"
            : "bg-black/10 backdrop-blur-[2px] py-5 text-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="#home" className="flex items-center gap-3 group">
            <div className="flex items-center justify-center">
              <img
                src="/logo.png"
                alt="DreamSpace Realties Logo"
                className={`h-11 w-auto object-contain transition-all duration-300 ${
                  isScrolled ? "" : "brightness-0 invert"
                }`}
              />
            </div>
            <div className="flex flex-col">
              <span className={`font-glacial font-bold text-lg md:text-xl tracking-wider leading-none transition-colors duration-300 ${
                isScrolled ? "text-[#2E3B26]" : "text-white"
              }`}>
                DreamSpace
              </span>
              <span className="font-sans-montserrat text-[9px] md:text-[10px] tracking-[0.2em] font-semibold uppercase leading-none mt-1 text-[#C0A060]">
                Realties
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className={`text-sm font-sans-montserrat font-normal transition-colors hover:text-[#C0A060] relative py-1 ${
                      activeSection === item.id
                        ? "text-[#C0A060]"
                        : isScrolled
                        ? "text-slate-700"
                        : "text-white"
                    }`}
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#C0A060] rounded-full" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="#contact"
              className={`text-sm font-medium px-5 py-2.5 rounded-md transition-all duration-300 ${
                isScrolled
                  ? "bg-[#2E3B26] hover:bg-[#3f5235] text-white shadow"
                  : "bg-white hover:bg-slate-100 text-[#2E3B26] shadow"
              }`}
            >
              Contact us
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-md transition-colors hover:bg-black/5"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div
          className={`absolute top-0 right-0 w-80 h-full bg-white shadow-2xl p-6 transition-transform duration-300 flex flex-col justify-between ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src="/logo.png" alt="DreamSpace Realties Logo" className="h-10 w-auto object-contain" />
                <div className="flex flex-col text-left">
                  <span className="font-glacial font-bold text-base tracking-wider leading-none text-[#2E3B26]">
                    DreamSpace
                  </span>
                  <span className="font-sans-montserrat text-[9px] tracking-[0.2em] font-semibold uppercase leading-none mt-1 text-[#C0A060]">
                    Realties
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-slate-500 hover:text-slate-800"
              >
                <X size={20} />
              </button>
            </div>

            <nav>
              <ul className="flex flex-col gap-4">
                {menuItems.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`text-base font-sans-montserrat font-normal block py-2 transition-colors hover:text-[#C0A060] ${
                        activeSection === item.id ? "text-[#C0A060]" : "text-slate-700"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex flex-col gap-4 border-t border-slate-100 pt-6">
            <Link
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full bg-[#2E3B26] hover:bg-[#3f5235] text-white font-semibold py-3 rounded-md text-center shadow-md transition-colors block"
            >
              Contact us
            </Link>

            {/* Quick Contact Links */}
            <div className="flex items-center justify-around text-slate-500 text-xs mt-2">
              <a href={`tel:${contact.phone}`} className="flex items-center gap-1 hover:text-[#2E3B26]">
                <Phone size={14} /> Call
              </a>
              <a
                href={`https://wa.me/${contact.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 hover:text-green-600 text-green-500 font-medium"
              >
                <MessageSquare size={14} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
