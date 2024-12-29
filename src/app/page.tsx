import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/ATecFooter";
import Link from "next/link";
import Image from "next/image";

function WelcomePageBtn({
    children,
    text,
    href,
    variant,
}: {
    children?: React.ReactNode;
    text: string;
    href: string;
    variant: "yellow" | "purple" | "blue";
}) {
    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <Link href={href}>
                    <Button variant={variant} size={"hightlight"}>
                        {text}
                    </Button>
                </Link>
            </HoverCardTrigger>
            <HoverCardContent className="w-64">{children}</HoverCardContent>
        </HoverCard>
    );
}

export default function LoginPage() {
    return (
        <>
            <section
                className="bg-center-top relative h-svh bg-cover"
                style={{
                    /* TODO: change image */
                    backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0.68) 0%, rgba(0, 0, 0, 0.68) 100%), url("/images/schulgebaeude.jpg")`,
                }}>
                <div className="absolute left-1/2 flex w-full -translate-x-1/2 flex-wrap-reverse items-center justify-center gap-12 px-10 sm:top-0 md:top-1/4">
                    <div>
                        <h1 className="text-6xl font-bold">Aula Technik AG</h1>
                        <h2 className="text-4xl font-bold">Gymnasium Riedberg</h2>
                    </div>
                    <Image
                        src="/images/logo_transparent.png"
                        width={200}
                        height={200}
                        alt="Logo der Aula Technik am Gymnasium Riedberg"
                    />
                </div>

                <div className="ld:w-3/4 absolute bottom-[10%] left-1/2 grid w-full -translate-x-1/2 grid-cols-2 place-items-center items-end md:w-3/4">
                    <WelcomePageBtn variant="blue" text="Anmelden" href="/auth">
                        <div className="my-1 flex justify-between rounded-lg bg-neutral-900/80 p-4">
                            <Avatar>
                                <AvatarImage src="/images/logo_grb.png" />
                                <AvatarFallback>GRB</AvatarFallback>
                            </Avatar>
                            <div className="pl-2">
                                <h4 className="text-base font-semibold">Anmeldung mit E-Mail</h4>
                                <p className="text-sm">Melden Sie sich an, um Veranstaltungen anzumelden.</p>
                            </div>
                        </div>
                    </WelcomePageBtn>
                </div>
            </section>
            <Footer />
        </>
    );
}
