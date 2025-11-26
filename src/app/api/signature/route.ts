import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { generateSignatureHtml } from "@/lib/signature-template";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { error: "Email parameter is required" },
        { status: 400 }
      );
    }

    // Find member by email
    const member = await db.member.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!member) {
      return NextResponse.json(
        { error: "Member not found" },
        { status: 404 }
      );
    }

    // Check if signature is enabled
    if (!member.signature) {
      return NextResponse.json(
        { error: "Signature is disabled for this member" },
        { status: 403 }
      );
    }

    // Generate HTML signature
    const signatureHtml = generateSignatureHtml({
      firstName: member.firstName,
      lastName: member.lastName,
      designation: member.designation,
      contactNumber: member.contactNumber,
      email: member.email,
    });

    // Return HTML with proper content type
    return new NextResponse(signatureHtml, {
      status: 200,
      headers: {
        "Content-Type": "text/html",
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
