"use client"

import Link from "next/link";
import { useCart } from "@/context/cartContext";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/authContext";

const navRoutes = [
    { title: "Mesi Shop", href: "/" },
    { title: "Products", href: "/products" },
    { title: "Login", href: "/login" },
    { title: "Cart", href: "/cart" },
    { title: "AboutUs", href: "/about" },
]

export default function Navbar() {
    const { totalItems } = useCart();
    const pathName = usePathname();
    const { user } = useAuth();

    function createNavItem(title: string, href: string) {
        const cartLinkClass = href === "/cart" ? "cart-link" : "";
        return (
            <Link href={href}
                className={pathName === href ? `navbar-active ${cartLinkClass}`
                    : cartLinkClass}>
                {title}
                {href === "/cart" && totalItems > 0 && <span className="cart-count">{totalItems}</span>}
            </Link>
        )
    }
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                {createNavItem("Mesi Shop", "/")}
            </div>

            <div className="navbar-links">
                {createNavItem("Products", "/products")}
                {createNavItem("About Us", "/aboutus")}
            </div>

            <div className="navbar-actions">
                {user
                    ? createNavItem(user.email, "/profile")
                    : createNavItem("Login", "/login")}

                {createNavItem("Cart", "/cart")}
            </div>
        </nav>
    )
}