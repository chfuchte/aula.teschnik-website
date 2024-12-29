"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function RequestAccessTabContent() {
    const formSchema = z.object({
        email: z.string().email(),
        firstName: z.string(),
        lastName: z.string(),
        contactPerson: z.string(),
        message: z.string().max(200).optional(),
    });

    type FormSchemaType = z.infer<typeof formSchema>;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            firstName: "",
            lastName: "",
            contactPerson: "",
            message: "",
        },
    });

    const onSubmit = (values: FormSchemaType) => {
        console.log(values);
    };

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Card>
                        <CardHeader>
                            <CardTitle> Zugang beantragen </CardTitle>
                            <CardDescription>
                                Falls Sie einen Zugang mit einer schulfremden E-Mail-Adresse benötigen, beantragen Sie
                                ihn bitte hier. Schulische/dienstliche E-Mail-Adressen sind in der Regel bereits
                                automatisch freigeschaltet, nutzen Sie dafür bitte die Anmeldung. Schulfremde Adressen
                                werden üblicherweise nur für dann freigeschaltet, wenn der Antragssteller keine
                                schulische/dienstliche E-Mail-Adresse besitzt.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Vorname</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Max" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nachname</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Mustermann" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>E-Mail-Adresse</FormLabel>
                                        <FormControl>
                                            <Input placeholder="vorname.nachname@domain.de" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="contactPerson"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Kontaktperson in der Schule</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Herr/Frau Lehrkraft" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nachricht</FormLabel>
                                        <FormControl>
                                            <Textarea rows={3} placeholder="Ihre Nachricht" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Möchten Sie uns noch etwas mitteilen? (max. 200 Zeichen)
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" className="w-full">
                                Zugang beantragen
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </Form>
        </>
    );
}
