export function getCookie(name: string) {
    const matches = document.cookie.match(
      new RegExp(
        "(?:^|; )" +
          name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
          "=([^;]*)"
      )
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
  
export function setCookie(accessToken: string) {
    const d = new Date();
    d.setTime(d.getTime() + 60 * 20 * 1000);
  
    accessToken = encodeURIComponent(accessToken);
  
    let cookie = "accessToken=" + accessToken;
    cookie += ";expires=" + d.toUTCString();
    document.cookie = cookie;
}
  
export function deleteCookie() {
  const d = new Date();
  d.setTime(d.getTime() - 60 * 20 * 1000);

  let cookie = "accessToken=; expires=" + d.toUTCString();
  document.cookie = cookie;
}