"use client"

import { useCart } from "@/context/cartContext";
import { useToast } from "@/context/toastContext";
import { AddToCart } from "@/services/cartService";
import React from "react";
import styles from "./page.module.css"

interface AddToCartProps {
    id: number,
}

export default function AddProductToCart({ id }: AddToCartProps) {
    const [loading, setLoading] = React.useState(false);
    const { addToCart } = useCart();
    const { showToast } = useToast();

    async function handleAddToCart() {
        let result = { success: false };
        setLoading(true);

        try {
            result = await AddToCart();

            if (result.success)
                addToCart(id);
        }
        catch (e) {
            console.log("500: server failed");
        }
        finally {
            handleToast(result.success);
            setLoading(false);
        }
    }

    async function handleToast(isSuccess: boolean) {
        if (isSuccess) {
            showToast(
                {
                    id: Date.now(),
                    message: "product added"
                });
        }
        else {
            showToast(
                {
                    id: Date.now(),
                    message: "Failed to add product to cart"
                });
        }
    }

    return (
        <button
            onClick={handleAddToCart}
            className={loading ? "" : styles.addToCartButton}>
            {loading ? "loading" : "Add to cart"} 
        </button>
    )
}