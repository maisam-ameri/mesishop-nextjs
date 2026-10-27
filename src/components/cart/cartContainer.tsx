"use client"

import React from 'react'
import { CartModel } from '@/domain/cartModel'
import { useCart } from '@/context/cartContext'

import { GetProductById } from '@/services/productService';

export function CartContainer() {

    const { cartState, addToCart, removeFromCart, decreaseQuantity } = useCart();



    function CreateCartItem(cartModel: CartModel) {

        const product = GetProductById(cartModel.productId);
        if (!product) return;

        const imagePath = `/images/products/${product.image}`;

        const orginalPrice = product.price * (1 - product.discount / 100);
        const finalPrice = orginalPrice * cartModel.quantity;

        return (
            <div className='cart-item' key={cartModel.productId}>

                <img className="cart-item-image" width={100} src={imagePath}
                    alt={product?.title ?? "Product"} />
                <div className="cart-item-info">
                    <h4>{product?.title}</h4>
                    <div className="cart-item-prices">

                        <div>
                            {product.discount > 0 ? (
                                <>
                                    <div className='cart-item-prices'>
                                        <del>{product.price}$</del>
                                        <p>{orginalPrice}$</p>
                                        <span>{product.discount}% OFF</span>
                                    </div>
                                </>
                            ) :
                                <>
                                    <p>{orginalPrice}</p>
                                </>
                            }
                            <div className='cart-item-total'>
                                <span>Total</span><p>{finalPrice}$</p>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="cart-item-quantity">
                    <button 
                    className='btn btn-outline'
                    onClick={() => decreaseQuantity(cartModel.productId)}>-</button>
                    <span>{cartModel.quantity}</span>
                    <button 
                    className='btn btn-outline'
                    onClick={() => addToCart(cartModel.productId)}>+</button>
                </div>

                <button
                    className="btn btn-danger"
                    onClick={() => removeFromCart(cartModel.productId)}
                >
                    Remove
                </button>
            </div>

        );
    }

    return cartState.length > 0 ?
        (<div className='cart-items'>
            {
                cartState.map(cartModel => (
                    CreateCartItem(cartModel)
                ))
            }
        </div>)
        :
        (
            <p>Your cart is empty</p>
        )
}