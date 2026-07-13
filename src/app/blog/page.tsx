import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { getBlogPosts } from "@/lib/db";
import { ArrowLeft, BookOpen, User, Calendar, Clock, ChevronRight } from "lucide-react";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Real Estate Blog & Guides Jamshedpur | DreamSpace Realties",
  description: "Read the latest property market trends, area reviews, investment guides, and RERA verification instructions for Jamshedpur real estate.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const publishedPosts = posts.filter((p) => p.publishStatus === "published");

  return (
    <div className="min-h-screen bg-[#faf9f6] text-slate-800 flex flex-col justify-between font-sans">
      
      {/* Premium Header Hero */}
      <header className="bg-[#2E3B26] text-white py-14 sm:py-20 relative overflow-hidden">
        {/* Subtle Decorative Elements */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C0A060_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none"></div>
        <div className="absolute -right-32 -bottom-32 w-96 h-96 bg-[#C0A060]/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col gap-4 max-w-3xl">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C0A060] hover:text-white transition-colors group mb-2 self-start"
            >
              <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Link>
            <h1 className="font-glacial font-bold text-3xl sm:text-5xl tracking-tight leading-tight">
              DreamSpace <span className="text-[#C0A060]">Insights</span>
            </h1>
            <p className="text-slate-300 font-sans-montserrat text-sm sm:text-base leading-relaxed font-light">
              Your ultimate guide to buying residential layouts, villa plots, and gated community properties in Jamshedpur. Read our expert analysis, legal verification guides, and area growth reports.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {publishedPosts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-100 shadow-sm max-w-xl mx-auto space-y-4">
            <BookOpen size={48} className="mx-auto text-slate-300" />
            <h2 className="font-glacial font-bold text-xl text-[#2E3B26]">No Articles Found</h2>
            <p className="text-slate-500 text-sm">We are currently drafting premium guides. Please check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {publishedPosts.map((post) => (
              <article key={post.slug} className="bg-white rounded-xl overflow-hidden border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full group hover:-translate-y-1">
                {/* Card Details Body */}
                <div className="p-6 flex flex-col flex-grow justify-between gap-5">
                  <div className="space-y-3">
                    {/* Category & Metadata line */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider font-sans-montserrat">
                      <span className="bg-[#2E3B26] text-white text-[9px] font-extrabold px-2.5 py-0.5 rounded shadow-sm">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <User size={12} className="text-[#C0A060]" />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={12} className="text-[#C0A060]" />
                        {post.date}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="font-glacial font-bold text-lg sm:text-xl text-[#2E3B26] leading-snug group-hover:text-[#C0A060] transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans-montserrat font-normal line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Read More Link */}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#2E3B26] group-hover:text-[#C0A060] transition-colors border-t border-slate-100 pt-4 mt-1"
                  >
                    Read Full Article
                    <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* Simple Blog Footer */}
      <footer className="bg-[#2E3B26] text-white py-8 border-t border-white/5 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2">
          <p>© {new Date().getFullYear()} DreamSpace Realties. All rights reserved.</p>
          <p>Read expert insights on plotting developments in Mango, Dimna, Pardih, Sakchi, and Bistupur Jamshedpur.</p>
        </div>
      </footer>

    </div>
  );
}
