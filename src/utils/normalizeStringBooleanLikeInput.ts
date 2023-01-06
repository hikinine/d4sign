import { convertBooleanToBooleanStringLike, isNumberString } from './isNumberString';

export function normalizeStringBooleanLikeInput(value: '0' | '1' | boolean) {
  return isNumberString(value) ? value : convertBooleanToBooleanStringLike(value as boolean);
}
