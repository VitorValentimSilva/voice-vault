import enUSCommon from '@/locale/en-US/common';
import enUSError from '@/locale/en-US/error';
import enUSScreen from '@/locale/en-US/screen';
import ptBRCommon from '@/locale/pt-BR/common';
import ptBRError from '@/locale/pt-BR/error';
import ptBRScreen from '@/locale/pt-BR/screen';

export const RESOURCES = {
  'en-US': {
    common: enUSCommon,
    error: enUSError,
    screen: enUSScreen,
  },
  'pt-BR': {
    common: ptBRCommon,
    error: ptBRError,
    screen: ptBRScreen,
  },
} as const;

export const DEFAULT_NAMESPACE = 'common' as const;
