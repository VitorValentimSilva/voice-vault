import { useSignIn } from '@clerk/expo';
import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { Button } from '@/component/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/component/ui/card';
import { Input } from '@/component/ui/input';
import { Label } from '@/component/ui/label';
import { Text } from '@/component/ui/text';
import { cn } from '@/lib/utils';

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const { signIn, fetchStatus } = useSignIn();
  const [error, setError] = useState<{ email?: string; password?: string }>({});

  const onSubmit = async () => {
    if (!email) {
      setError({ email: 'Email is required' });

      return;
    }

    if (fetchStatus === 'fetching') {
      return;
    }

    try {
      const { error: createError } = await signIn.create({
        identifier: email,
      });

      if (createError) {
        setError({ email: createError.longMessage ?? createError.message });

        return;
      }

      const { error: sendCodeError } = await signIn.resetPasswordEmailCode.sendCode();

      if (sendCodeError) {
        setError({ email: sendCodeError.longMessage ?? sendCodeError.message });

        return;
      }

      router.push('/(auth)/reset-password');
    } catch (err) {
      setError({ email: err instanceof Error ? err.message : 'Something went wrong' });
    }
  };

  return (
    <View className="gap-6">
      <Card className="border-border/0 shadow-none sm:border-border sm:shadow-sm sm:shadow-black/5">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-left">Forgot password?</CardTitle>

          <CardDescription className="text-center sm:text-left">
            Enter your email to reset your password
          </CardDescription>
        </CardHeader>

        <CardContent className="gap-6">
          <View className="gap-6">
            <View className="gap-1.5">
              <Label htmlFor="email">Email</Label>

              <Input
                autoCapitalize="none"
                autoComplete="email"
                defaultValue={email}
                id="email"
                keyboardType="email-address"
                placeholder="m@example.com"
                returnKeyType="send"
                onChangeText={setEmail}
                onSubmitEditing={() => void onSubmit()}
              />

              {error.email ? (
                <Text className="text-sm font-medium text-destructive">{error.email}</Text>
              ) : null}
            </View>

            <Button
              className={cn('w-full', fetchStatus === 'fetching' && 'opacity-50')}
              onPress={() => void onSubmit()}>
              <Text>Reset your password</Text>
            </Button>
          </View>
        </CardContent>
      </Card>
    </View>
  );
}
