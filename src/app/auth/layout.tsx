import { auth } from "@/auth";
import { Layout } from "@/components/layouts/base";
import { redirect } from "next/navigation";

export default async function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();

    if (session?.user) {
        return redirect("/dashboard");
    }

    return <Layout variant="top-center">{children}</Layout>;
}
