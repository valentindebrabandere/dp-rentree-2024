import type { Show } from "../types/show";
import shows from "../data/shows.json";

export function getShowsByCategory(category:string) {
  return shows.filter((show) => show.categorie === category);
}
