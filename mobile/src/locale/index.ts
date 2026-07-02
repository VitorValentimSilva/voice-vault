import enUSCommon from '@/locale/en-US/common';
import ptBRCommon from '@/locale/pt-BR/common';

export const RESOURCES = {
  'en-US': {
    common: enUSCommon,
  },
  'pt-BR': {
    common: ptBRCommon,
  },
} as const;

export const DEFAULT_NAMESPACE = 'common' as const;
