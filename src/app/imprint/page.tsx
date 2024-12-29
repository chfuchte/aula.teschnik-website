import { JustTextLayout } from "@/components/layouts/just-text";

export default function ImpressPage() {
    return (
        <JustTextLayout>
            <h1 className="text-2xl font-bold">Impressum</h1>
            <h2 className="text-xl font-semibold">Angaben gemäß § 5 TMG</h2>
            <p>
                Aula Technik AG <br />
                Gymnasium Riedberg <br />
                Friedrich-Dessauer-Straße 2 <br />
                60438 Frankfurt am Main <br />
            </p>
            <p>
                E-Mail: technik@grb-online.net <br />
                Homepage: <a href="https://aula.teschnik.de">https://aula.teschnik.de</a> <br />
            </p>
            <h2 className="text-xl font-semibold">Verantwortliche Person</h2>
            <p>
                Christian Fuchte <br />
                E-Mail: christian.fuchte@grb-online.net
            </p>
        </JustTextLayout>
    );
}
