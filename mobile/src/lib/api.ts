import { ApiError } from '@/error/class/api-error.class';
import i18n from '@/lib/i18n';
import { normalizeApiError } from '@/util/api-error';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL?.replace(/\/+$/, '');

function getApiBaseUrl(): string {
  if (!API_BASE_URL) {
    throw new Error(i18n.t('error:codes.LIBS_API_BASE_URL_MISSING.description'));
  }

  return API_BASE_URL;
}

function buildUrl(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return `${getApiBaseUrl()}${normalizedPath}`;
}

function buildHeaders(initHeaders?: HeadersInit): Headers {
  const headers = new Headers(initHeaders);

  if (!headers.has('accept')) {
    headers.set('accept', 'application/json');
  }

  return headers;
}

async function readResponseBody(response: Response): Promise<unknown> {
  const text = await response.text();

  if (!text) {
    return undefined;
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

export type ApiRequestOptions = RequestInit & {
  expectJson?: boolean;
};

export async function apiRequest<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  const response = await fetch(buildUrl(path), {
    ...options,
    headers: buildHeaders(options.headers),
  });

  const body = await readResponseBody(response);

  if (!response.ok) {
    const normalized = normalizeApiError(body);
    const errorOptions: ConstructorParameters<typeof ApiError>[1] = {
      status: response.status,
      fields: normalized.fields,
    };

    if (normalized.code !== undefined) {
      errorOptions.code = normalized.code;
    }

    if (body !== undefined) {
      errorOptions.body = body;
      errorOptions.cause = body;
    }

    throw new ApiError(normalized.copy.title, errorOptions);
  }

  if (options.expectJson === false) {
    return body as T;
  }

  return body as T;
}

export async function apiGet<T>(
  path: string,
  options: Omit<ApiRequestOptions, 'method'> = {}
): Promise<T> {
  return apiRequest<T>(path, {
    ...options,
    method: 'GET',
  });
}

export async function apiPost<T>(
  path: string,
  body?: unknown,
  options: Omit<ApiRequestOptions, 'method' | 'body'> = {}
): Promise<T> {
  return apiRequest<T>(path, {
    ...options,
    method: 'POST',
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    headers: buildHeaders(options.headers),
  });
}
