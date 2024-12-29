"use client";

import { UseFormReturn } from "react-hook-form";
import { FormSchema } from "../page";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ZeitenFormCardProps {
    form: UseFormReturn<FormSchema, unknown, undefined>;
}

export function SubmitFormCard({ form }: ZeitenFormCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Abschließendes</CardTitle>
                <CardDescription>
                    Wir werden schnellstmöglich Ihren Antrag prüfen und uns bei Ihnen melden. Bei Rückfragen Ihrerseits
                    können Sie uns jederzeit <Link href="#">kontaktieren.</Link>
                </CardDescription>
                <CardContent className="space-y-4 pt-2">
                    <FormField
                        control={form.control}
                        name="sonstiges"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Anderweitiges (optional) </FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Möchten Sie noch etwas dem obigen Formular hinzufügen?"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </CardContent>
                <CardFooter>
                    <Button variant="default" type="submit" className="w-full">
                        Antrag absenden
                    </Button>
                </CardFooter>
            </CardHeader>
        </Card>
    );
}
