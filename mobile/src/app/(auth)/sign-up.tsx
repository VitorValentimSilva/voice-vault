import { View } from 'react-native';

import { SignUpForm } from '@/component/auth/sign-up-form';
import { Background } from '@/component/screen/background';

export default function SignUpScreen() {
  return (
    <Background
      haveParticles
      backgroundType="gradient"
      gradient="screenBackground"
      haveGlow={false}>
      <View className="flex-1 items-center justify-center">
        <SignUpForm />
      </View>
    </Background>
  );
}
