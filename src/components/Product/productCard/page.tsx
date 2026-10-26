"use client"

import { ProductModel } from '@/domain/productModel'
import useAddToCart from '@/hooks/useAddToCart'
import Link from "next/link";



export interface productCardProps {
    product: ProductModel,
}

function ProductCard(productProps: productCardProps) {
    const { addToCart, loading } = useAddToCart();

    const imagePath = `/images/products/${productProps.product.image}`;
    const finalPrice =
        productProps.product.price -
        (productProps.product.price * (productProps.product.discount * 0.01));


    function onClickAddToCard() {
        addToCart(productProps.product.id);
    }


    return (
        <div className='card'>
            <Link href={`/products/${productProps.product.id}`}>
                <img src={imagePath} alt={productProps.product.title}></img>
            </Link>

            <div className='product-info'>
                <h3>
                    <Link href={`/products/${productProps.product.id}`}>
                        {productProps.product.title}
                    </Link>
                </h3>

                {productProps.product.outOfStock ?
                    (<p className='outOfStock'>Out of stock</p>)
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

                <button
                    onClick={onClickAddToCard}
                    disabled={loading || productProps.product.outOfStock}>
                    {loading ? "loading..." : "Add to card"}
                </button>

            </div>
        </div>
    )
}

export default ProductCard


