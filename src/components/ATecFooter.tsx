import Link from "next/link";

export default function Footer() {
    return (
        <footer className="relative bottom-0 z-50 flex flex-wrap-reverse items-center justify-between bg-neutral-900 px-6 py-6 text-sm">
            <span className="text-gradient-atec place-self-start text-start transition-all duration-100 ease-in-out">
                &copy; 2024 Aula Technik AG Gymnasium Riedberg
            </span>

            <div></div>

            <div>
                <Link href="/privacy">Datenschutz</Link> | <Link href="/imprint">Impressum</Link>
            </div>
        </footer>
    );
}
