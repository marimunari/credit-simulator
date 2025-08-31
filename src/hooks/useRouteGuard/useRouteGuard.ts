'use client';

// system
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// contexts
import { useSimulation } from '@/src/contexts/SimulationContext/SimulationContext';

// types
type GuardCondition = () => boolean;

export const useRouteGuard = (condition: GuardCondition, redirectTo: string) => {
  const router = useRouter();
  const { isLoading } = useSimulation();

  useEffect(() => {
    if (!isLoading && !condition()) {
      router.replace(redirectTo);
    }
  }, [condition, redirectTo, router, isLoading]);
};
