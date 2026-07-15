import { View } from 'react-native';

import { ForgotPasswordForm } from '@/component/auth/forgot-password-form';
import { Background } from '@/component/screen/background';

export default function ForgotPasswordScreen() {
  return (
    <Background
      haveParticles
      backgroundType="gradient"
      gradient="screenBackground"
      haveGlow={false}>
      <View className="flex-1 items-center justify-center">
        <ForgotPasswordForm />
      </View>
    </Background>
  );
}
