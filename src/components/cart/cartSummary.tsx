"use client"

import { useCart } from "@/context/cartContext";
import { GetProductById } from "@/services/productService";
import { Checkout } from "@/services/paymentService";
import { useToast } from "@/context/toastContext";
import React from "react";

export default function CartSummary() {
    const [loading, setLoading] = React.useState(false);
    const { cartState } = useCart();
    const { showToast } = useToast();


    function calculateTotalCart() {

        let totalPrice = 0;
        cartState.forEach(cartModel => {
            const product = GetProductById(cartModel.productId);

            if (product) {
                const finalPrice = product.price - (product.price * (product.discount * 0.01));
                totalPrice += finalPrice * cartModel.quantity;
            }
        });
        return totalPrice;
    }

    async function handleCheckout() {
        setLoading(true);
        let result = { success: false };
        try {

            result = await Checkout();
            if (result.success)
                Checkout();
        }
        catch (e) {
            console.log("500: server failed");

        }
        finally {
            setLoading(false);
            handleToast(result.success);
        }
    }

    async function handleToast(isSuccess: boolean) {
        if (isSuccess) {
            showToast(
                {
                    id: Date.now(),
                    message: "Payment successed"
                });
        }
        else {
            showToast(
                {
                    id: Date.now(),
                    message: "Failed to payment"
                });
        }
    }


    return (cartState.length > 0 &&
        <div className="cart-summary">

            <h3>Order summary</h3>
            <div className="cart-summary-total">
                <span>total</span>
                <span> {calculateTotalCart()}$</span>
            </div>
            <button onClick={handleCheckout}   
            className="cart-summary-checkout-button" disabled = {loading}>
                Checkout</button>
        </div >)

}
