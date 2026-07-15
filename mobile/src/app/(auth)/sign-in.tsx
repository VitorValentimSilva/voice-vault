import { View } from 'react-native';

import { SignInForm } from '@/component/auth/sign-in-form';
import { Background } from '@/component/screen/background';

export default function SignInScreen() {
  return (
    <Background
      haveParticles
      backgroundType="gradient"
      gradient="screenBackground"
      haveGlow={false}>
      <View className="flex-1 items-center justify-center">
        <SignInForm />
      </View>
    </Background>
  );
}
