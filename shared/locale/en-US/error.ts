const error = {
  fallback: {
    title: 'Unexpected error',
    description: 'Something went wrong and the app could not finish this action.',
  },
  codes: {
    // * REDIS:
    REDIS_INVALID_TTL_DURATION: {
      title: 'Invalid cache duration',
      description: 'The cache duration is not valid.',
    },
    REDIS_INVALID_SECONDS_DURATION: {
      title: 'Invalid cache duration',
      description: 'The cache duration in seconds is not valid.',
    },

    // * RATE LIMIT:
    RATE_LIMIT_INVALID_IDENTIFIER_CONTENT: {
      title: 'Invalid request limit identifier',
      description: 'The request limit identifier is not valid.',
    },
    RATE_LIMIT_INVALID_CONTEXT: {
      title: 'Invalid request context',
      description: 'The rate limit context is not valid.',
    },
    RATE_LIMIT_EXECUTION_FAILED: {
      title: 'Service temporarily unavailable',
      description: 'We could not validate the request limit right now. Try again soon.',
    },

    // * COMMON:
    COMMON_INTERNAL_ERROR: {
      title: 'Unexpected server error',
      description: 'We could not complete your request. Please try again in a moment.',
    },

    // * ZOD:
    ZOD_ERROR_NOT_FOUND: {
      title: 'Validation error',
      description: 'Some fields need attention before you can continue.',
    },

    // * CLERK:
    CLERK_MISSING_RAW_BODY: {
      title: 'Invalid webhook payload',
      description: 'The webhook payload is missing the raw body.',
    },
    CLERK_MISSING_SVIX_HEADERS: {
      title: 'Invalid webhook payload',
      description: 'The webhook headers are missing.',
    },
    CLERK_INVALID_SIGNATURE: {
      title: 'Invalid webhook signature',
      description: 'The webhook signature could not be verified.',
    },
    CLERK_INVALID_PAYLOAD: {
      title: 'Invalid webhook payload',
      description: 'The webhook payload could not be processed.',
    },

    // * LIBS:
    LIBS_I18N_EXPO_EAS_PROJECT_ID_MISSING: {
      title: 'Missing Expo EAS project id',
      description: 'The Expo EAS project id could not be found.',
    },
    LIBS_API_BASE_URL_MISSING: {
      title: 'Missing API base URL',
      description: 'The API base URL could not be found.',
    },
  },
} as const;

export default error;
