import { notFound } from 'next/navigation';

import { ComponentPageTemplate } from '@/components/component-page-template';
import { componentPagesBySlug } from '@/lib/content';

export function generateStaticParams() {
  return Object.keys(componentPagesBySlug).map((slug) => ({ slug }));
}

export default async function ComponentDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = componentPagesBySlug[slug];

  if (!page) {
    notFound();
  }

  return <ComponentPageTemplate page={page} />;
}
