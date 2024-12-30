import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UserLayout } from "@/components/layouts/user";
import { auth } from "@/auth";

export default async function Dashboard() {
    const session = await auth();

    if (!session?.user) {
        return null;
    }

    return (
        <UserLayout className={"flex w-full flex-col gap-4 sm:pr-2 md:pr-4"}>
            <Card>
                <CardHeader>
                    <CardTitle>Willkommen zurück, {session.user.name}!</CardTitle>
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
