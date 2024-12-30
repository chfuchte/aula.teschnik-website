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
import { auth, signOut } from "@/auth";

export async function UserFooter() {
    const session = await auth();

    if (!session?.user) return null;

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                            <>
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={"/images/logo.png"} alt="ATec Logo" />
                                    <AvatarFallback className="rounded-lg">
                                        {session.user.name?.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm">
                                    <span className="truncate font-semibold leading-3">{session.user.name}</span>
                                    <span className="truncate text-sm leading-tight">{session.user.email}</span>
                                </div>
                                <ChevronsUpDown className="ml-auto size-4" />
                            </>
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
                        <DropdownMenuItem>
                            <form
                                action={async () => {
                                    await signOut();
                                }}>
                                <LogOut />
                                Abmelden
                            </form>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
