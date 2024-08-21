import Papa from 'papaparse';

export interface Show {
  slug: string;
  title: string;
  date: string;
  channels: string;
  presenters: string;
  description: string;
  categories?: string;
  video?: string;
  link?: string;
}

export async function fetchAndParseCSV(url: string): Promise<Show[]> {
  const response = await fetch(url);
  const csvText = await response.text();

  const parsedData = Papa.parse<Show>(csvText, {
    header: true, // This ensures that the first row is treated as headers
    skipEmptyLines: true,
  });

  if (parsedData.errors.length) {
    console.error('CSV Parsing errors:', parsedData.errors);
  }

  return parsedData.data;
}
