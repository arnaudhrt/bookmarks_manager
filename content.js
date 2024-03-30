function faviconURL(u) {
  const url = new URL(chrome.runtime.getURL("/_favicon/"));
  url.searchParams.set("pageUrl", u);
  url.searchParams.set("size", "32");
  return url.toString();
}

console.log(faviconURL("https://www.github.com"));
console.log(faviconURL("https://www.nutripure.fr"));
console.log(faviconURL("https://www.netflix.com"));
console.log(faviconURL("https://www.linkedin.com"));
