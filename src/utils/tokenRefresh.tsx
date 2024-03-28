export const createToken = () => {
  // const expirationTime = new Date().getTime() + 60;
  // Refresh token every 55 mins
  const expirationTime = new Date().getTime() + 55 * 60000;
  sessionStorage.setItem("sessionExpiresAt", expirationTime.toString());
};

export const hasTokenExpired = (): { isExpired: boolean | null } => {
  const expiresAt = sessionStorage.getItem("sessionExpiresAt");
  if (!expiresAt) return { isExpired: null };

  // Check if the current time is past the stored time
  if (new Date().getTime() > JSON.parse(expiresAt)) {
    return { isExpired: true };
  } else {
    return { isExpired: false };
  }
};

export const removeToken = () => {
  sessionStorage.removeItem("sessionExpiresAt");
};
