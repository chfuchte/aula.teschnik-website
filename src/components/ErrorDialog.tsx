import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import React from "react";

export function UnknownErrorDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
    return (
        <TextDialog
            open={open}
            onOpenChange={onOpenChange}
            title="Fehler"
            text="...sind menschlich. Doch das hier ist eine Maschine. Bitte wenden Sie sich an das Technik-Team, damit wieder Menschen die Fehler machen."
        />
    );
}

export function TextDialog({
    open,
    onOpenChange,
    title,
    text,
    actions,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    text: string;
    actions?: React.ReactNode;
}) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{text}</DialogDescription>
                </DialogHeader>
                {actions != undefined ? (
                    <DialogFooter>{actions}</DialogFooter>
                ) : (
                    <DialogFooter>
                        <Button onClick={() => onOpenChange(false)}>Schließen</Button>
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    );
}
