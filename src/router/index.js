import { createRouter, createWebHistory } from "vue-router";
import {routes} from "@/router/routes";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(()=> {
  window.scroll(0, 0);
})
export default router;
