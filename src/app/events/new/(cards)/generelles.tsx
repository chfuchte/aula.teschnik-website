import { UseFormReturn } from "react-hook-form";
import { FormSchema } from "..";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ZeitenFormCardProps {
    form: UseFormReturn<FormSchema, unknown, undefined>;
}

export function GenerellesFormCard({ form }: ZeitenFormCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Information zur Veranstaltung</CardTitle>
                <CardContent className="space-y-4 pt-2">
                    <FormField
                        control={form.control}
                        name="veranstaltung.titel"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Titel der Veranstaltung</FormLabel>
                                <FormControl>
                                    <Input placeholder="z.B. Einschulung" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="veranstaltung.beschreibung"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Beschreibung der Veranstaltung</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Worum geht's? Was ist der Kontext?" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="veranstaltung.ort"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Veranstaltungsort</FormLabel>
                                <FormControl>
                                    <Input placeholder="Aula, Sporthalle, Schulhof oder ganz woanders" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="veranstaltung.pax"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Erwartete Besucherzahl (PAX)</FormLabel>
                                <FormDescription>
                                    Bitte geben Sie eine ungefähre Schätzung ab. <br />
                                    Zu beachten: In der Aula finden ist für maximal 450 Personen ausgelegt
                                </FormDescription>
                                <Select
                                    onValueChange={(v) => field.onChange(parseInt(v))}
                                    defaultValue={field.value.toString()}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="50 PAX" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="30"> {"1 Klasse (~ 30 Personen)"} </SelectItem>
                                        <SelectItem value="60"> {"3 Klassen (~ 60 Personen)"} </SelectItem>
                                        <SelectItem value="180"> {"1 Jahrgang (~ 180 Personen)"} </SelectItem>
                                        <SelectItem value="450"> {"Vollbestuhlung (~ 450 Personen)"} </SelectItem>
                                        <SelectItem value="1000"> {"über 500 Personen"} </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </CardContent>
            </CardHeader>
        </Card>
    );
}
