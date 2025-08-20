import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiResponse = await fetch(
      `${process.env.BACKEND_URL}/api/v1/auth/refresh`,
      {
        method: "GET",
      }
    );
    const responseData = await apiResponse.json();

    return NextResponse.json(responseData, { status: apiResponse.status });
  } catch (error) {
    console.error("Signup error:", error);
  }
}
