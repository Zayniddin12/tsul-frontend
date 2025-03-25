// import Vue from 'vue'
// export function seo({ title, desc, img, url, width = 1200, height = 639 }) {
//   return {
//     title,
//     meta: [
//       {
//         hid: 'description',
//         name: 'description',
//         content: Vue.preventXXS(desc).substring(0, 200),
//       },
//       {
//         hid: 'og:title',
//         property: 'og:title',
//         content: title,
//       },
//       {
//         hid: 'og:description',
//         property: 'og:description',
//         content: Vue.preventXXS(desc).substring(0, 200),
//       },
//       {
//         hid: 'og:image',
//         property: 'og:image',
//         content: img,
//       },
//       {
//         hid: 'twitter:card',
//         property: 'twitter:card',
//         content: 'summary_large_image',
//       },
//       {
//         hid: 'og:site_name',
//         property: 'og:site_name',
//         content: 'site_name',
//       },
//       {
//         hid: 'vk:image',
//         property: 'vk:image',
//         content: img,
//       },
//       {
//         hid: 'twitter:image',
//         property: 'twitter:image',
//         content: img,
//       },
//       {
//         hid: 'og:image:width',
//         property: 'og:image:width',
//         content: width,
//       },
//       {
//         hid: 'og:image:height',
//         property: 'og:image:height',
//         content: height,
//       },
//       {
//         hid: 'og:image:height',
//         property: 'og:image:height',
//         content: height,
//       },
//       {
//         hid: 'twitter:card',
//         property: 'twitter:card',
//         content: 'summary_large_image',
//       },
//       {
//         hid: 'og:url',
//         property: 'og:url',
//         content: url,
//       },
//     ],
//   }
// }

export function iconHelper(icon) {
  return require("@/helpers/icons.js").default[icon];
}

export function formatNum(num) {
  return new Intl.NumberFormat("fr-FR").format(num);
}
export function numberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "  ");
}
