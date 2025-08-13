// Helper to load keywords.json in the frontend (React)
// This assumes keywords.json is copied to the public directory at build time

export interface KeywordPageMeta {
  filename: string;
  title: string;
}

export async function loadKeywords(): Promise<KeywordPageMeta[]> {
  const res = await fetch('/keywords.json');
  if (!res.ok) throw new Error('Failed to fetch keywords.json');
  return res.json();
}
