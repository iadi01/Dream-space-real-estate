import { NextResponse } from "next/server";
import { saveProject, deleteProject } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const project = await request.json();
    if (!project.slug || !project.name) {
      return NextResponse.json({ error: "Slug and Name are required fields" }, { status: 400 });
    }
    const success = await saveProject(project);
    return NextResponse.json({ success, project });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    if (!slug) {
      return NextResponse.json({ error: "Slug parameter is required" }, { status: 400 });
    }
    const success = await deleteProject(slug);
    return NextResponse.json({ success });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
