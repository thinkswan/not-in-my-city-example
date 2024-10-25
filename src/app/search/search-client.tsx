"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Person } from "@/data/database";
import Image from "next/image";
import { formatDate } from "@/lib/utils";

type SortConfig = {
  key: keyof Person;
  direction: "asc" | "desc";
};

export default function SearchClient({
  initialData,
}: {
  initialData: Person[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Person[]>(initialData);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "lastSeen",
    direction: "desc",
  });

  // Handle search with debounce
  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setSearchQuery(query);

    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(query)}`
      );
      if (!response.ok) throw new Error("Search failed");
      const results = await response.json();
      setData(results);
    } catch (error) {
      console.error("Search error:", error);
      // You might want to show an error message to the user here
    } finally {
      setIsLoading(false);
    }
  };

  const handleSort = (key: keyof Person) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));

    setData((current) => {
      const sorted = [...current].sort((a, b) => {
        // Special sorting for dates
        if (key === "lastSeen" || key === "dateOfBirth") {
          return sortConfig.direction === "asc"
            ? new Date(a[key]).getTime() - new Date(b[key]).getTime()
            : new Date(b[key]).getTime() - new Date(a[key]).getTime();
        }

        // Special sorting for risk level
        if (key === "riskLevel") {
          const riskOrder = { high: 3, medium: 2, low: 1 };
          return sortConfig.direction === "asc"
            ? riskOrder[a.riskLevel] - riskOrder[b.riskLevel]
            : riskOrder[b.riskLevel] - riskOrder[a.riskLevel];
        }

        // Default string sorting
        return sortConfig.direction === "asc"
          ? a[key].toString().localeCompare(b[key].toString())
          : b[key].toString().localeCompare(a[key].toString());
      });
      return sorted;
    });
  };

  const getStatusBadge = (status: Person["status"]) => {
    const variants = {
      active: "bg-red-100 text-red-800 hover:bg-red-100",
      investigating: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
      found: "bg-green-100 text-green-800 hover:bg-green-100",
    };
    return variants[status];
  };

  const getRiskBadge = (risk: Person["riskLevel"]) => {
    const variants = {
      high: "bg-red-100 text-red-800 hover:bg-red-100",
      medium: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
      low: "bg-blue-100 text-blue-800 hover:bg-blue-100",
    };
    return variants[risk];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-yellow-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="font-bold text-lg sm:text-xl tracking-tight"
          >
            #NotInMyCity
          </Link>
          <Button
            asChild
            variant="outline"
            className="border-yellow-400 hover:bg-yellow-100"
          >
            <Link href="/admin">Agency Login</Link>
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">
            Search Database
          </h1>
          <div className="max-w-md">
            <Input
              type="search"
              placeholder="Search by name, location, or case details..."
              className="w-full"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Results */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Photo</TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center gap-2">
                    Name
                    {sortConfig.key === "name" &&
                      (sortConfig.direction === "asc" ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      ))}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("dateOfBirth")}
                >
                  <div className="flex items-center gap-2">
                    Date of Birth
                    {sortConfig.key === "dateOfBirth" &&
                      (sortConfig.direction === "asc" ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      ))}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("lastSeen")}
                >
                  <div className="flex items-center gap-2">
                    Last Seen
                    {sortConfig.key === "lastSeen" &&
                      (sortConfig.direction === "asc" ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      ))}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("location")}
                >
                  <div className="flex items-center gap-2">
                    Location
                    {sortConfig.key === "location" &&
                      (sortConfig.direction === "asc" ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      ))}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("status")}
                >
                  <div className="flex items-center gap-2">
                    Status
                    {sortConfig.key === "status" &&
                      (sortConfig.direction === "asc" ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      ))}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("riskLevel")}
                >
                  <div className="flex items-center gap-2">
                    Risk Level
                    {sortConfig.key === "riskLevel" &&
                      (sortConfig.direction === "asc" ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      ))}
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                // Loading state
                [...Array(3)].map((_, i) => (
                  <TableRow key={i}>
                    {[...Array(7)].map((_, j) => (
                      <TableCell key={j}>
                        <div className="h-4 bg-gray-200 rounded animate-pulse" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : data.length === 0 ? (
                // No results
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-8 text-gray-500"
                  >
                    No results found for &quot;{searchQuery}&quot;
                  </TableCell>
                </TableRow>
              ) : (
                // Results
                data.map((person) => (
                  <TableRow key={person.id} className="group hover:bg-gray-50">
                    <TableCell>
                      <div className="relative w-10 h-10 rounded-full overflow-hidden">
                        <Image
                          src={person.image}
                          alt={person.name}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{person.name}</TableCell>
                    <TableCell>{formatDate(person.dateOfBirth)}</TableCell>
                    <TableCell>{formatDate(person.lastSeen)}</TableCell>
                    <TableCell>{person.location}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(person.status)}>
                        {person.status.charAt(0).toUpperCase() +
                          person.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getRiskBadge(person.riskLevel)}>
                        {person.riskLevel.charAt(0).toUpperCase() +
                          person.riskLevel.slice(1)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}
