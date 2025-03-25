<template>
  <div style="position: relative; overflow: hidden">
    <yandex-map
      style="height: 400rem; width: 100%"
      :coords="coords"
      :scroll-zoom="false"
      :zoom="zoom"
    >
      <ymap-marker marker-id="1" :coords="coords" :icon="markerIcon" />
    </yandex-map>

    <a
      rel="noopener referrer"
      target="_blank"
      :href="mapLink"
      class="bg-[#2B5E9B] py-[8rem] px-[12rem] flex items-center hover:opacity-[0.8] cursor-pointer absolute top-[16rem] right-[16rem] justify-between gap-[6rem] w-[133rem] -1245:w-[150rem]"
    >
      <icon name="map" />
      <span class="not-italic font-semibold text-[12rem] leading-[130%] text-white">{{
        $t("see_on_map")
      }}</span>
    </a>
  </div>
</template>

<script>
import { yandexMap, ymapMarker } from "vue-yandex-maps";

export default {
  components: { yandexMap, ymapMarker },
  props: {
    mapLink: String,
    coords: Array,
  },
  data: () => ({
    zoom: 15,
    markerIcon: {
      layout: "default#imageWithContent",
      imageHref:
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTYiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA1NiA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxnIGZpbHRlcj0idXJsKCNmaWx0ZXIwX2ZfMTQyMF8yNDIzMikiPg0KPHBhdGggZD0iTTI4LjQ3NTkgNTMuMTk4M0MyOC40NzAzIDUzLjMxOTMgMjguNDE4NyA1My40MzM1IDI4LjMzMTggNTMuNTE3MUMyOC4yNDQ5IDUzLjYwMDggMjguMTI5MyA1My42NDc0IDI4LjAwOTIgNTMuNjQ3MkMyNy43Mzg1IDUzLjY0NzIgMjcuNTMzMiA1My40NDk2IDI3LjUyMzkgNTMuMTk4M0MyNy4zODg1IDUwLjIxNjYgMjUuODg0OSA0OC4yODgyIDIzLjAxNCA0Ny40MTI5QzEzLjU2MTIgNDUuMTQ2NSA2LjUzMzIgMzYuNTc3MSA2LjUzMzIgMjYuMzUzMUM2LjUzMzIgMTQuMzk3MyAxNi4xNDM3IDQuNzA2MDUgMjcuOTk5OSA0LjcwNjA1QzM5Ljg1NiA0LjcwNjA1IDQ5LjQ2NjUgMTQuMzk3MyA0OS40NjY1IDI2LjM1MzFDNDkuNDY2NSAzNi41NzcxIDQyLjQzODUgNDUuMTQ2NSAzMi45ODU3IDQ3LjQxMjlDMzAuMTE0OCA0OC4yODgyIDI4LjYxMTIgNTAuMjE3NiAyOC40Nzc3IDUzLjE5ODNIMjguNDc1OVoiIGZpbGw9IiNFQjQ4M0YiLz4NCjwvZz4NCjxwYXRoIGQ9Ik0yOC40NzU5IDUzLjE5ODNDMjguNDcwMyA1My4zMTkzIDI4LjQxODcgNTMuNDMzNSAyOC4zMzE4IDUzLjUxNzFDMjguMjQ0OSA1My42MDA4IDI4LjEyOTMgNTMuNjQ3NCAyOC4wMDkyIDUzLjY0NzJDMjcuNzM4NSA1My42NDcyIDI3LjUzMzIgNTMuNDQ5NiAyNy41MjM5IDUzLjE5ODNDMjcuMzg4NSA1MC4yMTY2IDI1Ljg4NDkgNDguMjg4MiAyMy4wMTQgNDcuNDEyOUMxMy41NjEyIDQ1LjE0NjUgNi41MzMyIDM2LjU3NzEgNi41MzMyIDI2LjM1MzFDNi41MzMyIDE0LjM5NzMgMTYuMTQzNyA0LjcwNjA1IDI3Ljk5OTkgNC43MDYwNUMzOS44NTYgNC43MDYwNSA0OS40NjY1IDE0LjM5NzMgNDkuNDY2NSAyNi4zNTMxQzQ5LjQ2NjUgMzYuNTc3MSA0Mi40Mzg1IDQ1LjE0NjUgMzIuOTg1NyA0Ny40MTI5QzMwLjExNDggNDguMjg4MiAyOC42MTEyIDUwLjIxNzYgMjguNDc3NyA1My4xOTgzSDI4LjQ3NTlaIiBmaWxsPSIjRUI0ODNGIi8+DQo8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDBfMTQyMF8yNDIzMikiPg0KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0zOS4xOTk5IDI2LjM1MzRWMjQuNDcxMUMzNS40NjY1IDI3LjI5NDYgMzEuNjU4NSAyNy43NjUyIDI3Ljk5OTkgMjcuNzY1MkMyNC4zNDEyIDI3Ljc2NTIgMjAuNTMzMiAyNy4yOTQ2IDE2Ljc5OTkgMjQuNDcxMVYyNi4zNTM0QzIwLjY3MTMgMjcuOTE1OCAyMy4yMDcyIDI4LjUwNSAyNi4xMzMyIDI4LjY2MDNWMzAuMTE4MUMyNi4xMzMyIDMwLjM2NzggMjYuMjMxNSAzMC42MDcxIDI2LjQwNjYgMzAuNzgzNkMyNi41ODE2IDMwLjk2MDIgMjYuODE5IDMxLjA1OTMgMjcuMDY2NSAzMS4wNTkzSDI4LjkzMzJDMjkuMTgwNyAzMS4wNTkzIDI5LjQxODEgMzAuOTYwMiAyOS41OTMyIDMwLjc4MzZDMjkuNzY4MiAzMC42MDcxIDI5Ljg2NjUgMzAuMzY3OCAyOS44NjY1IDMwLjExODFWMjguNjYwM0MzMi43OTI1IDI4LjUwNSAzNS4zMjg0IDI3LjkxNDggMzkuMTk5OSAyNi4zNTM0Wk0xNy43MzMyIDIwLjcwNjRIMzguMjY2NUMzOC41MTQxIDIwLjcwNjQgMzguNzUxNSAyMC44MDU1IDM4LjkyNjUgMjAuOTgyQzM5LjEwMTUgMjEuMTU4NSAzOS4xOTk5IDIxLjM5NzkgMzkuMTk5OSAyMS42NDc1VjMzLjIyOTdDMzkuMTk5OSAzNC4xNDkyIDM4LjU0MTkgMzQuOTMyMyAzNy42Mzc1IDM1LjA1NTVDMzUuNTg0MSAzNS4zMzMyIDMxLjc5MiAzNS43NjUyIDI3Ljk5OTkgMzUuNzY1MkMyNC4yMDc3IDM1Ljc2NTIgMjAuNDE0NyAzNS4zMzMyIDE4LjM2MjMgMzUuMDU0NkMxNy45MjYzIDM0Ljk5MzYgMTcuNTI3NCAzNC43NzQ2IDE3LjIzOTggMzQuNDM4NkMxNi45NTIzIDM0LjEwMjYgMTYuNzk1OSAzMy42NzI1IDE2Ljc5OTkgMzMuMjI4N1YyMS42NDc1QzE2Ljc5OTkgMjEuMzk3OSAxNi44OTgyIDIxLjE1ODUgMTcuMDczMiAyMC45ODJDMTcuMjQ4MyAyMC44MDU1IDE3LjQ4NTcgMjAuNzA2NCAxNy43MzMyIDIwLjcwNjRaTTMxLjI2NjUgMTkuNzY1MlYxOC4zNTM0QzMxLjI2NjUgMTguMjI4NiAzMS4yMTc0IDE4LjEwODkgMzEuMTI5OSAxOC4wMjA3QzMxLjA0MjMgMTcuOTMyNCAzMC45MjM2IDE3Ljg4MjggMzAuNzk5OSAxNy44ODI4SDI1LjE5OTlDMjUuMDc2MSAxNy44ODI4IDI0Ljk1NzQgMTcuOTMyNCAyNC44Njk5IDE4LjAyMDdDMjQuNzgyNCAxOC4xMDg5IDI0LjczMzIgMTguMjI4NiAyNC43MzMyIDE4LjM1MzRWMTkuNzY1MkgyMy4zMzMyVjE4LjM1MzRDMjMuMzMzMiAxNy43Mjk0IDIzLjU3OSAxNy4xMzA5IDI0LjAxNjYgMTYuNjg5NkMyNC40NTQyIDE2LjI0ODQgMjUuMDQ3NyAxNi4wMDA1IDI1LjY2NjUgMTYuMDAwNUgzMC4zMzMyQzMwLjk1MiAxNi4wMDA1IDMxLjU0NTUgMTYuMjQ4NCAzMS45ODMxIDE2LjY4OTZDMzIuNDIwNyAxNy4xMzA5IDMyLjY2NjUgMTcuNzI5NCAzMi42NjY1IDE4LjM1MzRWMTkuNzY1MkgzMS4yNjY1WiIgZmlsbD0id2hpdGUiLz4NCjwvZz4NCjxkZWZzPg0KPGZpbHRlciBpZD0iZmlsdGVyMF9mXzE0MjBfMjQyMzIiIHg9IjAuNTMzMjAzIiB5PSItMS4yOTM5NSIgd2lkdGg9IjU0LjkzMzEiIGhlaWdodD0iNjAuOTQxMiIgZmlsdGVyVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPg0KPGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0iMCIgcmVzdWx0PSJCYWNrZ3JvdW5kSW1hZ2VGaXgiLz4NCjxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW49IlNvdXJjZUdyYXBoaWMiIGluMj0iQmFja2dyb3VuZEltYWdlRml4IiByZXN1bHQ9InNoYXBlIi8+DQo8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIzIiByZXN1bHQ9ImVmZmVjdDFfZm9yZWdyb3VuZEJsdXJfMTQyMF8yNDIzMiIvPg0KPC9maWx0ZXI+DQo8Y2xpcFBhdGggaWQ9ImNsaXAwXzE0MjBfMjQyMzIiPg0KPHJlY3Qgd2lkdGg9IjIyLjQiIGhlaWdodD0iMjIuNTg4MiIgZmlsbD0id2hpdGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE2Ljc5OTggMTUuMDU5MSkiLz4NCjwvY2xpcFBhdGg+DQo8L2RlZnM+DQo8L3N2Zz4NCg==",
      imageSize: [43, 43],
      imageOffset: [0, 0],
      content: "",
      contentOffset: [0, 15],
    },
  }),
};
</script>

<style lang="scss">
.ymaps-2-1-79-controls__control {
  display: none !important;
}

.ymaps-2-1-79-controls__control_toolbar .ymaps-2-1-79-user-selection-none {
  display: none !important;
}
.ymaps-2-1-79-float-button {
  display: none !important;
}
.ymaps-2-1-79-map-copyrights-promo {
  display: none !important;
}

.ymaps-2-1-79-copyright__wrap {
  display: none !important;
}

.ymaps-2-1-79-searchbox__normal-layout {
  display: none !important;
}
</style>
