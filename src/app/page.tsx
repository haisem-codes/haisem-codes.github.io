import { LangRedirect } from "@/components/i18n/LangRedirect";

export const metadata = { robots: { index: false } };

export default function Root() {
  return (
    <html lang="en">
      <body>
        <LangRedirect />
      </body>
    </html>
  );
}
