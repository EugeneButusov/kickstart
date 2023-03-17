export function toInt(param: string | undefined, defaultValue: number): number {
  return param ? parseInt(param, 10) : defaultValue;
}
