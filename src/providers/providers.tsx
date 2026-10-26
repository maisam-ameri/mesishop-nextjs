"use client"

import React from "react"
import { ToastProvider } from "../context/toastContext"
import { CartProvider } from "./cartProvider"
import { AuthProvider } from "./authProvider"


export default function Providers({ children, }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <CartProvider>
                <ToastProvider>
                    {children}
                </ToastProvider>
            </CartProvider>
        </AuthProvider>
    )
} 
