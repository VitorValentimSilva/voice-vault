import { ClerkUserDto } from '@/dto/clerk/clerk.dto';

export class ClerkUtil {
  public static resolvePrimaryEmail(data: ClerkUserDto): string | null {
    if (!data.primary_email_address_id) {
      return null;
    }

    const primary = data.email_addresses.find((e) => e.id === data.primary_email_address_id);

    return primary?.email_address ?? null;
  }

  public static resolveFullName(data: ClerkUserDto): string | null {
    const parts = [data.first_name, data.last_name].filter(Boolean);

    return parts.length > 0 ? parts.join(' ') : null;
  }

  public static resolveProvider(data: ClerkUserDto): string | null {
    return data.external_accounts?.[0]?.provider ?? null;
  }

  public static resolveIp(request: {
    ip?: string;
    ips?: string[];
    headers: Record<string, string | string[] | undefined>;
    socket?: { remoteAddress?: string };
  }): string {
    const forwarded = request.headers['x-forwarded-for'];

    if (forwarded) {
      const first = Array.isArray(forwarded) ? forwarded[0] : forwarded.split(',')[0];

      return first?.trim() ?? 'unknown';
    }

    return request.ips?.[0] ?? request.ip ?? request.socket?.remoteAddress ?? 'unknown';
  }
}
