"use client";

import { UseFormReturn } from "react-hook-form";
import { FormSchema } from "../page";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface ZeitenFormCardProps {
    form: UseFormReturn<FormSchema, unknown, undefined>;
}

export function VeranstalterFormCard({ form }: ZeitenFormCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Informationen zum Veranstalter</CardTitle>
                <CardContent className="space-y-4 pt-2">
                    <FormField
                        control={form.control}
                        name="veranstalter.vorname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Vorname des Veranstalters</FormLabel>
                                <FormControl>
                                    <Input placeholder="Max" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="veranstalter.nachname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nachname des Veranstalters</FormLabel>
                                <FormControl>
                                    <Input placeholder="Mustermann" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="veranstalter.email"
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
                </CardContent>
            </CardHeader>
        </Card>
    );
}
