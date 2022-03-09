import type { NavigationGuardNext, RouteLocationNormalized, Router } from 'vue-router';

// 版本更新提示
export function createUpgradeGuard(router: Router) {
    router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {

        next();
    });
    router.afterEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    });
}
