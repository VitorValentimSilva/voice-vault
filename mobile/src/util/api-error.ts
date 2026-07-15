import { ApiError } from '@/error/class/api-error.class';
import type {
  ApiErrorField,
  ApiErrorPayload,
  ErrorCode,
  ErrorDescriptionKey,
  ErrorTitleKey,
  ErrorTranslationKey,
  LocalizedErrorCopy,
  NormalizedApiError,
} from '@/error/code/error.code';
import i18n from '@/lib/i18n';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function tString(key: ErrorTranslationKey): string {
  return String(i18n.t(key, { returnObjects: false }));
}

function getFallbackCopy(): LocalizedErrorCopy {
  return {
    title: tString('error:fallback.title'),
    description: tString('error:fallback.description'),
  };
}

function isApiErrorCode(value: unknown): value is ErrorCode {
  return typeof value === 'string' && i18n.exists(`error:codes.${value}.title`);
}

function resolveApiErrorCopy(code: ErrorCode): LocalizedErrorCopy {
  const titleKey: ErrorTitleKey = `error:codes.${code}.title`;
  const descriptionKey: ErrorDescriptionKey = `error:codes.${code}.description`;

  if (!i18n.exists(titleKey) || !i18n.exists(descriptionKey)) {
    return getFallbackCopy();
  }

  return {
    title: tString(titleKey),
    description: tString(descriptionKey),
  };
}

function normalizeFields(fields: unknown): ApiErrorField[] {
  if (!Array.isArray(fields)) {
    return [];
  }

  return fields
    .filter((field): field is Record<string, unknown> => isRecord(field))
    .map((field) => ({
      path: typeof field.path === 'string' ? field.path : '',
      message: typeof field.message === 'string' ? field.message : '',
    }))
    .filter((field) => field.path.length > 0 || field.message.length > 0);
}

function normalizeFallbackError(): NormalizedApiError {
  return {
    code: undefined,
    copy: getFallbackCopy(),
    fields: [],
  };
}

export function normalizeApiError(payload: unknown): NormalizedApiError {
  if (!isRecord(payload)) {
    return normalizeFallbackError();
  }

  const errorPayload: ApiErrorPayload = payload;
  const code = isApiErrorCode(errorPayload.error) ? errorPayload.error : undefined;
  const fields = normalizeFields(errorPayload.fields);

  return {
    code,
    copy: code ? resolveApiErrorCopy(code) : getFallbackCopy(),
    fields,
  };
}

export function normalizeUnknownError(error: unknown): NormalizedApiError {
  if (error instanceof ApiError) {
    return {
      code: error.code,
      copy: error.code ? resolveApiErrorCopy(error.code) : getFallbackCopy(),
      fields: error.fields,
    };
  }

  if (error instanceof Error && isApiErrorCode(error.message)) {
    return {
      code: error.message,
      copy: resolveApiErrorCopy(error.message),
      fields: [],
    };
  }

  if (isRecord(error)) {
    if (isApiErrorCode(error.code)) {
      return {
        code: error.code,
        copy: resolveApiErrorCopy(error.code),
        fields: normalizeFields(error.fields),
      };
    }

    if (isRecord(error.response)) {
      return normalizeApiError(error.response);
    }

    if (isRecord(error.payload)) {
      return normalizeApiError(error.payload);
    }
  }

  return normalizeFallbackError();
}
