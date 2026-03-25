
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
