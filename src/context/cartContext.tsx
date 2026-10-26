"use client"

import { CartModel } from "@/domain/cartModel";
import React from "react";


interface cartContextType {
    [x: string]: any;
    addToCart: (productId:number) => void,
    removeFromCart: (productId:number) => void,
    decreaseQuantity: (productId:number) => void,
    cartState: CartModel[],
    totalItems: number,
}

export const CartContext = React.createContext<cartContextType | null>(null);

export function useCart(){
    const context = React.useContext(CartContext);

    if(!context)
        throw new Error("useCart must be used inside CartProvider");

    return context;
}