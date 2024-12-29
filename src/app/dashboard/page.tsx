"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import { UserLayout } from "@/components/layouts/user";
import { getUser } from "@/lib/actions/auth";
import { User } from "@/server/db/schema";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function Dashboard() {
    const isMobile = useIsMobile();
    const [user, setUser] = useState<User | null>(null);

    getUser().then(([success, user]) => {
        if (!success) {
            throw redirect("/auth");
        }
        setUser(user);
    });

    return (
        <UserLayout className={`flex w-full flex-col gap-4 ${!isMobile ? "pr-4" : "pr-2"}`}>
            <Card>
                <CardHeader>
                    <CardTitle>Willkommen zurück, {user?.firstName}!</CardTitle>
                    <CardDescription>Schön, dass du wieder da bist.</CardDescription>
                </CardHeader>
            </Card>
            <div className="flex gap-4 max-lg:flex-wrap">
                <Card className="flex-1 max-lg:w-full lg:min-w-80">
                    <CardHeader>
                        <CardTitle>Kommende Veranstaltungen</CardTitle>
                        <CardDescription>Upcomming Events</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {/* TODO: add filter/ search */}
                        <Input placeholder="Nach Veranstaltung suchen..." disabled />
                    </CardContent>
                </Card>
            </div>
        </UserLayout>
    );
}
