export function getBootstrapData(key) {
  const id = '_bootstrap-' + key;
  const el = document.getElementById(id)
  let content;
  let data;

  if (el === null) {
    return;
  }

  content = el.content;
  data = JSON.parse(content);

  return data;
}
