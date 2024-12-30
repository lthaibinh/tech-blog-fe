import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function runs for every request
export function middleware(req: NextRequest) {
  // Example: Check if the user is authenticated
  const token = req.cookies.get("token");

  if (!token) {
    // Redirect if not authenticated
    return NextResponse.next(); // Continue the request to allow UI-based login
  }

  // Allow the request to continue if authenticated
  return NextResponse.next();
}