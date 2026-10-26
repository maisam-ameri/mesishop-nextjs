
import { GetBestSellingProducts, GetLatestProducts, GetDiscountedProducts }
  from "@/services/productService";
import ProductContainer from "@/components/Product/productsContainer/page";



export default function Home() {

  return (
    <div>
        <h1>Welcome to Mesi Shop</h1>
        <div>
          <section>
            <h2>Best selling produects</h2>
              <ProductContainer products={GetBestSellingProducts()} />
          </section>

          <section>
            <h2>Latest products</h2>
              <ProductContainer products={GetLatestProducts()} />
          </section>

          <section>
            <h2>Discounted products</h2>
              <ProductContainer products={GetDiscountedProducts()} />
          </section>

        </div>

    </div>
  );
}
