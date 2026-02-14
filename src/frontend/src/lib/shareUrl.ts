export function buildShareUrl(letterId: string): string {
  const origin = window.location.origin;
  return `${origin}/view/${letterId}`;
}
