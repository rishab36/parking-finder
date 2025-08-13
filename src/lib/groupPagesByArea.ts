// Helper to group generated pages by area/country using keywords.json metadata
// This function assumes that the page objects have filename and title fields
// It attempts to extract area/country/city from the title or filename heuristically

export interface PageMeta {
  filename: string;
  title: string;
}

export interface GroupedPages {
  [area: string]: PageMeta[];
}

// Simple heuristics for extracting area/country from title or filename
function extractAreaOrCountry(page: PageMeta): string {
  // Try to extract from title (e.g., "Parking in Mumbai", "Parking in USA", "Parking in London")
  const title = page.title.toLowerCase();
  const filename = page.filename.toLowerCase();

  // Look for country/city keywords
  const countryKeywords = ["usa", "uk", "japan", "india", "canada", "australia", "germany", "france", "singapore", "uae", "dubai", "china", "spain", "italy", "netherlands", "brazil", "mexico"];
  for (const country of countryKeywords) {
    if (title.includes(country) || filename.includes(country)) {
      return country.toUpperCase();
    }
  }

  // Try to extract city/area from title ("Parking in <City>")
  const match = title.match(/parking (in|at|near|for|around) ([a-zA-Z\- ]+)/);
  if (match && match[2]) {
    return match[2].replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()).trim();
  }

  // Fallback: try to get last word before dash in title
  const dashParts = title.split("-");
  if (dashParts.length > 1) {
    const last = dashParts[0].split(" ").pop();
    if (last) return last.charAt(0).toUpperCase() + last.slice(1);
  }

  // Fallback: Unknown
  return "Other";
}

export function groupPagesByArea(pages: PageMeta[]): GroupedPages {
  const grouped: GroupedPages = {};
  for (const page of pages) {
    const area = extractAreaOrCountry(page);
    if (!grouped[area]) grouped[area] = [];
    grouped[area].push(page);
  }
  return grouped;
}
