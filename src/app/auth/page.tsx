"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RequestAccessTabContent } from "./(tabs)/request-access";
import { useState } from "react";
import { LoginTabContent } from "./(tabs)/login";

export default function LoginPage() {
    const [selectedTab, setSelectedTab] = useState("email-login");

    const handleTabChange = (value: string) => {
        setSelectedTab(value);
    };

    return (
        <Tabs className="w-[90svw] max-w-[450px]" onValueChange={handleTabChange} value={selectedTab}>
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email-login">Anmelden</TabsTrigger>
                <TabsTrigger value="request-access">Zugang beantragen</TabsTrigger>
            </TabsList>
            <TabsContent value="email-login">
                <LoginTabContent />
            </TabsContent>
            <TabsContent value="request-access">
                <RequestAccessTabContent />
            </TabsContent>
        </Tabs>
    );
}
