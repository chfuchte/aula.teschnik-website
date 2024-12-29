import React from "react";
import { CommandDialogProvider } from "@/providers/command";
import ATecCommandDialog from "@/components/ATecCmdDialog";
import { SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import ATecSidebar from "@/components/sidebar";
import Footer from "@/components/ATecFooter";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { getUser } from "@/lib/auth/user";
import { redirect } from "next/navigation";

type LayoutProps = {
    children: React.ReactNode;
    className?: string;
};

/**
 * redirects to /auth if the user is not authenticated
 */
export async function ProtectedLayout({ children, className }: Readonly<LayoutProps>) {
    const [success] = await getUser();

    if (!success) {
        throw redirect("/auth");
    }

    return (
        <>
            <CommandDialogProvider>
                <SidebarProvider defaultOpen={true}>
                    <ATecSidebar />
                    <main
                        className={`p-2 ${className}`}
                        style={{
                            width: "100%",
                        }}>
                        <MobileAppBar />
                        {children}
                    </main>
                    <SonnerToaster />
                    <ATecCommandDialog />
                </SidebarProvider>
            </CommandDialogProvider>
            <Footer />
        </>
    );
}

function MobileAppBar() {
    const { isMobile } = useSidebar();

    if (isMobile) {
        return (
            <>
                <div className="fixed top-0 z-10 inline-flex h-12 w-full flex-row items-center gap-4 bg-background">
                    <SidebarTrigger />
                </div>
                <div className="h-8 w-full" />
            </>
        );
    }

    return null;
}
