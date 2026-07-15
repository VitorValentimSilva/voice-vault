import { useSignUp } from '@clerk/expo';
import { router } from 'expo-router';
import { Dispatch, RefObject, SetStateAction } from 'react';
import { TextInput } from 'react-native';

import Logger from '@/lib/logger';
import { posthog } from '@/lib/posthog';

export async function onSubmit(
  fetchStatus: ReturnType<typeof useSignUp>['fetchStatus'],
  signUp: ReturnType<typeof useSignUp>['signUp'],
  email: string,
  password: string,
  setError: Dispatch<SetStateAction<{ email?: string; password?: string }>>
) {
  if (fetchStatus === 'fetching') {
    Logger.debug({
      message: 'Signup ignored because request is already running.',
    });

    return;
  }

  try {
    Logger.info({
      message: 'Signup started.',
    });

    posthog.capture('signup_started', {
      method: 'email',
      atform: 'mobile',
    });

    const { error: signUpError } = await signUp.password({
      emailAddress: email,
      password,
    });

    if (signUpError) {
      const message = signUpError.longMessage ?? signUpError.message;

      Logger.warn({
        message: 'Signup validation failed.',
        data: {
          reason: message,
        },
      });

      const isEmailError =
        message.toLowerCase().includes('email') || message.toLowerCase().includes('identifier');

      posthog.capture('signup_failed', {
        method: 'email',
        platform: 'mobile',
        type: 'clerk',
        field: isEmailError ? 'email' : 'password',
      });

      setError(isEmailError ? { email: message } : { password: message });

      return;
    }

    const { error: verificationError } = await signUp.verifications.sendEmailCode();

    if (verificationError) {
      Logger.warn({
        message: 'Failed to send signup verification email.',
        data: {
          reason: verificationError.longMessage ?? verificationError.message,
        },
      });

      posthog.capture('signup_failed', {
        method: 'email',
        platform: 'mobile',
        type: 'clerk_validation',
        field: 'email',
      });

      setError({
        email: verificationError.longMessage ?? verificationError.message,
      });

      return;
    }

    Logger.info({
      message: 'Signup verification email sent.',
    });

    posthog.capture('signup_verification_sent', {
      method: 'email',
      platform: 'mobile',
    });

    router.push('/(auth)/verify-email');
  } catch (error) {
    Logger.exception({
      message: 'Signup failed unexpectedly.',
      error,
      tags: {
        area: 'authentication',
        flow: 'signup',
      },
    });

    posthog.capture('signup_unexpected_error', {
      method: 'email',
      platform: 'mobile',
    });

    setError({
      email: error instanceof Error ? error.message : 'Something went wrong',
    });
  }
}

export function onEmailSubmitEditing(passwordInputRef: RefObject<TextInput | null>) {
  passwordInputRef.current?.focus();
}
