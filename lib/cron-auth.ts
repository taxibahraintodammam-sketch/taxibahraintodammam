import { timingSafeEqual } from 'crypto';

/** Constant-time string compare (false on length mismatch). */
export function safeEqual(a: string, b: string): boolean {
    const ab = Buffer.from(a);
    const bb = Buffer.from(b);
    return ab.length === bb.length && timingSafeEqual(ab, bb);
}

/**
 * True only when CRON_SECRET is set AND the request carries
 * `Authorization: Bearer <CRON_SECRET>`. An unset secret never matches —
 * comparing against `Bearer ${undefined}` would let "Bearer undefined" in.
 */
export function isCronRequest(request: Request): boolean {
    const secret = process.env.CRON_SECRET;
    if (!secret) return false;
    return safeEqual(request.headers.get('authorization') || '', `Bearer ${secret}`);
}
