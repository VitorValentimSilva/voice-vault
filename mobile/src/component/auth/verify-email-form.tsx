import { useSignUp } from '@clerk/expo';
import { useCallback, useEffect, useState } from 'react';
import { TextStyle, View } from 'react-native';

import { Button } from '@/component/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/component/ui/card';
import { Input } from '@/component/ui/input';
import { Label } from '@/component/ui/label';
import { Text } from '@/component/ui/text';
import { cn } from '@/lib/utils';

const RESEND_CODE_INTERVAL_SECONDS = 30;

const TABULAR_NUMBERS_STYLE: TextStyle = { fontVariant: ['tabular-nums'] };

export function VerifyEmailForm() {
  const { signUp, fetchStatus } = useSignUp();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const { countdown, restartCountdown } = useCountdown(RESEND_CODE_INTERVAL_SECONDS);

  async function onSubmit() {
    if (fetchStatus === 'fetching') {
      return;
    }

    try {
      const { error: verifyCodeError } = await signUp.verifications.verifyEmailCode({
        code,
      });

      if (verifyCodeError) {
        setError(verifyCodeError.longMessage ?? verifyCodeError.message);

        return;
      }

      if (signUp.status === 'complete') {
        await signUp.finalize();

        return;
      }
      // TODO: Handle other statuses
      console.error(JSON.stringify(signUp, null, 2));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    }
  }

  async function onResendCode() {
    if (fetchStatus === 'fetching') {
      return;
    }

    try {
      const { error: sendCodeError } = await signUp.verifications.sendEmailCode();

      if (sendCodeError) {
        setError(sendCodeError.longMessage ?? sendCodeError.message);

        return;
      }

      restartCountdown();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    }
  }

  return (
    <View className="gap-6">
      <Card className="border-border/0 shadow-none sm:border-border sm:shadow-sm sm:shadow-black/5">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-left">Verify your email</CardTitle>

          <CardDescription className="text-center sm:text-left">
            Enter the verification code sent to m@example.com
          </CardDescription>
        </CardHeader>

        <CardContent className="gap-6">
          <View className="gap-6">
            <View className="gap-1.5">
              <Label htmlFor="code">Verification code</Label>

              <Input
                autoCapitalize="none"
                autoComplete="sms-otp"
                id="code"
                keyboardType="numeric"
                returnKeyType="send"
                textContentType="oneTimeCode"
                onChangeText={setCode}
                onSubmitEditing={() => void onSubmit()}
              />

              {!error ? null : (
                <Text className="text-sm font-medium text-destructive">{error}</Text>
              )}

              <Button
                disabled={countdown > 0}
                size="sm"
                variant="link"
                onPress={() => void onResendCode()}>
                <Text className="text-center text-xs">
                  Didn&apos;t receive the code? Resend{' '}
                  {countdown > 0 ? (
                    <Text className="text-xs" style={TABULAR_NUMBERS_STYLE}>
                      ({countdown})
                    </Text>
                  ) : null}
                </Text>
              </Button>
            </View>

            <View className="gap-3">
              <Button
                className={cn('w-full', fetchStatus === 'fetching' && 'opacity-50')}
                onPress={() => void onSubmit()}>
                <Text>Continue</Text>
              </Button>

              <Button
                className="mx-auto"
                variant="link"
                onPress={() => {
                  // TODO: Navigate to sign up screen
                }}>
                <Text>Cancel</Text>
              </Button>
            </View>
          </View>
        </CardContent>
      </Card>
    </View>
  );
}

function useCountdown(seconds = 30) {
  const [countdown, setCountdown] = useState(seconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  const restartCountdown = useCallback(() => {
    setCountdown(seconds);
  }, [seconds]);

  return {
    countdown,
    restartCountdown,
  };
}
