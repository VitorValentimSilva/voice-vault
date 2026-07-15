import { useSignIn } from '@clerk/expo';
import { useRef, useState } from 'react';
import { TextInput, View } from 'react-native';

import { Button } from '@/component/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/component/ui/card';
import { Input } from '@/component/ui/input';
import { Label } from '@/component/ui/label';
import { Text } from '@/component/ui/text';
import { cn } from '@/lib/utils';

export function ResetPasswordForm() {
  const { signIn, fetchStatus } = useSignIn();

  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState({ code: '', password: '' });

  const codeInputRef = useRef<TextInput>(null);

  async function onSubmit() {
    if (fetchStatus === 'fetching') {
      return;
    }

    try {
      const { error: verifyCodeError } = await signIn.resetPasswordEmailCode.verifyCode({
        code,
      });

      if (verifyCodeError) {
        setError({ code: verifyCodeError.longMessage ?? verifyCodeError.message, password: '' });

        return;
      }

      const { error: submitPasswordError } = await signIn.resetPasswordEmailCode.submitPassword({
        password,
      });

      if (submitPasswordError) {
        setError({
          code: '',
          password: submitPasswordError.longMessage ?? submitPasswordError.message,
        });

        return;
      }

      if (signIn.status === 'complete') {
        await signIn.finalize();

        return;
      }
      // TODO: Handle other statuses
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong';
      const isPasswordMessage = message.toLowerCase().includes('password');
      setError({
        code: isPasswordMessage ? '' : message,
        password: isPasswordMessage ? message : '',
      });

      console.error(err);
    }
  }

  function onPasswordSubmitEditing() {
    codeInputRef.current?.focus();
  }

  return (
    <View className="gap-6">
      <Card className="border-border/0 shadow-none sm:border-border sm:shadow-sm sm:shadow-black/5">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-left">Reset password</CardTitle>

          <CardDescription className="text-center sm:text-left">
            Enter the code sent to your email and set a new password
          </CardDescription>
        </CardHeader>

        <CardContent className="gap-6">
          <View className="gap-6">
            <View className="gap-1.5">
              <View className="flex-row items-center">
                <Label htmlFor="password">New password</Label>
              </View>

              <Input
                secureTextEntry
                id="password"
                returnKeyType="next"
                submitBehavior="submit"
                onChangeText={setPassword}
                onSubmitEditing={onPasswordSubmitEditing}
              />

              {error.password ? (
                <Text className="text-sm font-medium text-destructive">{error.password}</Text>
              ) : null}
            </View>

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

              {error.code ? (
                <Text className="text-sm font-medium text-destructive">{error.code}</Text>
              ) : null}
            </View>

            <Button
              className={cn('w-full', fetchStatus === 'fetching' && 'opacity-50')}
              onPress={() => void onSubmit()}>
              <Text>Reset Password</Text>
            </Button>
          </View>
        </CardContent>
      </Card>
    </View>
  );
}
