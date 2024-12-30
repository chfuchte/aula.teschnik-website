import { Layout } from "@/components/layouts/base";
import { getUser } from "@/lib/actions/auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [success] = await getUser();

    if (success) {
        return redirect("/dashboard");
    }

    return <Layout variant="top-center">{children}</Layout>;
}
