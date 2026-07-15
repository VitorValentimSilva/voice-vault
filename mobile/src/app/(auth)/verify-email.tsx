import { View } from 'react-native';

import { VerifyEmailForm } from '@/component/auth/verify-email-form';
import { Background } from '@/component/screen/background';

export default function VerifyEmailScreen() {
  return (
    <Background
      haveParticles
      backgroundType="gradient"
      gradient="screenBackground"
      haveGlow={false}>
      <View className="flex-1 items-center justify-center">
        <VerifyEmailForm />
      </View>
    </Background>
  );
}
