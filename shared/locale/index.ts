import enUSButton from '@/locale/en-US/button';
import enUSCommon from '@/locale/en-US/common';
import enUSError from '@/locale/en-US/error';
import enUSScreen from '@/locale/en-US/screen';
import ptBRButton from '@/locale/pt-BR/button';
import ptBRCommon from '@/locale/pt-BR/common';
import ptBRError from '@/locale/pt-BR/error';
import ptBRScreen from '@/locale/pt-BR/screen';

export const RESOURCES = {
  'en-US': {
    common: enUSCommon,
    error: enUSError,
    screen: enUSScreen,
    button: enUSButton,
  },
  'pt-BR': {
    common: ptBRCommon,
    error: ptBRError,
    screen: ptBRScreen,
    button: ptBRButton,
  },
} as const;

export const DEFAULT_NAMESPACE = 'common' as const;
