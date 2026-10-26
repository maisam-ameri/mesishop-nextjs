
type CheckoutSuccess = {
    success: true,
    orderId: string
}

type CheckoutFailure = {
    success: false,
    reason: "server-error" | "product-unavailable"
}

type CheckoutResponse = CheckoutSuccess | CheckoutFailure;

export async function Checkout() {

        return new Promise<{ success: boolean }>((resolve, rejected) => {
            setTimeout(() => {
                resolve({ success: true });
                //rejected({ success: false });
            }, 2000);
        });

}