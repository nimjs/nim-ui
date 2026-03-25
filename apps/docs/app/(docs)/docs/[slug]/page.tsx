import { notFound } from 'next/navigation';

import { DocsPageTemplate } from '@/components/docs-page-template';
import { docsPagesBySlug } from '@/lib/content';

export function generateStaticParams() {
  return Object.keys(docsPagesBySlug).map((slug) => ({ slug }));
}

export default async function DocDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = docsPagesBySlug[slug];

  if (!page) {
    notFound();
  }

  return <DocsPageTemplate page={page} />;
}
