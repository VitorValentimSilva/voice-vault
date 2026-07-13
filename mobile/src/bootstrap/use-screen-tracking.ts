import { useGlobalSearchParams, usePathname } from 'expo-router';
import { useEffect, useRef } from 'react';

import { posthog } from '@/lib/posthog';

const SENSITIVE_PARAMS = new Set(['token', 'password', 'secret', 'code']);

function isPrimitiveParam(value: unknown): value is string | number | boolean {
  return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean';
}

function sanitizeParams(params: Record<string, unknown>) {
  return Object.entries(params).reduce<Record<string, string | string[]>>((acc, [key, value]) => {
    if (value == null || SENSITIVE_PARAMS.has(key)) {
      return acc;
    }

    if (Array.isArray(value)) {
      const sanitizedValues = value.filter(isPrimitiveParam).map((item) => String(item));

      if (sanitizedValues.length > 0) {
        acc[key] = sanitizedValues;
      }

      return acc;
    }

    if (isPrimitiveParam(value)) {
      acc[key] = String(value);
    }

    return acc;
  }, {});
}

export function useScreenTracking() {
  const pathname = usePathname();
  const params = useGlobalSearchParams();

  const previousPathname = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (previousPathname.current === pathname) {
      return;
    }

    const trackScreen = async () => {
      try {
        const safeParams = sanitizeParams(params);

        const screenProperties =
          previousPathname.current != null
            ? {
                ...safeParams,
                previous_screen: previousPathname.current,
              }
            : safeParams;

        await posthog.screen(pathname, screenProperties);

        previousPathname.current = pathname;
      } catch (error) {
        console.error('Failed to track screen view:', error);
      }
    };

    void trackScreen();
  }, [pathname, params]);
}
