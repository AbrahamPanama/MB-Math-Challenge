import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { mockUser, practiceModes, mockSkills } from '@/lib/data';
import { Header } from '@/components/layout/header';
import { Progress } from '@/components/ui/progress';

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="Dashboard" />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Welcome back, {mockUser.name}!
        </h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {practiceModes.map((mode) => (
            <Card key={mode.id} className="flex flex-col shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xl font-headline">
                  {mode.title}
                </CardTitle>
                <mode.icon className="h-6 w-6 text-muted-foreground" />
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">
                  {mode.description}
                </p>
              </CardContent>
              <div className="p-6 pt-0">
                <Button asChild className="w-full bg-primary hover:bg-primary/90">
                  <Link href={mode.href}>
                    Start <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-tight md:text-2xl mb-4">
            Continue Learning
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {mockSkills.slice(0, 2).map((skill) => (
              <Card key={skill.id} className="shadow-md">
                 <CardHeader>
                    <CardTitle className="text-lg">{skill.name}</CardTitle>
                    <CardDescription>You're {skill.mastery.progress}% of the way there!</CardDescription>
                </CardHeader>
                <CardContent>
                    <Progress value={skill.mastery.progress} className="h-3" />
                </CardContent>
                <div className="p-6 pt-2 flex justify-end">
                     <Button asChild variant="ghost">
                        <Link href="/practice">
                            Practice <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
