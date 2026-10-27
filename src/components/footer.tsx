import Link from "next/link";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-brand">
                <Link href="/">Mesi Shop</Link>
                <p>Your everyday shopping, made simple.</p>
            </div>

            <nav className="footer-links" aria-label="Footer navigation">
                <Link href="/">Home</Link>
                <Link href="/products">Products</Link>
                <Link href="/aboutus">About Us</Link>
            </nav>

            <div className="footer-bottom">
                © {new Date().getFullYear()} Mesi Shop. All rights reserved.
            </div>
        </footer>
    );
}
