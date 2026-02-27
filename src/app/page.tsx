'use client';

import { Award, BookOpen, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useLanguage } from '@/context/language-context';

const features = [
  {
    icon: <Sparkles className="h-10 w-10 text-primary" />,
    titleKey: 'home.feature1Title',
    descriptionKey: 'home.feature1Description',
  },
  {
    icon: <BookOpen className="h-10 w-10 text-primary" />,
    titleKey: 'home.feature2Title',
    descriptionKey: 'home.feature2Description',
  },
  {
    icon: <Award className="h-10 w-10 text-primary" />,
    titleKey: 'home.feature3Title',
    descriptionKey: 'home.feature3Description',
  },
];

export default function Home() {
  const { t } = useLanguage();
  const heroImage = PlaceHolderImages.find((img) => img.id === 'retomates-hero');

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_550px] lg:gap-12 xl:grid-cols-[1fr_650px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-4">
                  <h1 className="font-headline text-4xl font-bold tracking-tighter text-primary sm:text-5xl xl:text-6xl/none">
                    {t('home.title')}
                  </h1>
                  <p className="max-w-[600px] text-foreground/80 md:text-xl">
                    {t('home.subtitle')}
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <Link href="/dashboard">{t('home.getStarted')}</Link>
                  </Button>
                </div>
              </div>
              {heroImage && (
                <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  data-ai-hint={heroImage.imageHint}
                  width={650}
                  height={433}
                  className="mx-auto aspect-[3/2] overflow-hidden rounded-xl object-cover sm:w-full"
                />
              )}
            </div>
          </div>
        </section>
        <section id="features" className="w-full bg-secondary/50 py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
                  {t('home.featuresTitle')}
                </h2>
                <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t('home.featuresSubtitle')}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
              {features.map((feature) => (
                <Card key={feature.titleKey} className="shadow-lg">
                  <CardHeader className="flex flex-col items-center text-center gap-4">
                    {feature.icon}
                    <CardTitle className="font-headline text-2xl">{t(feature.titleKey)}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center text-foreground/80">
                    {t(feature.descriptionKey)}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="flex items-center justify-center py-6">
        <p className="text-sm text-muted-foreground">{t('home.footer')}</p>
      </footer>
    </div>
  );
}
