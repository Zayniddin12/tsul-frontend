export function mergeUrlWithParams(url, payload) {
  const urlParams = [];
  const matches = [...url.matchAll(/{(\w+)}/g)];
  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];
    urlParams.push(match[1]);
  }
  let mergedUrl = url;
  for (const param of urlParams) {
    mergedUrl = mergedUrl.replace(`{${param}}`, payload[param]);
  }
  return mergedUrl;
}

export function removeHTMLTags(text) {
  return text?.replace(/<\/?[^>]+(>|$)/gi, "");
}

export function postAction(url) {
  return function (store, { data = undefined, params = {} } = {}) {
    return new Promise((resolve, reject) => {
      const mergedUrl = mergeUrlWithParams(url, arguments[1]);
      this.$axios
        .post(mergedUrl, data, {
          params,
          headers: {
            "Accept-Language": this.$i18n.locale,
          },
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}

export function getAction(url) {
  return function (store, { params = {} } = {}) {
    return new Promise((resolve, reject) => {
      const mergedUrl = mergeUrlWithParams(url, arguments[1]);
      this.$axios
        .get(mergedUrl, {
          params,
          headers: {
            "Accept-Language": this.$i18n.locale,
          },
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}

export function updateAction(url) {
  return function (store, { data = undefined, partial = true, params = {} } = {}) {
    return new Promise((resolve, reject) => {
      const mergedUrl = mergeUrlWithParams(url, arguments[1]);
      this.$axios[partial ? "patch" : "put"](mergedUrl, data, {
        params,
        headers: {
          "Accept-Language": this.$i18n.locale,
        },
      })
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}

export function deleteAction(url) {
  return function (store, { params = {} } = {}) {
    return new Promise((resolve, reject) => {
      const mergedUrl = mergeUrlWithParams(url, arguments[1]);
      this.$axios
        .delete(mergedUrl, {
          params,
          headers: {
            "Accept-Language": this.$i18n.locale,
          },
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
