import type { ReactNode } from 'react';

import { DocsSidebar } from '@/components/docs-sidebar';
import { SiteHeader } from '@/components/site-header';

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto flex max-w-7xl gap-10 px-6 py-10 lg:px-8">
        <DocsSidebar />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
