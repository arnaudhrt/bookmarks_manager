export function checkUrl(url) {
  // Expression régulière pour vérifier si l'URL est valide
  var regex = /^(?:https?:\/\/|www\.)/i;

  return regex.test(url);
}
