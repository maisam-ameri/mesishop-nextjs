import { GetProductById } from "@/services/productService";
import { notFound } from "next/navigation";
import styles from "./page.module.css";

type props = {
    params: Promise<{ id: number }>;
}

export default async function ProductDetails({ params }: props) {
    const { id } = await params;
    const product = GetProductById(Number(id));

    if (!product)
        notFound();

    const imagePath = "/images/products/";
    const orginalPrice = product.price * (1 - product.discount / 100);

    return (

        <div className={styles.productDetails}>

            <img
                className={styles.productImage}
                src={`${imagePath}${product.image}`}
                alt={product.title}
            />
            <div>
                <h1>{product.title}</h1>
                {product.outOfStock ?
                    <p>Out of stock</p>
                    :
                    product.discount > 0 ?
                        <>
                            <del>{product.price}$</del>
                            <p>{product.discount}% OFF </p>
                            <p>{orginalPrice}$ </p>
                        </>
                        : <p>{product.price}$ </p>
                }
            </div>

        </div>

    )
}