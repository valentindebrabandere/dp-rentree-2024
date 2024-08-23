import shows from "../data/shows.json";
import categories from "../data/categories.json";
import type { CategoryType} from "../types/Category";



export function getCategorieInformations(categorySlug:string) {
    function findCategory(categories:CategoryType[], slug:string):CategoryType | null {
        for (let category of categories) {
            if (category.slug === slug) {
                return category;
            }
            if (category.childrens) {
                const found:CategoryType | null = findCategory(category.childrens, slug);
                if (found) {
                    return found as CategoryType;
                }
            }
        }
        return null;
    }

    return findCategory(categories, categorySlug);
}



export function getShowsByCategory(category:string) {
  return shows.filter((show) => show.categorie === category);
}

