type SortBy = "price" | "name" | "latest";
type SortOrder = "asc" | "desc";

export interface ProductFilter {
    keyword?: string,
    brand?: string,
    minPrice?: number,
    maxPrice?: number,
    sortBy?: SortBy,
    sortOrder?: SortOrder
}

export function IsValidSortBy(value: string | null): value is SortBy {
    return value === "price" || value === "name" || value === "latest";
}

export function IsValidSortOrder(value: string | null): value is SortOrder {
    return value === "asc" || value === "desc";
}
