import { NextRequest, NextResponse } from "next/server";


export async function middleware(req: NextRequest) {

  // Lấy thông tin request
  const { method, url, headers } = req;
  const body = await req.text(); // Đọc body của request

  const logData = {
    timestamp: new Date().toISOString(),
    method,
    url,
    headers: Object.fromEntries(headers.entries()), // Chuyển Headers thành Object
    body,
  };

  // Ghi log vào file
  // console.info("Log data", JSON.stringify(logData, null, 2) + ",\n");

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*", // Chỉ áp dụng middleware cho các API
};