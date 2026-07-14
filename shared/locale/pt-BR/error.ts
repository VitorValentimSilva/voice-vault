const error = {
  errorMessage: 'Mensagem de erro',
  unknownError: 'Erro desconhecido. Tente novamente em breve.',
  fallback: {
    title: 'Erro inesperado',
    description: 'Algo deu errado e o app não conseguiu concluir esta ação.',
  },
  clerk: {
    missingPublishableKey:
      'Chave publicável do Clerk em falta. Por favor, verifique suas variáveis de ambiente.',
  },
  codes: {
    // * REDIS:
    REDIS_INVALID_TTL_DURATION: {
      title: 'Duração de cache inválida',
      description: 'A duração do cache não é válida.',
    },
    REDIS_INVALID_SECONDS_DURATION: {
      title: 'Duração de cache inválida',
      description: 'A duração do cache em segundos não é válida.',
    },

    // * RATE LIMIT:
    RATE_LIMIT_INVALID_IDENTIFIER_CONTENT: {
      title: 'Identificador de limite inválido',
      description: 'O identificador usado para limitar requisições não é válido.',
    },
    RATE_LIMIT_INVALID_CONTEXT: {
      title: 'Contexto de limite inválido',
      description: 'O contexto do limite de requisições não é válido.',
    },
    RATE_LIMIT_EXECUTION_FAILED: {
      title: 'Serviço temporariamente indisponível',
      description:
        'Não conseguimos validar o limite da requisição agora. Tente novamente em breve.',
    },

    // * COMMON:
    COMMON_INTERNAL_ERROR: {
      title: 'Erro interno inesperado',
      description: 'Não conseguimos concluir sua solicitação. Tente novamente em instantes.',
    },

    // * ZOD:
    ZOD_ERROR_NOT_FOUND: {
      title: 'Erro de validação',
      description: 'Alguns campos precisam de atenção antes de continuar.',
    },

    // * CLERK:
    CLERK_MISSING_RAW_BODY: {
      title: 'Payload de webhook inválido',
      description: 'O corpo bruto do webhook está ausente.',
    },
    CLERK_MISSING_SVIX_HEADERS: {
      title: 'Payload de webhook inválido',
      description: 'Os cabeçalhos do webhook estão ausentes.',
    },
    CLERK_INVALID_SIGNATURE: {
      title: 'Assinatura de webhook inválida',
      description: 'Não foi possível verificar a assinatura do webhook.',
    },
    CLERK_INVALID_PAYLOAD: {
      title: 'Payload de webhook inválido',
      description: 'Não foi possível processar o payload do webhook.',
    },

    // * LIBS:
    LIBS_I18N_EXPO_EAS_PROJECT_ID_MISSING: {
      title: 'Falta o id do projeto Expo EAS',
      description: 'Não foi possível localizar o id do projeto Expo EAS.',
    },
    LIBS_API_BASE_URL_MISSING: {
      title: 'Falta a URL base da API',
      description: 'Não foi possível localizar a URL base da API.',
    },
  },
} as const;

export default error;
