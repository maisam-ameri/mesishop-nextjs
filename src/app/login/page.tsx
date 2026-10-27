"use client"
import { useAuth } from "@/context/authContext";
import { useToast } from "@/context/toastContext";
import { Login as loginApi } from "@/services/authService"
import { useRouter } from "next/navigation";
import React from "react";
import styles from "./page.module.css"

export default function Login() {
    const [loading, setLoading] = React.useState(false);
    const { setUser } = useAuth();
    const { showToast } = useToast();
    const router = useRouter();


    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.currentTarget);
        const email = formData.get("email");
        const password = formData.get("password");

        let result = { success: false };

        if (typeof email !== "string" || typeof password !== "string") return;

        try {
            result = await loginApi({ email, password });
            
            if (result.success) {
                setUser({ email });
                router.push("/");

            }
            showToast(
                {
                    id: 0,
                    message: result.success ? "Login successful" : "Invalid email or password"
                })
        }
        catch (e) {
            console.log("server error");
            showToast(
                {
                    id: 0,
                    message: "server error"
                })
        }
        finally {
            setLoading(false);

        }
    }


    return (
        <div className={styles.container}>

            <h1 className={styles.title}>Login</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div>
                    <label htmlFor="email" className={styles.field}>Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className={styles.input}
                    />
                </div>
                <div>
                    <label htmlFor="password" className={styles.field}>Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className={styles.input}
                    />
                </div>
                <button
                    className= "btn btn-primary"
                    disabled={loading}
                    type="submit">
                    {loading ? "Logging in ..." : "Login"}
                </button>
            </form>

        </div>
    )
}