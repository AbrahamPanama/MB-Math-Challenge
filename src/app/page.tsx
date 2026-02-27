import { Award, BookOpen, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const features = [
  {
    icon: <Sparkles className="h-10 w-10 text-primary" />,
    title: 'Adaptive Learning',
    description:
      'Problems adjust to your level, keeping you challenged but not overwhelmed.',
  },
  {
    icon: <BookOpen className="h-10 w-10 text-primary" />,
    title: 'Engaging Content',
    description:
      'Master core skills with fun challenges and immediate, helpful feedback.',
  },
  {
    icon: <Award className="h-10 w-10 text-primary" />,
    title: 'Track Your Progress',
    description:
      'Watch your skills grow, earn stars for mastery, and build your streak.',
  },
];

export default function Home() {
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
                    Welcome to RetoMates
                  </h1>
                  <p className="max-w-[600px] text-foreground/80 md:text-xl">
                    Your personal math challenge partner. Master arithmetic
                    with fun, adaptive practice designed to build confidence and
                    skills.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <Link href="/dashboard">Get Started</Link>
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
                  Unlock Your Math Superpowers
                </h2>
                <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  RetoMates is built on proven learning principles to help you
                  succeed.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
              {features.map((feature) => (
                <Card key={feature.title} className="shadow-lg">
                  <CardHeader className="flex flex-col items-center text-center gap-4">
                    {feature.icon}
                    <CardTitle className="font-headline text-2xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center text-foreground/80">
                    {feature.description}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="flex items-center justify-center py-6">
        <p className="text-sm text-muted-foreground">© 2024 RetoMates. All rights reserved.</p>
      </footer>
    </div>
  );
}
