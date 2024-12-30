import type { Config } from "tailwindcss";
import twAnimate from "tailwindcss-animate";

export default {
    darkMode: ["class"],
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            colors: {
                "atec-yellow": {
                    "50": "hsl(var(--atec-yellow-50))",
                    "100": "hsl(var(--atec-yellow-100))",
                    "200": "hsl(var(--atec-yellow-200))",
                    "300": "hsl(var(--atec-yellow-300))",
                    "400": "hsl(var(--atec-yellow-400))",
                    "500": "hsl(var(--atec-yellow-500))",
                    "600": "hsl(var(--atec-yellow-600))",
                    "700": "hsl(var(--atec-yellow-700))",
                    "800": "hsl(var(--atec-yellow-800))",
                    "900": "hsl(var(--atec-yellow-900))",
                    "950": "hsl(var(--atec-yellow-950))",
                },
                "atec-blue": {
                    "50": "hsl(var(--atec-blue-50))",
                    "100": "hsl(var(--atec-blue-100))",
                    "200": "hsl(var(--atec-blue-200))",
                    "300": "hsl(var(--atec-blue-300))",
                    "400": "hsl(var(--atec-blue-400))",
                    "500": "hsl(var(--atec-blue-500))",
                    "600": "hsl(var(--atec-blue-600))",
                    "700": "hsl(var(--atec-blue-700))",
                    "800": "hsl(var(--atec-blue-800))",
                    "900": "hsl(var(--atec-blue-900))",
                    "950": "hsl(var(--atec-blue-950))",
                },
                "atec-purple": {
                    "50": "hsl(var(--atec-purple-50))",
                    "100": "hsl(var(--atec-purple-100))",
                    "200": "hsl(var(--atec-purple-200))",
                    "300": "hsl(var(--atec-purple-300))",
                    "400": "hsl(var(--atec-purple-400))",
                    "500": "hsl(var(--atec-purple-500))",
                    "600": "hsl(var(--atec-purple-600))",
                    "700": "hsl(var(--atec-purple-700))",
                    "800": "hsl(var(--atec-purple-800))",
                    "900": "hsl(var(--atec-purple-900))",
                    "950": "hsl(var(--atec-purple-950))",
                },
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                chart: {
                    "1": "hsl(var(--chart-1))",
                    "2": "hsl(var(--chart-2))",
                    "3": "hsl(var(--chart-3))",
                    "4": "hsl(var(--chart-4))",
                    "5": "hsl(var(--chart-5))",
                },
                sidebar: {
                    DEFAULT: "hsl(var(--sidebar-background))",
                    foreground: "hsl(var(--sidebar-foreground))",
                    primary: "hsl(var(--sidebar-primary))",
                    "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
                    accent: "hsl(var(--sidebar-accent))",
                    "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
                    border: "hsl(var(--sidebar-border))",
                    ring: "hsl(var(--sidebar-ring))",
                },
            },
            keyframes: {
                "accordion-down": {
                    from: {
                        height: "0",
                    },
                    to: {
                        height: "var(--radix-accordion-content-height)",
                    },
                },
                "accordion-up": {
                    from: {
                        height: "var(--radix-accordion-content-height)",
                    },
                    to: {
                        height: "0",
                    },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [twAnimate],
} satisfies Config;
