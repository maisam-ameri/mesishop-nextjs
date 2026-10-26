"use client"

import { CartModel } from "@/domain/cartModel";
import React from "react";
import { CartContext } from '@/context/cartContext';


export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cartState, setCartState] = React.useState<CartModel[]>([]);


    const addToCart = (productId: number) => {
        setCartState(prev => {

            const productInCart = prev.find(p => p.productId === productId);
            if (productInCart) {

                return prev.map(model => {

                    if (model.productId === productId) {
                        return {
                            ...model,
                            quantity: model.quantity + 1
                        };
                    }
                    else
                        return model
                });
            }
            else {

                return [...prev,
                {
                    productId: productId,
                    quantity: 1
                }];
            }
        });
    }

    const removeFromCart = (productId: number) => {
        setCartState(prev => {
            return prev.filter(product => product.productId !== productId);
        });
    }

    const decreaseQuantity = (productId: number) => {
        setCartState(prev => {
            return prev.map(product => {
                if (product.productId === productId) {
                    return {
                        ...product,
                        quantity: product.quantity - 1
                    }
                }
                return product;

            }).filter(product =>
                product?.productId !== productId
                || product.quantity > 0)
        });
    }

    const totalItems = cartState.reduce((total, item) => total + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{ addToCart, removeFromCart, decreaseQuantity, cartState, totalItems }}>
            {children}
        </CartContext.Provider>
    )

}


