"use client"

import { ProductModel } from '@/domain/productModel'
import React from 'react'
import { useToast } from '@/context/toastContext'
import { useCart } from '@/context/cartContext' 



export interface productCardProps {
    product: ProductModel,
}

function ProductCard(productProps: productCardProps) {
    const [loading, setLoading] = React.useState(false);
    const { showToast } = useToast();
    const { addToCart } = useCart();

    const imagePath = `/images/products/${productProps.product.image}`;
    const finalPrice =
        productProps.product.price -
        (productProps.product.price * (productProps.product.discount * 0.01));

    async function onClickAddToCard() {

        setLoading(true);
        let result = { success: false };
        try {

            result = await fakeApi();
            if (result.success)
                handleAddToCart(productProps.product.id);
        }
        catch (e) {
            console.log("500: server failed");

        }
        finally {
            setLoading(false);
            handleToast(result.success);
        }


    }

    function handleAddToCart(productId: number) {
        addToCart(productId);
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

    async function fakeApi() {
        return new Promise<{ success: boolean }>((resolve, rejected) => {
            setTimeout(() => {
                resolve({ success: true });
                //rejected({ success: false });
            }, 2000);
        });
    }

    return (
        <div className='card'>
            <img src={imagePath} alt={productProps.product.title}></img>
            <div className='product-info'>
                <h3>{productProps.product.title}</h3>

                {productProps.product.outOfStock ?
                    (<p>na mojood</p>)
                    : (
                        <div className='price'>
                            {productProps.product.discount !== 0 ? (
                                <>
                                    <span className='price-value old-price'>
                                        {productProps.product.price} $
                                    </span>
                                    <span className='price-value final-price'>
                                        {finalPrice} $
                                    </span>

                                    <span className='discount'>
                                        {productProps.product.discount} %
                                    </span>
                                </>
                            ) : (
                                <span className='price-value'>
                                    {productProps.product.price} $
                                </span>
                            )
                            }
                        </div>
                    )}

                <button onClick={onClickAddToCard} disabled={loading}>{loading ? "loading..." : "Add to card"}</button>

            </div>
        </div>
    )
}

export default ProductCard


