export function serverUrl() {
  return "https://sciencetechnology.samskritifoundation.org/api";
}

export function getApiUrl(subpath) {
  return `${serverUrl()}/${subpath}`;
}