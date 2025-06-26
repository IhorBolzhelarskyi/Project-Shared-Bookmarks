export function urlValidator(url) {
  const pattern = /^(https?:\/\/)([\w.-]+)\.([a-z]{2,})(:[0-9]{1,5})?(\/.*)?$/i;
  return pattern.test(url);
}
