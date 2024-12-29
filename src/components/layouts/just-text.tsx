import Footer from "@/components/ATecFooter";
import { cn } from "@/lib/utils";
import React from "react";

interface JustTextLayoutProps {
    children: React.ReactNode;
    className?: string;
}

export function JustTextLayout({ children, className }: JustTextLayoutProps) {
    return (
        <>
            <main className="flex w-full flex-col items-center justify-start p-8">
                <article className={cn("h-full w-5/6 max-w-prose space-y-2", className)}>{children}</article>
            </main>
            <Footer />
        </>
    );
}
