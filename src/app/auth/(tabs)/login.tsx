"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { login } from "@/lib/actions/auth";

export function LoginTabContent() {
    const formSchema = z.object({
        email: z.string().email(),
        password: z.string(),
    });

    type FormSchemaType = z.infer<typeof formSchema>;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = ({ email, password }: FormSchemaType) => {
        login(email, password);
    };

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Card>
                        <CardHeader>
                            <CardTitle> Mit E-Mail anmelden </CardTitle>
                            <CardDescription>
                                Falls Sie keinen Zugang haben, können Sie einen Zugang beantragen.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>E-Mail</FormLabel>
                                        <FormControl>
                                            <Input placeholder="vorname.nachname@domain.de" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Passwort</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Pupsbaerchensonderzeichen1!"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" className="w-full">
                                Anmelden
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </Form>
        </>
    );
}
