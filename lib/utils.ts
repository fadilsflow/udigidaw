import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toLocaleDate(date: string) {
  return new Date(date).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function getDayNumber(date: string) {
  return new Date(date).getDay();
}
export function getDayName(date: string) {
  return new Date(date).toLocaleDateString("id-ID", {
    weekday: "long",
  });
}

export function getMonthName(date: string) {
  return new Date(date).toLocaleDateString("id-ID", {
    month: "long",
  });
}

export function getYear(date: string) {
  return new Date(date).getFullYear();
}
