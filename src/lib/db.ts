import { sql } from "@vercel/postgres";
import { Person } from "@/data/database";

type PersonRow = {
  id: string;
  image: string;
  name: string;
  date_of_birth: Date; // PostgreSQL date returns as Date
  last_seen: Date; // PostgreSQL date returns as Date
  location: string;
  status: "active" | "found" | "investigating";
  risk_level: "high" | "medium" | "low";
};

function rowToPerson(row: PersonRow): Person {
  return {
    id: row.id,
    image: row.image,
    name: row.name,
    dateOfBirth: row.date_of_birth.toISOString().split("T")[0], // Convert to YYYY-MM-DD
    lastSeen: row.last_seen.toISOString().split("T")[0], // Convert to YYYY-MM-DD
    location: row.location,
    status: row.status,
    riskLevel: row.risk_level,
  };
}

export async function getPersons(): Promise<Person[]> {
  const { rows } = await sql<PersonRow>`
    SELECT
      id,
      image,
      name,
      date_of_birth::date,
      last_seen::date,
      location,
      status,
      risk_level
    FROM persons
    ORDER BY last_seen DESC;
  `;

  return rows.map(rowToPerson);
}

export async function searchPersons(query: string): Promise<Person[]> {
  const { rows } = await sql<PersonRow>`
    SELECT
      id,
      image,
      name,
      date_of_birth::date,
      last_seen::date,
      location,
      status,
      risk_level
    FROM persons
    WHERE
      name ILIKE ${`%${query}%`} OR
      location ILIKE ${`%${query}%`} OR
      status ILIKE ${`%${query}%`} OR
      risk_level ILIKE ${`%${query}%`}
    ORDER BY last_seen DESC;
  `;

  return rows.map(rowToPerson);
}

export async function deletePerson(id: string): Promise<void> {
  await sql`DELETE FROM persons WHERE id = ${id};`;
}
