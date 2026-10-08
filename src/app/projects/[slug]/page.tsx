import { LangRedirect } from "@/components/i18n/LangRedirect";
import { projects } from "@/data/projects";

export const metadata = { robots: { index: false } };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function LegacyProject({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <html lang="en">
      <body>
        <LangRedirect path={`projects/${slug}/`} />
      </body>
    </html>
  );
}
