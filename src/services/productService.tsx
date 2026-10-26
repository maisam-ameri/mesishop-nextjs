
import { products } from '@/data/products'
import { ProductFilter } from '@/domain/productFilter';

const sliceValue = 4;

export function GetProducts() {
    return [...products];
}

export function GetBestSellingProducts() {
    return [...products]
        .sort((a, b) => b.salesCount - a.salesCount)
        .slice(0, sliceValue);
}

export function GetLatestProducts() {
    return [...products]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, sliceValue);

}

export function GetDiscountedProducts() {
    return [...products]
        .filter(product => product.discount != 0)
        .sort((a, b) => b.discount - a.discount)
        .slice(0, sliceValue);
}

export function GetProductsByKeyword(keyword: string) {
    return GetProducts().filter(
        p => p.title.toLowerCase().includes(keyword.toLowerCase()));
}

export function GetProductById(productId: number) {
    return products.find(p => p.id === productId);
}

export function GetFilteredProducts(filter: ProductFilter) {
    let products = GetProducts();

    const searchKeyword = filter.keyword?.toLowerCase();
    const brand = filter.brand?.toLowerCase();
    const minPrice = filter.minPrice;
    const maxPrice = filter.maxPrice;

    if (searchKeyword) {
        products = GetProductsByKeyword(searchKeyword);
    }

    if (brand) {
        products =
            products.filter(product => product.title.toLowerCase().includes(brand));
    }

    if (minPrice) {
        products =
            products.filter(product => product.price > minPrice);
    }

    if (maxPrice) {
        products =
            products.filter(product => product.price < maxPrice);
    }

    return products;
}