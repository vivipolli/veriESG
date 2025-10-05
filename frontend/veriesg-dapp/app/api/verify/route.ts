import { NextRequest, NextResponse } from "next/server";
import { handleVerify } from "@/server";

export async function POST(request: NextRequest) {
  try {
    const result = await handleVerify(request);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Verification failed",
      },
      { status: 500 },
    );
  }
}

