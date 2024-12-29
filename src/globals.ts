import { Metadata } from "next";

export function buildTitle(title: string): string {
    return `${title} | ATec`;
}

export const defaultMetadata = {
    title: "ATec Gymnasium Riedberg",
    description: "Die Aula Technik des Gymnasiums Riedberg",
    keywords: ["Aula", "Technik", "Gymnasium", "Riedberg", "Veranstaltungen", "Schule", "ATec"],
    authors: {
        name: "Aula Technik Gymnasium Riedberg",
        url: "https://aula.teschnik.de",
    },
    robots: "index, follow",
    twitter: {
        card: "summary",
        title: "Aula Technik am Gymnasiums Riedberg",
        description: "Die Website der Aula Technik AG des Gymnasiums Riedberg",
    },
    openGraph: {
        type: "website",
        title: "Aula Technik am Gymnasiums Riedberg",
        description: "Die Website der Aula Technik AG des Gymnasiums Riedberg",
        url: "https://aula.teschnik.de",
        locale: "de_DE",
        siteName: "ATec Gymnasium Riedberg",
    },
} as const satisfies Metadata;
