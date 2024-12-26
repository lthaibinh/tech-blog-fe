import pool from "@/lib/pg";
import { NextRequest, NextResponse } from "next/server";
import { parse } from "path";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const setid = searchParams.get("setid");
  const testid = searchParams.get("testid");
  const partid = searchParams.get("partid");
  const email = searchParams.get("email");
  const query =
    "SELECT * FROM result where setid=$1 and testid=$2 and partid=$3 and email=$4";
  const { rows } = await pool.query(query, [setid, testid, partid, email]);

  return NextResponse.json(rows);
}
export async function POST(request: Request) {
  const { email, partid, setid, testid, questionid, accuracy } =
    await request.json();

  try {
    const query = 'select test($1,$2,$3,$4,$5,$6)';
    const { rows } = await pool.query(query, [
      email,
      questionid,
      accuracy,
      partid,
      setid,
      testid,
    ]);
    
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({});
  }
}
