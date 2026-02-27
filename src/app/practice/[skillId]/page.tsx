'use client';

import { useState, useEffect, useMemo } from 'react';
import { Balancer } from 'react-wrap-balancer';
import {
  generateSmartPracticeProblem,
  type SmartPracticeProblemGenerationOutput,
} from '@/ai/flows/smart-practice-problem-generation';
import {
  correctiveFeedbackExplanation,
  type CorrectiveFeedbackExplanationOutput,
} from '@/ai/flows/corrective-feedback-explanation';
import {
  generateProgressiveHint,
  type ProgressiveHintOutput,
} from '@/ai/flows/progressive-hint-generation';
import { mockSkills } from '@/lib/data';
import { useLanguage } from '@/context/language-context';
import { Header } from '@/components/layout/header';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Lightbulb, CheckCircle2, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Skill } from '@/lib/types';

export default function PracticeSessionPage({
  params,
}: {
  params: { skillId: Skill['id'] };
}) {
  const { skillId } = params;
  const { t } = useLanguage();
  const { toast } = useToast();

  const [problem, setProblem] =
    useState<SmartPracticeProblemGenerationOutput | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [feedback, setFeedback] =
    useState<CorrectiveFeedbackExplanationOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isChecking, setIsChecking] = useState(false);

  const [hint, setHint] = useState<ProgressiveHintOutput | null>(null);
  const [hintLevel, setHintLevel] = useState(1);
  const [isHintLoading, setIsHintLoading] = useState(false);

  const skill = useMemo(
    () => mockSkills.find((s) => s.id === skillId),
    [skillId]
  );

  const getNewProblem = async () => {
    setIsLoading(true);
    setProblem(null);
    setUserAnswer('');
    setIsCorrect(null);
    setFeedback(null);
    setHint(null);
    setHintLevel(1);

    if (!skill) return;

    try {
      const newProblem = await generateSmartPracticeProblem({
        skillArea: skill.id,
        level: 'L1', // This can be made dynamic based on user progress later
      });
      setProblem(newProblem);
    } catch (error) {
      console.error('Error generating problem:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not load a new problem. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getNewProblem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skill]);

  const handleCheckAnswer = async () => {
    if (!problem) return;
    setIsChecking(true);
    const isAnswerCorrect = userAnswer.trim() === problem.correctAnswer;
    setIsCorrect(isAnswerCorrect);

    if (!isAnswerCorrect) {
      try {
        const explanation = await correctiveFeedbackExplanation({
          problem: problem.question,
          childAnswer: userAnswer,
          correctAnswer: problem.correctAnswer,
          skillArea: skill?.id || 'general',
        });
        setFeedback(explanation);
      } catch (error) {
        console.error('Error getting feedback:', error);
      }
    }
    setIsChecking(false);
  };

  const handleGetHint = async () => {
    if (!problem || hintLevel > 3) return;
    setIsHintLoading(true);
    try {
      const newHint = await generateProgressiveHint({
        problem: problem.question,
        hintLevel: hintLevel as 1 | 2 | 3,
        incorrectAnswer: isCorrect === false ? userAnswer : undefined,
      });
      setHint(newHint);
      setHintLevel((prev) => prev + 1);
    } catch (error) {
      console.error('Error getting hint:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not load a hint. Please try again.',
      });
    } finally {
      setIsHintLoading(false);
    }
  };

  if (!skill) {
    return (
      <div>
        <Header title="Error" />
        <main className="p-4">Skill not found.</main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header
        title={`${t('practice.smartPracticeTitle')}: ${t(skill.nameKey)}`}
      />
      <main className="flex flex-1 items-center justify-center p-4">
        <Card className="w-full max-w-2xl shadow-2xl">
          <CardHeader>
            <CardTitle className="text-center font-headline text-3xl md:text-4xl">
              {isLoading ? (
                <Skeleton className="mx-auto h-10 w-3/4" />
              ) : (
                <Balancer>{problem?.question}</Balancer>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="mx-auto h-10 w-1/2" />
              </div>
            ) : (
              <>
                <div className="flex items-center justify-center">
                  <Input
                    id="answer"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder={t('practice.finalAnswer')}
                    className="h-14 max-w-xs text-center text-2xl"
                    disabled={isCorrect !== null}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && userAnswer) {
                        handleCheckAnswer();
                      }
                    }}
                  />
                </div>

                {isCorrect !== null && (
                  <Alert
                    variant={isCorrect ? 'default' : 'destructive'}
                    className={isCorrect ? 'border-green-600/50 bg-green-50 text-green-900' : ''}
                  >
                    {isCorrect ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4" />
                    )}
                    <AlertTitle className={isCorrect ? 'text-green-800' : ''}>
                      {isCorrect ? t('practice.correct') : t('practice.incorrect')}
                    </AlertTitle>
                    <AlertDescription>
                      {!isCorrect && (
                        <p className="mb-2">
                          {t('practice.correctAnswerIs', {
                            correctAnswer: problem?.correctAnswer,
                          })}
                        </p>
                      )}
                      {feedback && <p>{feedback.explanation}</p>}
                      {feedback?.microStrategyTip && (
                        <p className="mt-2 text-xs italic">
                          {feedback.microStrategyTip}
                        </p>
                      )}
                    </AlertDescription>
                  </Alert>
                )}

                {hint && (
                  <Alert variant="default" className="border-blue-600/50 bg-blue-50 text-blue-900">
                    <Lightbulb className="h-4 w-4 text-blue-600" />
                    <AlertTitle className="text-blue-800">Hint</AlertTitle>
                    <AlertDescription>{hint.hint}</AlertDescription>
                  </Alert>
                )}
              </>
            )}
          </CardContent>
          <CardFooter className="flex flex-col items-center justify-center gap-4">
            {isCorrect === null ? (
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button
                  onClick={handleCheckAnswer}
                  disabled={isChecking || !userAnswer}
                >
                  {isChecking
                    ? t('practice.checking')
                    : t('practice.checkAnswer')}
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleGetHint}
                  disabled={isHintLoading || hintLevel > 3}
                >
                  <Lightbulb className="mr-2 h-4 w-4" /> {t('practice.showHint')}
                </Button>
              </div>
            ) : (
              <Button onClick={getNewProblem}>{t('practice.nextQuestion')}</Button>
            )}
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
