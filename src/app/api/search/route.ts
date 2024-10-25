import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { Person } from "@/data/database";

type PersonRow = {
  id: string;
  image: string;
  name: string;
  date_of_birth: Date;
  last_seen: Date;
  location: string;
  status: "active" | "found" | "investigating";
  risk_level: "high" | "medium" | "low";
};

function rowToPerson(row: PersonRow): Person {
  return {
    id: row.id,
    image: row.image,
    name: row.name,
    dateOfBirth: row.date_of_birth.toISOString().split("T")[0],
    lastSeen: row.last_seen.toISOString().split("T")[0],
    location: row.location,
    status: row.status,
    riskLevel: row.risk_level,
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query) {
      const { rows } = await sql<PersonRow>`
        SELECT * FROM persons
        ORDER BY last_seen DESC;
      `;
      return NextResponse.json(rows.map(rowToPerson));
    }

    const { rows } = await sql<PersonRow>`
      SELECT *
      FROM persons
      WHERE
        name ILIKE ${`%${query}%`} OR
        location ILIKE ${`%${query}%`} OR
        status ILIKE ${`%${query}%`} OR
        risk_level ILIKE ${`%${query}%`}
      ORDER BY last_seen DESC;
    `;

    return NextResponse.json(rows.map(rowToPerson));
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
