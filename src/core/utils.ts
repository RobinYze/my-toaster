import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...classes: ClassValue[]) => twMerge(clsx(...classes));

export const genId = (() => {
    let count = 0;
    return () => {
      return (++count).toString();
    };
})();
  
export const prefersReducedMotion = (() => {
    // Cache result
    let shouldReduceMotion: boolean | undefined = undefined;
  
    return () => {
      if (shouldReduceMotion === undefined && typeof window !== 'undefined') {
        const mediaQuery = matchMedia('(prefers-reduced-motion: reduce)');
        shouldReduceMotion = !mediaQuery || mediaQuery.matches;
      }
      return shouldReduceMotion;
    };
})();

