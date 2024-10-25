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

// Types for our data
type Person = {
  id: string;
  name: string;
  dateOfBirth: string;
  lastSeen: string;
  location: string;
  status: "active" | "found" | "investigating";
  riskLevel: "high" | "medium" | "low";
};

// Sample data
const SAMPLE_DATA: Person[] = [
  {
    id: "1",
    name: "Sarah Thompson",
    dateOfBirth: "1999-03-15",
    lastSeen: "2024-02-20",
    location: "Vancouver, BC",
    status: "active",
    riskLevel: "high",
  },
  {
    id: "2",
    name: "Michael Chen",
    dateOfBirth: "2002-08-21",
    lastSeen: "2024-01-15",
    location: "Toronto, ON",
    status: "investigating",
    riskLevel: "medium",
  },
  {
    id: "3",
    name: "Emma Wilson",
    dateOfBirth: "2001-11-30",
    lastSeen: "2024-03-01",
    location: "Calgary, AB",
    status: "found",
    riskLevel: "low",
  },
  // Add more sample data as needed
];

type SortConfig = {
  key: keyof Person;
  direction: "asc" | "desc";
};

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Person[]>(SAMPLE_DATA);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "lastSeen",
    direction: "desc",
  });

  // Simulate async search
  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setSearchQuery(query);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const filtered = SAMPLE_DATA.filter((person) =>
      Object.values(person).some((value) =>
        value.toString().toLowerCase().includes(query.toLowerCase())
      )
    );

    setData(filtered);
    setIsLoading(false);
  };

  // Handle column sorting
  const handleSort = (key: keyof Person) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));

    setData((current) => {
      const sorted = [...current].sort((a, b) => {
        if (a[key] < b[key]) return sortConfig.direction === "asc" ? -1 : 1;
        if (a[key] > b[key]) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
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
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="font-bold text-lg sm:text-xl tracking-tight"
          >
            #NotInMyCity
          </Link>
          <Button asChild variant="outline">
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
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                // Loading state
                [...Array(3)].map((_, i) => (
                  <TableRow key={i}>
                    {[...Array(6)].map((_, j) => (
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
                    colSpan={6}
                    className="text-center py-8 text-gray-500"
                  >
                    No results found for &quot;{searchQuery}&quot;
                  </TableCell>
                </TableRow>
              ) : (
                // Results
                data.map((person) => (
                  <TableRow key={person.id}>
                    <TableCell className="font-medium">{person.name}</TableCell>
                    <TableCell>
                      {new Date(person.lastSeen).toLocaleDateString()}
                    </TableCell>
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
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
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
