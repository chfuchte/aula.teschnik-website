import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: "/images/",
        },
        sitemap: "https://aula.teschnik.de/sitemap.xml",
    };
}
