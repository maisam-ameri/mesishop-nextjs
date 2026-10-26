"use client"

import React from "react"
import { AddToCart as addToCartApi } from "@/services/cartService";
import { useToast } from "@/context/toastContext";
import { useCart } from "@/context/cartContext";

export default function useAddToCart() {
    const [loading, setLoading] = React.useState(false);
    const { showToast } = useToast();
    const { addToCart: updateCart } = useCart();

    async function addToCart(id: number) {
        setLoading(true);
        let result = { success: false };
        try {
            result = await addToCartApi();

            if (result.success)
                updateCart(id);


            return result;
        }
        catch (e) {
            console.log("500: server failed");
            handleToast(result.success);
        }
        finally {
            setLoading(false);
            handleToast(result.success);
        }
    }

    function handleToast(success: boolean) {
        showToast({
            id: Date.now(),
            message: success ? "Product added to cart" : "Failed to add product to cart",
        });
    }

    return { loading, addToCart };
}