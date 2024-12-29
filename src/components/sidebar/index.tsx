"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarTrigger,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarInput,
} from "@/components/ui/sidebar";
import { UserFooter } from "./user_footer";
import { Calendar, Home, Plus } from "lucide-react";
import { useCommandDialog } from "@/hooks/use-cmd";
import Link from "next/link";
import { Suspense } from "react";

export default function ATecSidebar() {
    const { setOpen } = useCommandDialog();

    return (
        <Sidebar collapsible="icon" variant="floating">
            <SidebarHeader className="inline-flex flex-row items-center">
                <SidebarTrigger className="min-w-7" />
                <span className="truncate">
                    <SidebarInput
                        className="bg-neutral-900 text-sm leading-tight"
                        placeholder="Suche..."
                        onFocus={() => setOpen(true)}
                    />
                </span>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Startseite</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <Link href="/dashboard">
                                    <SidebarMenuButton>
                                        <Home />
                                        <span>Dashboard</span>
                                    </SidebarMenuButton>
                                </Link>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Veranstaltungen</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <Link href="/events/new">
                                    <SidebarMenuButton>
                                        <Plus />
                                        <span>Neue Veranstaltung</span>
                                    </SidebarMenuButton>
                                </Link>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    <Calendar />
                                    <span>Veranstaltungen einsehen</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <Suspense fallback={null}>
                    <UserFooter />
                </Suspense>
            </SidebarFooter>
        </Sidebar>
    );
}
