import { sql } from "@vercel/postgres";
import { config } from "dotenv";
import { SAMPLE_DATA } from "@/data/database";
import path from "path";

// Load environment variables from .env.local
config({ path: path.resolve(process.cwd(), ".env.local") });

// Add debugging
console.log("Database URL exists:", !!process.env.POSTGRES_URL);

async function seedDatabase() {
  try {
    // Create the table
    await sql`
      CREATE TABLE IF NOT EXISTS persons (
        id TEXT PRIMARY KEY,
        image TEXT NOT NULL,
        name TEXT NOT NULL,
        date_of_birth DATE NOT NULL,
        last_seen DATE NOT NULL,
        location TEXT NOT NULL,
        status TEXT NOT NULL CHECK (status IN ('active', 'found', 'investigating')),
        risk_level TEXT NOT NULL CHECK (risk_level IN ('high', 'medium', 'low')),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Insert sample data
    for (const person of SAMPLE_DATA) {
      await sql`
        INSERT INTO persons (id, image, name, date_of_birth, last_seen, location, status, risk_level)
        VALUES (
          ${person.id},
          ${person.image},
          ${person.name},
          ${person.dateOfBirth},
          ${person.lastSeen},
          ${person.location},
          ${person.status},
          ${person.riskLevel}
        )
        ON CONFLICT (id) DO NOTHING;
      `;
    }

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

seedDatabase();
