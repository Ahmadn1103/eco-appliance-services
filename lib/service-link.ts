/** Window event that tells ServicesSection to select a tile (used by footer links on the same page). */
export const SELECT_SERVICE_EVENT = "eco:select-service";

export function serviceHref(id: string) {
  return `/?service=${id}#services`;
}
