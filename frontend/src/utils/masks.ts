export function cpfMask(value: string): string {
  let digits = value.replace(/\D/g, '');
  digits = digits.substring(0, 11);
  if (digits.length > 9) {
    return `${digits.substring(0,3)}.${digits.substring(3,6)}.${digits.substring(6,9)}-${digits.substring(9)}`;
  } else if (digits.length > 6) {
    return `${digits.substring(0,3)}.${digits.substring(3,6)}.${digits.substring(6)}`;
  } else if (digits.length > 3) {
    return `${digits.substring(0,3)}.${digits.substring(3)}`;
  }
  return digits;
}
