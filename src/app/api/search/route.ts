import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    const { rows } = await sql`
      SELECT * FROM persons
      ORDER BY last_seen DESC;
    `;
    return NextResponse.json(rows);
  }

  const { rows } = await sql`
    SELECT *
    FROM persons
    WHERE
      name ILIKE ${`%${query}%`} OR
      location ILIKE ${`%${query}%`} OR
      status ILIKE ${`%${query}%`} OR
      risk_level ILIKE ${`%${query}%`}
    ORDER BY last_seen DESC;
  `;

  return NextResponse.json(rows);
}
