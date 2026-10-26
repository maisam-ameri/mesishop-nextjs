import { ProductModel } from "@/domain/productModel";
import ProductCard from "../productCard/page";

interface productContainerProps {
    products: ProductModel[];
}

export default function ProductContainer(props: productContainerProps) {

    if (props.products.length == 0) return "there is not any product";

    return (
        <div className="cards">
            {
                props.products.map(product => (
                    <div key={product.id}><ProductCard product={product} /></div>
                ))
            }
        </div>
    )
}