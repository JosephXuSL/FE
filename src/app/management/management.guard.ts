import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../user/auth.service';

@Injectable({providedIn: 'root'})
export class ManagementGuard implements CanActivate {
    constructor(private authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return Boolean(Number(sessionStorage.getItem('isadmin')));
    }
}
