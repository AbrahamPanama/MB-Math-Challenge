'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Wrench, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/header';
import { useLanguage } from '@/context/language-context';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { mockSkills } from '@/lib/data';

export default function PracticePage() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');

  if (mode === 'smart-practice') {
    return (
      <div className="flex min-h-screen w-full flex-col">
        <Header title={t('practice.smartPracticeTitle')} />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            {t('practice.selectSkill')}
          </h1>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockSkills.map((skill) => (
              <Card
                key={skill.id}
                className="flex flex-col shadow-md transition-shadow hover:shadow-lg"
              >
                <CardHeader>
                  <CardTitle className="font-headline text-xl">
                    {t(skill.nameKey)}
                  </CardTitle>
                  <CardDescription>{t(skill.descriptionKey)}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow" />
                <div className="p-6 pt-0">
                  <Button asChild className="w-full">
                    <Link href={`/practice/${skill.id}`}>
                      {t('practice.startPractice')}{' '}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title={t('practice.title')} />
      <main className="flex flex-1 flex-col items-center justify-center gap-4 p-4 text-center">
        <Wrench className="h-16 w-16 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          {t('practice.constructionTitle')}
        </h1>
        <p className="text-muted-foreground">
          {t(
            mode === 'daily-mission'
              ? 'practice.dailyMissionConstruction'
              : 'practice.constructionSubtitle'
          )}
        </p>
        <Button asChild>
          <Link href="/dashboard">{t('practice.backToDashboard')}</Link>
        </Button>
      </main>
    </div>
  );
}
