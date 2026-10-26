import { CartContainer } from "@/components/cart/cartContainer";
import CartSummary from "@/components/cart/cartSummary";

export default function Cart() {
    return (
        <div >
            <h1 className="cart-title" >Your cart</h1>
            <div className="cart-layout">
                <CartContainer />
                <CartSummary />
            </div>
        </div>

    );
}