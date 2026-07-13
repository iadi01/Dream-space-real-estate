import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getProjectBySlug, getProjects, readDB } from "@/lib/db";
import ProjectDetailView from "@/components/ProjectDetailView";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const revalidate = 0; // Disable caching to fetch live CMS modifications

// Dynamic Metadata for SEO Optimization
export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const project = await getProjectBySlug(resolvedParams.slug);

  if (!project) {
    return {
      title: "Project Not Found | DreamSpace Realties",
      description: "The requested plotting project could not be found.",
    };
  }

  return {
    title: project.seoTitle || `${project.name} | DreamSpace Realties`,
    description: project.seoDescription || project.shortDescription,
    openGraph: {
      title: project.seoTitle || `${project.name} | DreamSpace Realties`,
      description: project.seoDescription || project.shortDescription,
      images: [{ url: project.coverImage }],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const resolvedParams = await params;
  const project = await getProjectBySlug(resolvedParams.slug);

  if (!project || project.publishStatus !== "published") {
    notFound();
  }

  const db = await readDB();
  const allProjects = await getProjects();
  const relatedProjects = allProjects.filter((p) => p.slug !== project.slug && p.publishStatus === "published");

  return <ProjectDetailView project={project} relatedProjects={relatedProjects} contact={db.contact} />;
}
