import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // TODO: Wire to CRM / email service (e.g. HubSpot, Resend, Slack webhook).
  let data: unknown = null;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid payload" }, { status: 400 });
  }
  console.log("Contact form submission:", data);
  return NextResponse.json({ success: true });
}
