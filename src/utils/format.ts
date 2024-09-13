export function formatNumber(num: number): string {
  if (num < 10000) {
    return num + '';
  } else if (num < 100000000) {
    const value = num / 10000;
    return Math.trunc(value * 100) / 100 + '万';
  } else if (num < 10000000000000) {
    const value = num / 100000000;
    return Math.trunc(value * 100) / 100 + '亿';
  }
  return num.toString();
}
