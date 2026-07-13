import { NextResponse } from "next/server";
import { readDB, writeDB, getLeads } from "@/lib/db";

export async function GET() {
  try {
    const db = await readDB();
    db.leads = await getLeads();
    return NextResponse.json(db);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = await readDB();
    
    // Support partial updates for specific modules
    if (body.hero) db.hero = body.hero;
    if (body.about) db.about = body.about;
    if (body.statistics) db.statistics = body.statistics;
    if (body.services) db.services = body.services;
    if (body.projects) db.projects = body.projects;
    if (body.values) db.values = body.values;
    if (body.contact) db.contact = body.contact;
    if (body.testimonials) db.testimonials = body.testimonials;
    
    const success = await writeDB(db);
    if (!success) {
      throw new Error("Failed to write to database file.");
    }
    
    return NextResponse.json({ success: true, db });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
