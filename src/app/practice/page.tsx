import Link from 'next/link';
import { Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/header';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/layout/sidebar-nav';

export default function PracticePage() {
  return (
    <SidebarProvider>
      <SidebarNav />
      <SidebarInset>
        <div className="flex min-h-screen w-full flex-col">
          <Header title="Practice Mode" />
          <main className="flex flex-1 flex-col items-center justify-center gap-4 p-4 text-center">
            <Wrench className="h-16 w-16 text-primary" />
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              Practice Arena Under Construction!
            </h1>
            <p className="text-muted-foreground">
              This is where the magic will happen. Get ready for some math
              challenges!
            </p>
            <Button asChild>
              <Link href="/dashboard">Back to Dashboard</Link>
            </Button>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
