import { getPersons } from "@/lib/db";
import SearchClient from "./search-client";

export const revalidate = 0; // Disable cache

export default async function SearchPage() {
  const initialData = await getPersons();

  return <SearchClient initialData={initialData} />;
}
