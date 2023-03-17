export function toBoolean(
  param: string | undefined,
  defaultValue: boolean
): boolean {
  if (param === undefined) {
    return defaultValue;
  }
  if (param === 'true') {
    return true;
  }
  if (param === 'false') {
    return false;
  }
  return !!parseInt(param, 10);
}
