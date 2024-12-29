"use client";
import { createContext, useContext } from "react";

export const CommandDialogContext = createContext<{
    open: boolean;
    setOpen: (open: boolean) => void;
    openCmd: () => void;
} | null>(null);

export function useCommandDialog() {
    const context = useContext(CommandDialogContext);
    if (!context) {
        throw new Error("useCommandDialog must be used within a CommandDialogProvider");
    }
    return context;
}
