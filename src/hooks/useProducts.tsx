"use client"

import { PaginationModel } from "@/domain/paginationModel";
import { IsValidSortBy, IsValidSortOrder, ProductFilter } from "@/domain/productFilter";
import { GetFilteredProducts } from "@/services/productService";
import { useSearchParams, useRouter } from "next/navigation";
import React from "react";


export default function useProducts() {


    const router = useRouter();
    const searchParams = useSearchParams();


    //#region Filter

    const minPrice = Number(searchParams.get("minPrice"));
    const maxPrice = Number(searchParams.get("maxPrice"));
    const sortByParam = searchParams.get("sortBy");
    const sortOrderParam = searchParams.get("sortOrder");
    const pageParam = searchParams.get("page");

    const productFilter: ProductFilter = {
        keyword: searchParams.get("keyword") ?? undefined,
        brand: searchParams.get("brand") ?? undefined,
        minPrice: minPrice ? minPrice : undefined,
        maxPrice: maxPrice ? maxPrice : undefined,
        sortBy: IsValidSortBy(sortByParam) ? sortByParam : undefined,
        sortOrder: IsValidSortOrder(sortOrderParam) ? sortOrderParam : undefined,
    }


    const filteredProducts = GetFilteredProducts(productFilter);

    function applyFilters(filter: keyof ProductFilter, value: string) {

        const params = new URLSearchParams(searchParams.toString());

        if (value.trim()) {
            params.set(filter, value);
            if (filter === "sortBy" && !searchParams.get("sortOrder")) {
                params.set("sortOrder", "asc");
            }
        }
        else {
            params.delete(filter);
            if (filter === "sortBy")
                params.delete("sortOrder");

        }
        HandleRoute(params);
    }
    //#endregion

    //#region Sort

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        const direction = productFilter.sortOrder === "asc" ? 1 : -1;

        switch (productFilter.sortBy) {
            case "price":
                return (a.price - b.price) * direction;

            case "name":
                return a.title.localeCompare(b.title) * direction;

            case "latest":
                return (new Date(a.createdAt).getTime()
                    - new Date(b.createdAt).getTime()) * direction;
            default:
                return 0;
        }
    });

    React.useEffect(() => {

        const params = new URLSearchParams(searchParams.toString());
        if (!productFilter.sortBy) {
            params.delete("sortOrder");
            params.delete("sortBy");
        }
        if(productFilter.sortBy && !productFilter.sortOrder){
            params.set("sortOrder","asc");

        }
        if (pageParam) {
            page = Number(pageParam);

            if (page <= 1 || page > totalPages) {

                params.delete("page");
            }
        }
        HandleRoute(params);

    }, []);

    function HandleRoute(params: URLSearchParams) {

        const hasfilter = [...params.values()].some(value =>
            value !== ""
            && value !== null
            && value !== undefined);

        if (hasfilter) {
            router.push(`/products?${params.toString()}`);
            return;
        }

        router.push(`/products`);

    }

    //#endregion

    //#region Pagination


    let page = Number(pageParam) === 0 ? 1 : Number(pageParam);
    const totalItemsInPage = 2;
    const totalPages = Math.ceil((sortedProducts.length / totalItemsInPage));
    const shiftIndex = 3;
    const from = (page - 1) * totalItemsInPage;
    const to = (from) + totalItemsInPage;

    const paginationModel: PaginationModel = {
        page: page,
        totalPages: totalPages,
        shiftIndex: shiftIndex,
        onClick: onClickPagination,
    }


    const paginationProducts = [...sortedProducts].slice(from, to);
    function onClickPagination(page: number) {
        const params = new URLSearchParams(searchParams.toString());

        if (page > 1 && page <= totalPages) {
            params.set("page", page.toString());
        }
        else {
            params.delete("page");
        }
        HandleRoute(params);
    }
    //#endregion


    return { productFilter, applyFilters, paginationProducts, paginationModel };
}