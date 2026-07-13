import { NextResponse } from "next/server";
import { saveLead, updateLeadStatus, getLeads } from "@/lib/db";

export async function GET() {
  try {
    const leads = await getLeads();
    return NextResponse.json(leads);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Check if it's a status update request or a new lead creation
    if (body.action === "update-status") {
      const { leadId, status } = body;
      if (!leadId || !status) {
        return NextResponse.json({ error: "Missing leadId or status" }, { status: 400 });
      }
      const success = await updateLeadStatus(leadId, status);
      return NextResponse.json({ success });
    }

    // Otherwise, create a new lead
    const { name, phone, email, project, message, source } = body;
    
    if (!name || !phone) {
      return NextResponse.json({ error: "Name and Phone are required fields." }, { status: 400 });
    }

    const savedLead = await saveLead({
      name,
      phone,
      email: email || "",
      project: project || "General Enquiry",
      message: message || "",
      source: source || "Website Form",
      status: "New",
    });

    return NextResponse.json({ success: true, lead: savedLead });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
