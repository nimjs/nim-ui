import { CodeBlock } from './code-block';
import { ComponentPreview } from './component-preview';

import type { ComponentPage } from '@/content/types';

export function ComponentPageTemplate({ page }: { page: ComponentPage }) {
  return (
    <article className="max-w-4xl space-y-10">
      <header className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-brand-red)]">
          {page.eyebrow}
        </p>
        <h1 className="font-display text-5xl font-semibold">
          {page.title}
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
          {page.description}
        </p>
      </header>

      <section className="space-y-5">
        <h2 className="font-display text-3xl font-semibold">
          Preview
        </h2>
        <div className="rounded-[1.5rem] border border-border bg-white p-6 shadow-soft">
          <ComponentPreview preview={page.preview} />
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="font-display text-3xl font-semibold">
          Usage
        </h2>
        <CodeBlock code={page.code} label={`${page.title} example`} language="tsx" />
      </section>

      <section className="space-y-5">
        <h2 className="font-display text-3xl font-semibold">
          System metadata
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-[1.25rem] border border-border bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-red)]">
              Registry
            </p>
            <p className="mt-3 text-lg font-semibold">{page.meta.registry}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Category: {page.manifest.category}
            </p>
          </div>
          <div className="rounded-[1.25rem] border border-border bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-red)]">
              Tokens
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {page.meta.tokens.map((token) => (
                <span
                  className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground"
                  key={token}
                >
                  {token}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-[1.25rem] border border-border bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-red)]">
              Dependencies
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {page.meta.dependencies.map((dependency) => (
                <span
                  className="rounded-full border border-border px-3 py-1 text-xs font-medium text-foreground"
                  key={dependency}
                >
                  {dependency}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {page.sections.map((section) => (
        <section className="space-y-5" key={section.title}>
          <h2 className="font-display text-3xl font-semibold">
            {section.title}
          </h2>
          {section.paragraphs.map((paragraph) => (
            <p className="text-base leading-8 text-muted-foreground" key={paragraph}>
              {paragraph}
            </p>
          ))}
          {section.list ? (
            <ul className="space-y-2 pl-5 text-base leading-8 text-muted-foreground">
              {section.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
    </article>
  );
}
