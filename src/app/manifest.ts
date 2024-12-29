import { defaultMetadata } from "@/globals";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: defaultMetadata.title,
        short_name: "ATec",
        description: defaultMetadata.description,
        start_url: "/",
        display: "browser",
        icons: [
            {
                src: "/favicon.ico",
                sizes: "any",
                type: "image/x-icon",
            },
        ],
    };
}
