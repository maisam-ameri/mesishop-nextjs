"use client"

import React from "react";

export type User = {
    email: string,
}

type AuthContextType = {
user : User | null,
setUser:(user: User | null) => void
}

export const AuthContext = React.createContext<AuthContextType | null>(null);

export function useAuth(){
    const context = React.useContext(AuthContext);
    
    if(!context)
        throw new Error("useAuth must be used inside AuthProvider");
    
    return context;
}
