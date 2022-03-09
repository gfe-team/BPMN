import { App } from 'vue';
import VueRouter, { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { createPermissionGuard, createProgressGuard, createUpgradeGuard } from './guards';

import { basicRoutes, asyncRoutes } from './routes';

const routes: Array<RouteRecordRaw> = [
  ...asyncRoutes,
  ...basicRoutes
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export function setupRouter(app: App<Element>) {

  app.use(router);

  // // guards
  createProgressGuard(router);
  createUpgradeGuard(router);
  createPermissionGuard(router);
}

export default router;
