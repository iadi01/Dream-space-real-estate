import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get("admin_authenticated")?.value === "true";
  return NextResponse.json({ isAuthenticated });
}

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const correctPassword = process.env.ADMIN_PASSWORD;

    if (!correctPassword) {
      return NextResponse.json({ error: "ADMIN_PASSWORD not configured on server." }, { status: 500 });
    }

    if (password === correctPassword) {
      const cookieStore = await cookies();
      cookieStore.set("admin_authenticated", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_authenticated");
  return NextResponse.json({ success: true });
}
