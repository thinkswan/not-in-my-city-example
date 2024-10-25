import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  if (!date) return "";
  try {
    // If it's already a Date object
    if (date instanceof Date) {
      return format(date, "MMM d, yyyy");
    }
    // If it's a string, parse it
    return format(parseISO(date.toString()), "MMM d, yyyy");
  } catch (error) {
    console.error("Date formatting error:", error);
    return "Invalid date";
  }
}
