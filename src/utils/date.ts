
export function calculateExpirationDate(expires_in) {
  const currentDate = new Date();
  const expirationDate = new Date(currentDate.getTime() + expires_in * 1000);
  return expirationDate;
}

export function isExpired(expirationDate) {
  const currentDate = new Date();
  // 如果当前日期大于等于过期日期，则认为已过期
  return currentDate >= expirationDate;
}
