import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { data } = body;

    const apiResponse = await fetch(
      `${process.env.BACKEND_URL}/api/v1/property`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      }
    );
    const responseData = await apiResponse.json();

    if (responseData.success) {
      return NextResponse.json(responseData.data);
    }
    if (!apiResponse.ok) {
      return NextResponse.json(
        { error: responseData.message },
        { status: apiResponse.status }
      );
    }

    return NextResponse.json(responseData, { status: apiResponse.status });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
