"use client";

import { useFieldArray, UseFormReturn } from "react-hook-form";
import { FormSchema } from "../page";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FormControl } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

interface ZeitenFormCardProps {
    form: UseFormReturn<FormSchema, unknown, undefined>;
}

export function ZeitenFormCard({ form }: ZeitenFormCardProps) {
    const { control, register } = form;
    const { fields, append, remove } = useFieldArray({
        control,
        name: "zeiten",
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle>Zeiten der Veranstaltung</CardTitle>
            </CardHeader>
            <CardContent className="mt-2 space-y-4">
                {fields.map((field, index) => (
                    <Card key={field.id}>
                        <CardContent className="space-y-4 py-4">
                            <div className="flex flex-row items-center gap-4">
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor={`zeiten.${index}.date`}>Datum</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] pl-3 text-left font-normal",
                                                        !form.watch(`zeiten.${index}.date`) && "text-muted-foreground",
                                                    )}>
                                                    {form.watch(`zeiten.${index}.date`) ? (
                                                        form.watch(`zeiten.${index}.date`)
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                initialFocus
                                                selected={parseDateString(
                                                    form.watch(`zeiten.${index}.date`, field.date),
                                                )}
                                                onSelect={(date) => {
                                                    if (!date) return;
                                                    const formattedDate = date.toLocaleDateString("de-DE");
                                                    form.setValue(`zeiten.${index}.date`, formattedDate);
                                                }}
                                                disabled={(date) => date <= new Date()}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor={`zeiten.${index}.start`}>Startzeit</Label>
                                    <Input
                                        type="time"
                                        id={`zeiten.${index}.start`}
                                        {...register(`zeiten.${index}.start` as const)}
                                        defaultValue={field.start}
                                    />
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor={`zeiten.${index}.end`}>Endzeit</Label>
                                    <Input
                                        type="time"
                                        id={`zeiten.${index}.end`}
                                        {...register(`zeiten.${index}.end` as const)}
                                        defaultValue={field.end}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col space-y-2">
                                <Label htmlFor={`zeiten.${index}.end`}>Notizen (optional)</Label>
                                <Textarea
                                    placeholder="z.B. Generalprobe, anderer Veranstaltungsort, etc."
                                    id={`zeiten.${index}.notiz`}
                                    {...register(`zeiten.${index}.notiz` as const)}
                                />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" onClick={() => remove(index)}>
                                Entfernen
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
                <Button variant="outline" className="w-full" onClick={() => append({ date: "", start: "", end: "" })}>
                    Zeit hinzufügen
                </Button>
            </CardContent>
        </Card>
    );
}

function parseDateString(dateString: string): Date | undefined {
    const [day, month, year] = dateString.split(".").map(Number);
    if (!day || !month || !year) return undefined; // Handle invalid formats
    return new Date(year, month - 1, day); // Month is 0-based in JavaScript Date
}
