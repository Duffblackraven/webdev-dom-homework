
export const getFetchApi = () => {
  return fetch("https://wedev-api.sky.pro/api/v1/tatiana-ret/comments", {

      method: "GET"
  })
  
  .then((response) => {
  if (response.status === 500) {
    throw new Error('Ошибка на сервере')
  }
    return response.json();
  });
};

export const postFetchApi = (nameEl, textEl) => {
return fetch("https://wedev-api.sky.pro/api/v1/tatiana-ret/comments", {

    method: "POST",
    body: JSON.stringify({
    name: nameEl.value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;"),
    text: textEl.value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;"),
    forceError: true
        }),
    });
};