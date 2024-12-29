import Footer from "@/components/ATecFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function NotFoundPage() {
    return (
        <>
            <div className="grid min-h-screen place-items-center justify-center">
                <Card className="w-[90svw] max-w-[450px]">
                    <CardHeader>
                        <CardTitle>Ressource nicht gefunden</CardTitle>
                        <CardDescription>404 - Not Found</CardDescription>
                    </CardHeader>
                    <CardContent>Es konnte keine Ressource für diese URL gefunden werden.</CardContent>
                    <CardFooter>
                        <Link className="w-full" href={"/"}>
                            <Button className="w-full">Zurück zur Startseite</Button>
                        </Link>
                    </CardFooter>
                </Card>
            </div>
            <Footer />
        </>
    );
}
