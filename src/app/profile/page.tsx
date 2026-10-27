"use client"

import { useAuth } from "@/context/authContext"
import { useRouter } from "next/navigation";
import React from "react";


export default function Profile() {
    const { user, setUser } = useAuth();
    const router = useRouter();

    function handleLogout() {
        setUser(null);
        router.push("/login");
    }

    React.useEffect(() => {

        if (!user)
            router.push("/login");

    }, [user, router])

    if (!user) return null;

    return (
        <div>

            <h1>Hello {user.email}</h1>
            <button
                onClick={handleLogout}
                className="btn btn-danger"
                >
                    
                Logout</button>

        </div>
    )
}