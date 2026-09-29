import { SERVICE_AREA_ZIPS, GENERATED_FOR } from "@/lib/service-area-zips";

export type ZipResult = "in" | "out" | "invalid";

export const SERVICE_RADIUS_MILES = GENERATED_FOR.radiusMiles;

/** Accepts "20001" or "20001-1234"; anything else is invalid. */
export function checkZip(input: string): ZipResult {
  const match = input.trim().match(/^(\d{5})(?:-\d{4})?$/);
  if (!match) return "invalid";
  return SERVICE_AREA_ZIPS.has(match[1]) ? "in" : "out";
}
