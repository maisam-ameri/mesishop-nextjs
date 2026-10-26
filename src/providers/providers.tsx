"use client"

import React from "react"
import { ToastProvider } from "../context/toastContext"
import { CartProvider } from "./cartProvider"


export default function Providers({ children, }: { children: React.ReactNode }) {
    return (
        <CartProvider>
            <ToastProvider>
                {children}
            </ToastProvider>
        </CartProvider>
    )
} 
