"use client";

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { useCommandDialog } from "@/hooks/use-cmd";
import { useEffect } from "react";

export default function ATecCommandDialog() {
    const { open, setOpen } = useCommandDialog();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "p" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen(!open);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, [open, setOpen]);

    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Suche..." />
            <CommandList>
                <CommandEmpty>Keine Ergebnisse gefunden.</CommandEmpty>
                <CommandGroup heading="Vorschläge">
                    <CommandItem>
                        <span>Calendar</span>
                    </CommandItem>
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    );
}
