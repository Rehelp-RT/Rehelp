import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

import { AuthenticationService } from '@app/services';

export const authGuard: CanActivateFn = (route, state) => {
    const authenticationService = inject(AuthenticationService);
    const router = inject(Router);
    if (authenticationService.currentUserValue) {
        return true;
    }
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
};
