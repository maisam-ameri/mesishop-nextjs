"use client"

import useAddToCart from "@/hooks/useAddToCart";
import styles from "./page.module.css";

interface AddToCartProps {
    id: number,
    outOfStock: boolean,
}

export default function AddProductToCart({ id, outOfStock }: AddToCartProps) {
    const { loading, addToCart } = useAddToCart();

    async function handleAddToCart() {
        addToCart(id);
    }

    return (
        <button
            onClick={handleAddToCart}
            disabled={loading || outOfStock}
            className={styles.addToCartButton}
        >
            {loading ? "loading" : "Add to cart"}
        </button>
    )
}