import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuGroup,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronsUpDown, LogOut, Cog, User2 } from "lucide-react";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { getUser, logout } from "@/lib/actions/auth";
import { useEffect, useState } from "react";
import { User } from "@/server/db/schema";
import { Loading } from "../Loading";
import { redirect } from "next/navigation";

export function UserFooter() {
    const [user, setUser] = useState<User | null>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUser().then(([success, user]) => {
            if (!success) {
                return;
            }
            setLoading(false);
            setUser(user);
        });
    }, [setUser]);

    const logoutHandler = async () => {
        if (await logout()) {
            throw redirect("/");
        }
    };

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                            {loading || !user ? (
                                <Loading />
                            ) : (
                                <>
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarImage src={"/images/logo.png"} alt="ATec Logo" />
                                        <AvatarFallback className="rounded-lg">
                                            {`${user.firstName.charAt(0)}${user.lastName.charAt(0)}`}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm">
                                        <span className="truncate font-semibold leading-3">{`${user.firstName} ${user.lastName}`}</span>
                                        <span className="truncate text-sm leading-tight">{user.role}</span>
                                    </div>
                                    <ChevronsUpDown className="ml-auto size-4" />
                                </>
                            )}
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        side={"top"}
                        align="end"
                        sideOffset={4}>
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <User2 />
                                Account
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Cog />
                                Einstellungen
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={logoutHandler}>
                            <LogOut />
                            Abmelden
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
