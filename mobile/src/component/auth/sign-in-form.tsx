import { useSignIn } from '@clerk/expo';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';

import { SocialConnections } from '@/component/auth/social-connections';
import { Button } from '@/component/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/component/ui/card';
import { Input } from '@/component/ui/input';
import { Label } from '@/component/ui/label';
import { Separator } from '@/component/ui/separator';
import { Text } from '@/component/ui/text';
import { cn } from '@/lib/utils';

export function SignInForm() {
  const { signIn, fetchStatus } = useSignIn();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<{ email?: string; password?: string }>({});

  const passwordInputRef = useRef<TextInput>(null);

  async function onSubmit() {
    if (!signIn || fetchStatus === 'fetching') {
      return;
    }

    try {
      const { error } = await signIn.password({
        identifier: emailAddress,
        password,
      });

      if (error) {
        const message = error.longMessage ?? error.message;
        const isEmailMessage =
          message.toLowerCase().includes('identifier') || message.toLowerCase().includes('email');

        setError(isEmailMessage ? { email: message } : { password: message });

        return;
      }

      if (signIn.status === 'complete') {
        await signIn.finalize();

        return;
      }

      if (signIn.status === 'needs_client_trust') {
        setError({
          password: 'Additional verification is required before this device can sign in.',
        });

        return;
      }

      console.error(JSON.stringify(signIn, null, 2));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong';
      const isEmailMessage =
        message.toLowerCase().includes('identifier') || message.toLowerCase().includes('email');

      setError(isEmailMessage ? { email: message } : { password: message });
    }
  }

  function onEmailSubmitEditing() {
    passwordInputRef.current?.focus();
  }

  return (
    <View className="gap-6">
      <Card className="border-border/0 shadow-none sm:border-border sm:shadow-sm sm:shadow-black/5">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-left">Sign in to clerk-auth</CardTitle>

          <CardDescription className="text-center sm:text-left">
            Welcome back! Please sign in to continue
          </CardDescription>
        </CardHeader>

        <CardContent className="gap-6">
          <View className="gap-6">
            <View className="gap-1.5">
              <Label htmlFor="email">Email</Label>

              <Input
                autoCapitalize="none"
                autoComplete="email"
                id="email"
                keyboardType="email-address"
                placeholder="m@example.com"
                returnKeyType="next"
                submitBehavior="submit"
                value={emailAddress}
                onChangeText={setEmailAddress}
                onSubmitEditing={onEmailSubmitEditing}
              />

              {error.email ? (
                <Text className="text-sm font-medium text-destructive">{error.email}</Text>
              ) : null}
            </View>

            <View className="gap-1.5">
              <View className="flex-row items-center">
                <Label htmlFor="password">Password</Label>

                <Button
                  className="ml-auto h-4 px-1 py-0 web:h-fit sm:h-4"
                  size="sm"
                  variant="link"
                  onPress={() => router.push('/(auth)/forgot-password')}>
                  <Text className="font-normal leading-4">Forgot your password?</Text>
                </Button>
              </View>

              <Input
                ref={passwordInputRef}
                secureTextEntry
                id="password"
                returnKeyType="send"
                value={password}
                onChangeText={setPassword}
                onSubmitEditing={() => void onSubmit()}
              />

              {error.password ? (
                <Text className="text-sm font-medium text-destructive">{error.password}</Text>
              ) : null}
            </View>

            <Button
              className={cn('w-full', fetchStatus === 'fetching' && 'opacity-50')}
              disabled={fetchStatus === 'fetching'}
              onPress={() => void onSubmit()}>
              <Text>Continue</Text>
            </Button>
          </View>

          <Text className="text-center text-sm">
            Don&apos;t have an account?{' '}
            <Pressable onPress={() => router.push('/(auth)/sign-up')}>
              <Text className="text-sm underline underline-offset-4">Sign up</Text>
            </Pressable>
          </Text>

          <View className="flex-row items-center">
            <Separator className="flex-1" />

            <Text className="px-4 text-sm text-muted-foreground">or</Text>

            <Separator className="flex-1" />
          </View>

          <SocialConnections />
        </CardContent>
      </Card>
    </View>
  );
}
