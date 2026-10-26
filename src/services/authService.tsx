
export async function Login({email,password} : {email:string,password:string}) {
    return new Promise<{ success: boolean }>((resolve, rejected) => {
        setTimeout(() => {
            resolve({ success: true });
            //rejected({ success: false });
        }, 2000);
    });
}