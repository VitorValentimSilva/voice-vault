import enUSCommon from '@/locale/en-US/common';
import enUSError from '@/locale/en-US/error';
import ptBRCommon from '@/locale/pt-BR/common';
import ptBRError from '@/locale/pt-BR/error';

export const RESOURCES = {
  'en-US': {
    common: enUSCommon,
    error: enUSError,
  },
  'pt-BR': {
    common: ptBRCommon,
    error: ptBRError,
  },
} as const;

export const DEFAULT_NAMESPACE = 'common' as const;
