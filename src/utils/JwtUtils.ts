export function updateJwt(token: string, days: number = 7): void {
  localStorage.setItem('jwt', token);

  const isLocalhost = window.location.hostname === 'localhost';
  const domain = isLocalhost ? 'localhost' : '.azenizzka.ru';
  const secureFlag = isLocalhost ? '' : '; Secure';
  
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `cookie_jwt=${encodeURIComponent(token)}; expires=${expires}; path=/; domain=${domain}${secureFlag}`;
}

export function getJwt() : string {
  return localStorage.getItem('jwt') || "none";
}

export function deleteJwt() {
  localStorage.removeItem('jwt');
}