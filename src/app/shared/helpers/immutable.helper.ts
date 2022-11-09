export function patch<T>(original: T, props: Partial<T>) {
  return { ...original, ...props };
}