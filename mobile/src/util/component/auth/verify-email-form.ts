import { useSignUp } from '@clerk/expo';
import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';

import Logger from '@/lib/logger';
import { posthog } from '@/lib/posthog';

export function useCountdown(
  countdown: number,
  setCountdown: Dispatch<SetStateAction<number>>,
  seconds = 30
) {
  useEffect(() => {
    if (countdown <= 0) {
      return;
    }

    const interval = setInterval(() => {
      setCountdown((previous) => {
        if (previous <= 1) {
          clearInterval(interval);

          return 0;
        }

        return previous - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown, setCountdown]);

  const restartCountdown = useCallback(() => {
    setCountdown(seconds);
  }, [seconds, setCountdown]);

  return {
    countdown,
    restartCountdown,
  };
}

export async function onResendCode(
  fetchStatus: ReturnType<typeof useSignUp>['fetchStatus'],
  signUp: ReturnType<typeof useSignUp>['signUp'],
  setError: Dispatch<SetStateAction<string>>,
  restartCountdown: () => void
) {
  if (fetchStatus === 'fetching') {
    Logger.debug({
      message: 'Resend verification code ignored because request is already running.',
    });

    return;
  }

  try {
    Logger.info({
      message: 'Resending verification code.',
    });

    posthog.capture('email_verification_code_resend_started', {
      method: 'email',
      platform: 'mobile',
    });

    const { error: sendCodeError } = await signUp.verifications.sendEmailCode();

    if (sendCodeError) {
      const message = sendCodeError.longMessage ?? sendCodeError.message;

      Logger.warn({
        message: 'Failed to resend verification code.',
        data: {
          reason: message,
        },
      });

      posthog.capture('email_verification_code_resend_failed', {
        method: 'email',
        platform: 'mobile',
        provider: 'clerk',
      });

      setError(message);

      return;
    }

    Logger.info({
      message: 'Verification code resent successfully.',
    });

    posthog.capture('email_verification_code_resent', {
      method: 'email',
      platform: 'mobile',
    });

    restartCountdown();
  } catch (error) {
    Logger.exception({
      message: 'Unexpected error while resending email verification code.',
      error,
      tags: {
        area: 'authentication',
        flow: 'email_verification',
        action: 'resend_code',
      },
    });

    posthog.capture('email_verification_code_resend_error', {
      method: 'email',
      platform: 'mobile',
    });

    setError(error instanceof Error ? error.message : 'Something went wrong');
  }
}

export async function onSubmit(
  fetchStatus: ReturnType<typeof useSignUp>['fetchStatus'],
  signUp: ReturnType<typeof useSignUp>['signUp'],
  code: string,
  setError: Dispatch<SetStateAction<string>>
) {
  if (fetchStatus === 'fetching') {
    Logger.debug({
      message: 'Verify email ignored because request is already running.',
    });

    return;
  }

  try {
    Logger.info({
      message: 'Email verification started.',
    });

    posthog.capture('email_verification_started', {
      method: 'email',
      platform: 'mobile',
    });

    const { error: verifyCodeError } = await signUp.verifications.verifyEmailCode({
      code,
    });

    if (verifyCodeError) {
      const message = verifyCodeError.longMessage ?? verifyCodeError.message;

      Logger.warn({
        message: 'Email verification failed.',
        data: {
          reason: message,
        },
      });

      posthog.capture('email_verification_failed', {
        method: 'email',
        platform: 'mobile',
        provider: 'clerk',
        reason: 'invalid_code',
      });

      setError(message);

      return;
    }

    switch (signUp.status) {
      case 'complete': {
        Logger.info({
          message: 'Email verification completed.',
        });

        posthog.capture('email_verified', {
          method: 'email',
          platform: 'mobile',
        });

        await signUp.finalize();

        posthog.capture('signup_completed', {
          method: 'email',
          platform: 'mobile',
        });

        return;
      }

      case 'missing_requirements': {
        Logger.warn({
          message: 'Email verification succeeded but signup has missing requirements.',
          data: {
            missingFields: signUp.requiredFields,
          },
        });

        posthog.capture('email_verification_missing_requirements', {
          method: 'email',
          platform: 'mobile',
          provider: 'clerk',
        });

        setError(
          'Your email was verified, but some information is still required to complete your account.'
        );

        return;
      }

      case 'abandoned': {
        Logger.warn({
          message: 'Signup was abandoned after email verification.',
        });

        posthog.capture('email_verification_signup_abandoned', {
          method: 'email',
          platform: 'mobile',
          provider: 'clerk',
        });

        setError('This signup session has expired. Please start again.');

        return;
      }

      default: {
        Logger.warn({
          message: 'Unknown signup status after email verification.',
          data: {
            status: signUp.status,
          },
        });

        posthog.capture('email_verification_unknown_status', {
          method: 'email',
          platform: 'mobile',
          status: signUp.status,
        });

        setError('Something went wrong. Please try again.');

        return;
      }
    }
  } catch (error) {
    Logger.exception({
      message: 'Unexpected error while verifying email.',
      error,
      tags: {
        area: 'authentication',
        flow: 'email_verification',
        action: 'verify_code',
      },
    });

    posthog.capture('email_verification_unexpected_error', {
      method: 'email',
      platform: 'mobile',
    });

    setError(error instanceof Error ? error.message : 'Something went wrong');
  }
}
