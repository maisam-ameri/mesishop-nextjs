"use client"

import useAddToCart from "@/hooks/useAddToCart";

interface AddToCartProps {
    id: number,
    outOfStock:boolean,
}

export default function AddProductToCart({ id,outOfStock }: AddToCartProps) {
    const { loading, addToCart } = useAddToCart();

    async function handleAddToCart() {
        addToCart(id);
    }

    return (
        <button
            onClick={handleAddToCart}
            disabled = {outOfStock}
            >
            {loading ? "loading" : "Add to cart"}
        </button>
    )
}