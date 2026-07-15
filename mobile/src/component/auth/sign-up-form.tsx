import { useSignUp } from '@clerk/expo';
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
import { onEmailSubmitEditing, onSubmit } from '@/util/component/auth/sign-up-form';

export function SignUpForm() {
  const { signUp, fetchStatus } = useSignUp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<{
    email?: string;
    password?: string;
  }>({});

  const passwordInputRef = useRef<TextInput>(null);

  return (
    <View className="gap-6">
      <Card className="border-border/0 shadow-none sm:border-border sm:shadow-sm sm:shadow-black/5">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-left">Create your account</CardTitle>

          <CardDescription className="text-center sm:text-left">
            Welcome! Please fill in the details to get started.
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
                value={email}
                onChangeText={setEmail}
                onSubmitEditing={() => onEmailSubmitEditing(passwordInputRef)}
              />

              {error.email ? <Text className="text-sm text-destructive">{error.email}</Text> : null}
            </View>

            <View className="gap-1.5">
              <Label htmlFor="password">Password</Label>

              <Input
                ref={passwordInputRef}
                secureTextEntry
                id="password"
                returnKeyType="send"
                value={password}
                onChangeText={setPassword}
                onSubmitEditing={() =>
                  void onSubmit(fetchStatus, signUp, email, password, setError)
                }
              />

              {error.password ? (
                <Text className="text-sm text-destructive">{error.password}</Text>
              ) : null}
            </View>

            <Button
              className={cn('w-full', fetchStatus === 'fetching' && 'opacity-50')}
              onPress={() => void onSubmit(fetchStatus, signUp, email, password, setError)}>
              <Text>Continue</Text>
            </Button>
          </View>

          <Text className="text-center text-sm">
            Already have an account?{' '}
            <Pressable onPress={() => router.push('/(auth)/sign-in')}>
              <Text className="text-sm underline">Sign in</Text>
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
