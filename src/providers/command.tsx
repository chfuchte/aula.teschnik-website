"use client";
import { useState, ReactNode } from "react";
import { CommandDialogContext } from "@/hooks/use-cmd";

export const CommandDialogProvider = ({ children }: { children: ReactNode }) => {
    const [open, setOpen] = useState(false);

    const openCmd = () => setOpen(true);

    return <CommandDialogContext.Provider value={{ open, setOpen, openCmd }}>{children}</CommandDialogContext.Provider>;
};
