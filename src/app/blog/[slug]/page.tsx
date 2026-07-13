import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/db";
import { ArrowLeft, User, Calendar, Clock, BookOpen } from "lucide-react";
import ShareButton from "@/components/ShareButton";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const revalidate = 0;

// Dynamic SEO Optimization
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getBlogPostBySlug(resolvedParams.slug);

  if (!post) {
    return {
      title: "Article Not Found | DreamSpace Realties",
      description: "The requested article could not be found.",
    };
  }

  return {
    title: `${post.title} | Jamshedpur Real Estate Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage }],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  const post = await getBlogPostBySlug(resolvedParams.slug);

  if (!post || post.publishStatus !== "published") {
    notFound();
  }

  const allPosts = await getBlogPosts();
  const recentPosts = allPosts
    .filter((p) => p.slug !== post.slug && p.publishStatus === "published")
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#faf9f6] text-slate-800 flex flex-col justify-between font-sans">
      
      {/* Header Bar */}
      <header className="bg-[#2E3B26] text-white py-4 border-b border-white/5 sticky top-0 z-40 backdrop-blur-md bg-[#2E3B26]/95">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
          <Link href="/blog" className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C0A060] hover:text-white transition-colors group">
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            Back to Blog
          </Link>
          <Link href="/" className="font-glacial font-bold text-sm tracking-widest text-[#C0A060]">
            DREAMSPACE REALITIES
          </Link>
        </div>
      </header>

      {/* Article Body Container */}
      <main className="flex-grow max-w-4xl w-full mx-auto px-4 py-8 sm:py-12">
        <article className="bg-white rounded-2xl border border-slate-100 shadow-md overflow-hidden p-6 sm:p-10 space-y-6 sm:space-y-8">
          
          {/* Header Metadata */}
          <div className="space-y-4">
            <span className="inline-block bg-[#2E3B26]/5 text-[#2E3B26] text-[10px] font-extrabold px-3 py-1 rounded uppercase tracking-wider border border-[#2E3B26]/10">
              {post.category}
            </span>
            <h1 className="font-glacial font-bold text-2xl sm:text-4xl text-[#2E3B26] leading-tight tracking-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-500 font-sans-montserrat border-y border-slate-100 py-3.5">
              <span className="flex items-center gap-1.5">
                <User size={14} className="text-[#C0A060]" />
                By {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={14} className="text-[#C0A060]" />
                Published {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} className="text-[#C0A060]" />
                {post.readTime}
              </span>
            </div>
          </div>



          {/* Dynamic HTML Content Render */}
          <div 
            className="prose max-w-none text-slate-600 text-sm sm:text-base leading-relaxed font-sans-montserrat font-normal space-y-6
              prose-headings:font-glacial prose-headings:font-bold prose-headings:text-[#2E3B26] prose-headings:mt-8 prose-headings:mb-3
              prose-h3:text-lg prose-h3:sm:text-xl
              prose-p:leading-relaxed prose-p:mb-5
              prose-strong:text-[#2E3B26] prose-strong:font-bold
              prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2 prose-ul:mb-5
              prose-li:text-slate-600"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

        </article>

        {/* Share CTA Widget */}
        <div className="mt-8 bg-white border border-slate-100 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-sm">
          <div className="space-y-1">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#2E3B26]">Share this Guide</h4>
            <p className="text-slate-500 text-xs">Spread the word about smart property investment in Jamshedpur.</p>
          </div>
          <ShareButton />
        </div>

        {/* Recent Articles Section */}
        {recentPosts.length > 0 && (
          <section className="mt-12 sm:mt-16 space-y-6">
            <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
              <h2 className="font-glacial font-bold text-xl sm:text-2xl text-[#2E3B26]">Other Recent Articles</h2>
              <Link href="/blog" className="text-xs font-bold uppercase tracking-wider text-[#C0A060] hover:text-[#2E3B26] transition-colors">
                View All Guides
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {recentPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col gap-3 group">

                  <h3 className="font-glacial font-bold text-sm text-[#2E3B26] leading-snug group-hover:text-[#C0A060] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <span className="text-[10px] text-slate-400 font-bold uppercase font-sans-montserrat">{post.date}</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Simple Footer */}
      <footer className="bg-[#2E3B26] text-white py-8 border-t border-white/5 text-center text-xs text-slate-400 mt-12">
        <p>© {new Date().getFullYear()} DreamSpace Realties. All rights reserved.</p>
      </footer>

    </div>
  );
}
