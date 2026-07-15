import { useSignUp } from '@clerk/expo';
import { router } from 'expo-router';
import { useState } from 'react';
import { TextStyle, View } from 'react-native';

import { Button } from '@/component/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/component/ui/card';
import { Input } from '@/component/ui/input';
import { Label } from '@/component/ui/label';
import { Text } from '@/component/ui/text';
import { cn } from '@/lib/utils';
import { onResendCode, onSubmit, useCountdown } from '@/util/component/auth/verify-email-form';

const RESEND_CODE_INTERVAL_SECONDS = 30;

const TABULAR_NUMBERS_STYLE: TextStyle = { fontVariant: ['tabular-nums'] };

export function VerifyEmailForm() {
  const { signUp, fetchStatus } = useSignUp();

  const [countdown, setCountdown] = useState(RESEND_CODE_INTERVAL_SECONDS);

  const { countdown: countdownRemaining, restartCountdown } = useCountdown(
    countdown,
    setCountdown,
    RESEND_CODE_INTERVAL_SECONDS
  );

  const [code, setCode] = useState('');
  const [error, setError] = useState('');

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
                onSubmitEditing={() => void onSubmit(fetchStatus, signUp, code, setError)}
              />

              {!error ? null : (
                <Text className="text-sm font-medium text-destructive">{error}</Text>
              )}

              <Button
                disabled={countdownRemaining > 0}
                size="sm"
                variant="link"
                onPress={() => void onResendCode(fetchStatus, signUp, setError, restartCountdown)}>
                <Text className="text-center text-xs">
                  Didn&apos;t receive the code? Resend{' '}
                  {countdownRemaining > 0 ? (
                    <Text className="text-xs" style={TABULAR_NUMBERS_STYLE}>
                      ({countdownRemaining})
                    </Text>
                  ) : null}
                </Text>
              </Button>
            </View>

            <View className="gap-3">
              <Button
                className={cn('w-full', fetchStatus === 'fetching' && 'opacity-50')}
                onPress={() => void onSubmit(fetchStatus, signUp, code, setError)}>
                <Text>Continue</Text>
              </Button>

              <Button
                className="mx-auto"
                variant="link"
                onPress={() => router.push('/(auth)/sign-up')}>
                <Text>Cancel</Text>
              </Button>
            </View>
          </View>
        </CardContent>
      </Card>
    </View>
  );
}
