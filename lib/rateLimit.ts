const ipCounts = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(ip: string, maxRequests: number, windowMs: number): boolean {
  const now = Date.now();
  const record = ipCounts.get(ip);

  if (!record || now > record.resetAt) {
    ipCounts.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count++;
  return true;
}

setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of Array.from(ipCounts.entries())) {
    if (now > record.resetAt) ipCounts.delete(ip);
  }
}, 60000);
