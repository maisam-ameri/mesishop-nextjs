"use client"

import { useAuth } from "@/context/authContext"
import { useRouter } from "next/navigation";
import React from "react";


export default function Profile() {
    const { user } = useAuth();
    const router = useRouter();

    React.useEffect(() => {

        if (!user)
            router.push("/login");

    }, [user, router])

    if (!user) return null;
    
    return (
        <h1>Hello {user.email}</h1>
    )
}