"use client"

import ProductContainer from "@/components/Product/productsContainer/page";
import Pagination from "@/components/pagination/pagination";
import useProducts from "@/hooks/useProducts";


export default function Products() {
    const {productFilter, applyFilters, paginationProducts,paginationModel} = useProducts();

    return (
        <div>
            <h2>Filtered products</h2>
            <input
                value={productFilter.keyword ?? ""}
                onChange={(event) => applyFilters("keyword", event.target.value)}
            />
            <select
                value={productFilter.brand ?? ""}
                onChange={(event) => applyFilters("brand", event.target.value)}>
                <option value={""}>Select a brand</option>
                <option value={"samsung"}>Samsung</option>
                <option value={"iphone"}>IPhone</option>
            </select>

            <input
                type="number"
                value={productFilter.minPrice ?? ""}
                onChange={(event) => applyFilters("minPrice", event.target.value)}
            />
            <input
                type="number"
                value={productFilter.maxPrice ?? ""}
                onChange={(event) => applyFilters("maxPrice", event.target.value)}
            />

            <select value={productFilter.sortBy ?? ""} onChange={(event) => applyFilters("sortBy", event.target.value)}>
                <option value={""}>Default order</option>
                <option value={"price"}>Price</option>
                <option value={"name"}>Name</option>
                <option value={"latest"}>Latest</option>
            </select>
            {(productFilter.sortBy !== undefined) &&
                <select
                    value={productFilter.sortOrder ?? "asc"}
                    onChange={(event) => applyFilters("sortOrder", event.target.value)}>
                    <option value={"asc"}>Ascending</option>
                    <option value={"desc"}>Descending</option>
                </select>
            }
            <ProductContainer products={paginationProducts} />
            <Pagination paginationModel = {paginationModel}/>
        </div>
    );
}