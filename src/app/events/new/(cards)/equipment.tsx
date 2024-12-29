import { UseFormReturn } from "react-hook-form";
import { FormSchema } from "..";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface ZeitenFormCardProps {
    form: UseFormReturn<FormSchema, unknown, undefined>;
}

export function EquipmentFormCard({ form }: ZeitenFormCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Benötigte Technische Unterstützung</CardTitle>
                <CardDescription>
                    Über die untenstehenden Felder hinausgehende technische Anforderungen bitte im Feld Sonstiges
                    angeben. Bitte beachten Sie, dass dies i.d.R. eine längere Aufbauzeit erfordet.
                </CardDescription>
                <CardContent className="space-y-4 pt-2">
                    <FormField
                        control={form.control}
                        name="equipment.mikro.funkmic"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Funkmikrofone ({field.value})</FormLabel>
                                <FormDescription>
                                    Wie viele Funkmikrofone (kabellose Handmikrofone) werden benötigt?
                                </FormDescription>
                                <FormControl>
                                    <Slider
                                        onValueChange={field.onChange}
                                        value={[field.value]}
                                        step={1}
                                        min={0}
                                        max={3}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="equipment.mikro.headsets"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Headsets ({field.value})</FormLabel>
                                <FormDescription>
                                    Wie viele Headsets werden benötigt? <br />
                                </FormDescription>
                                <FormControl>
                                    <Slider
                                        onValueChange={field.onChange}
                                        value={[field.value]}
                                        step={1}
                                        min={0}
                                        max={5}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="equipment.mikro.kabelmic"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Kabelmikrofone ({field.value})</FormLabel>
                                <FormDescription>
                                    Wie viele kabelgebundene Handmikrofone werden benötigt/ mitgebracht?
                                </FormDescription>
                                <FormControl>
                                    <Slider
                                        onValueChange={field.onChange}
                                        value={[field.value]}
                                        step={1}
                                        min={0}
                                        max={5}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="equipment.beamer.required"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                <FormControl>
                                    <Checkbox
                                        id="equipment.beamer.required"
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormLabel htmlFor="equipment.beamer.required" className="text-sm font-normal">
                                    der Beamer wird benötigt (nur in der Aula verfügbar)
                                </FormLabel>
                            </FormItem>
                        )}
                    />
                    {form.watch("equipment.beamer.required") ? (
                        <>
                            <FormField
                                control={form.control}
                                name="equipment.beamer.method"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Bildübertragungsmethode</FormLabel>
                                        <FormDescription>
                                            Wie möchten Sie Ihre Präsentation/ etc. übertragen?
                                        </FormDescription>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Bitte auswählen.." />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="hdmi">
                                                    {" "}
                                                    {"ich habe ein eigenes Gerät mit HDMI-Port"}{" "}
                                                </SelectItem>
                                                <SelectItem value="usb">
                                                    {" "}
                                                    {"ich bringe einen USB-Stick mit"}{" "}
                                                </SelectItem>
                                                <SelectItem value="elmo"> {"Ich nutze den ELMO der Aula"} </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="equipment.beamer.sound"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <Checkbox
                                                id="equipment.beamer.sound"
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormLabel htmlFor="equipment.beamer.sound" className="text-sm font-normal">
                                            Meine Präsentation/ etc. hat Ton.
                                        </FormLabel>
                                    </FormItem>
                                )}
                            />
                        </>
                    ) : null}
                    <FormField
                        control={form.control}
                        name="equipment.sonstiges"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Sonstige benötigte teschnische Unterstützung</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="die Technik stellt prinzipiell keine Stühle" {...field} />
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
