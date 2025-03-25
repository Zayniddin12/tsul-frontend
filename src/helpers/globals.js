export function registerGlobalProperties({ ...props }) {
  for (let prop in props) {
    this.config.globalProperties[prop] = props[prop];
  }
}
export function preventXXS(str) {
  if (!str) return "";
  // remove script tags and other dangerous tags
  return str
    .replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, "")
    .replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, "");
}
export function hideElement(item, className) {
  document.addEventListener("mousedown", (event) => {
    if (!event.target.closest(className)) {
      this[item] = false;
    }
  });
}

export function numberWithSpaces(number) {
  return number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function addParams(key, val) {
  const queryParams = new URLSearchParams(window.location.search);
  queryParams.set(key, val);
  history.replaceState(null, null, "?" + queryParams.toString());
}

export function getFullName(item) {
  return `${item?.first_name} ${item?.last_name} ${item?.middle_name}`;
}

export function getTabs(tabs) {
  const tab = tabs.map((item) => {
    return {
      label: item.name,
      id: item.slug,
    };
  });

  for (let i = 0; i < tab.length; i++) {
    if (i === 0) {
      tab[i].name = "first";
    } else if (i === 1) {
      tab[i].name = "second";
    } else if (i === 2) {
      tab[i].name = "third";
    }
  }

  tab.unshift({
    label: this.$t("all"),
    name: "all",
    id: 0,
  });

  return tab;
}
const timeouts = {};

const cTimeout = (key = "key") => {
  if (timeouts[key]) {
    clearTimeout(timeouts[key]);
    timeouts[key] = undefined;
  }
};

export const debounce = (key = "key", fn = () => {}, timeout = 1000) => {
  const sTimeout = (key, fn, timeout) => {
    cTimeout(key);

    timeouts[key] = setTimeout(() => {
      try {
        fn();
      } catch (e) {}

      timeouts[key] = undefined;
    }, timeout);
  };

  return sTimeout(key, fn, timeout);
};
