import Footer from "@/components/ATecFooter";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import React from "react";

type LayoutProps = {
    children: React.ReactNode;
    variant: "top-center" | "center-center";
};

export function Layout({ children, variant }: Readonly<LayoutProps>) {
    return (
        <>
            <SonnerToaster />
            <MainWrapperByVariant variant={variant}>{children}</MainWrapperByVariant>
            <Footer />
        </>
    );
}

function MainWrapperByVariant({
    children,
    variant,
}: Readonly<{
    children: LayoutProps["children"];
    variant: LayoutProps["variant"];
}>) {
    switch (variant) {
        case "top-center": {
            return <main className="grid place-items-start justify-center py-6">{children}</main>;
        }
        case "center-center": {
            return <main className="grid min-h-screen place-items-center justify-center">{children}</main>;
        }
    }
}
