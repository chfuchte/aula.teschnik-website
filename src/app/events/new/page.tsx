"use client";

import { CardDescription } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useIsMobile } from "@/hooks/use-mobile";
import { UserLayout } from "@/components/layouts/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { VeranstalterFormCard } from "./(cards)/veranstalter";
import { GenerellesFormCard } from "./(cards)/generelles";
import { ZeitenFormCard } from "./(cards)/zeiten";
import { SubmitFormCard } from "./(cards)/submit";
import { EquipmentFormCard } from "./(cards)/equipment";
import { auth } from "@/auth";

const formSchema = z.object({
    veranstalter: z.object({
        name: z.string().nonempty("Required"),
        email: z.string().email(),
    }),
    veranstaltung: z.object({
        titel: z.string().nonempty("Required"),
        beschreibung: z.string().nonempty("Required"),
        ort: z.string().nonempty("Required"),
        pax: z.number().min(1),
    }),
    zeiten: z
        .array(
            z.object({
                date: z.string().regex(/^\d{2}\.\d{2}\.\d{4}$/),
                start: z.string().regex(/^\d{2}:\d{2}$/),
                end: z.string().regex(/^\d{2}:\d{2}$/),
                notiz: z.string().optional(),
            }),
        )
        .nonempty("Required"),
    equipment: z.object({
        beamer: z.object({
            required: z.boolean(),
            method: z.enum(["hdmi", "elmo", "usb"] as const),
            sound: z.boolean(),
        }),
        mikro: z.object({
            funkmic: z.number().min(0).max(3),
            kabelmic: z.number().min(0).max(5),
            headsets: z.number().min(0).max(5),
        }),
        sonstiges: z.string().nonempty().optional(),
    }),
    sonstiges: z.string().optional(),
});

export type FormSchema = z.infer<typeof formSchema>;

export default function EventForm() {
    const isMobile = useIsMobile();

    const form: UseFormReturn<FormSchema, unknown, undefined> = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            veranstalter: {
                name: "",
                email: "",
            },
            veranstaltung: {
                titel: "",
                beschreibung: "",
                ort: "",
                pax: 450,
            },
            zeiten: [
                {
                    date: `01.01.2025`,
                    start: "08:00",
                    end: "13:25",
                    notiz: "",
                },
            ],
            equipment: {
                beamer: {
                    required: false,
                    sound: false,
                },
                mikro: {
                    funkmic: 0,
                    kabelmic: 0,
                    headsets: 0,
                },
            },
            sonstiges: "",
        },
    });

    useEffect(() => {
        auth().then((s) => {
            if (s && s.user) {
                form.setValue("veranstalter.name", s.user.name ?? "");
                form.setValue("veranstalter.email", s.user.email ?? "");
            }
        });

        const inTwoWeeks = new Date(Date.now() + 1209600000);
        form.setValue("zeiten", [
            {
                date: `${inTwoWeeks.getDate()}.${inTwoWeeks.getMonth() + 1}.${inTwoWeeks.getFullYear()}`,
                start: "08:00",
                end: "13:25",
            },
        ]);
    }, [form]);

    const onSubmit = (data: FormSchema) => {
        console.log(data);
    };

    return (
        <UserLayout
            className={`flex w-full flex-col items-center justify-start gap-4 p-8 ${!isMobile ? "pr-4" : "pr-2"}`}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="h-full w-5/6 max-w-prose space-y-4">
                    <h1 className="text-2xl font-bold">Veranstaltung anmelden</h1>
                    <CardDescription>
                        Dieses Formular ersetzt das PDF/ Papierformular, welches im Sekretariat erhältlich ist. Hiermit
                        können Sie die technische Betreuung einer Veranstaltung beantragen.
                    </CardDescription>

                    <VeranstalterFormCard form={form} />
                    <GenerellesFormCard form={form} />
                    <ZeitenFormCard form={form} />
                    <EquipmentFormCard form={form} />
                    <SubmitFormCard form={form} />
                </form>
            </Form>
        </UserLayout>
    );
}
