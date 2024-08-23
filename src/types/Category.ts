export interface Quote {
  author: string;
  content: string;
}

export interface CategoryType {
  title: string;
  slug: string;
  order: number | string;
  icons: string[];
  video?: string;
  quote?: Quote[]; 
  childrens?: CategoryType[]; 
}
