
import { GetProductById } from "@/services/productService";
import { notFound } from "next/navigation";
import styles from "./page.module.css";
import AddProductToCart from "./addToCart";

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
                {product.outOfStock
                    ? <p  className="outOfStock">Out of stock</p>
                    : product.discount > 0
                        ? 
                        <div className={styles.priceContainer}>
                            <del className={styles.oldPrice}>{product.price}$</del>
                            <p className={styles.discount}>{product.discount}% OFF </p>
                            <p className={styles.finalPrice}>{orginalPrice}$ </p>
                        </div>
                        : <p className={styles.finalPrice}>{product.price}$ </p>
                }
                <AddProductToCart id={product.id} outOfStock={product.outOfStock} />

            </div>

        </div>

    )
}