
export function isNumberString(n: unknown) {
  return /^\d+$/.test(String(n));
}

export function convertBooleanToBooleanStringLike(value: boolean) {
  if (typeof value !== 'boolean') {
    throw new TypeError('Expected value of type boolean, instead received ' + value);
  }

  return value ? '1' : '0';
}
