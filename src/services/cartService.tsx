
export async function AddToCart() {
    return new Promise<{ success: boolean }>((resolve, rejected) => {
        setTimeout(() => {
            resolve({ success: true });
            //rejected({ success: false });
        }, 2000);
    });
}