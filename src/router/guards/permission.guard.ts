/* eslint-disable no-constant-condition */
import type { Router } from 'vue-router';

export function createPermissionGuard(router: Router) {
    router.beforeEach((to, from, next) => {
        next();
    });
}
