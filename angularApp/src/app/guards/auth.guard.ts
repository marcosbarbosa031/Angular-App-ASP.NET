import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { AlertifyService } from '../services/alertify.service';
import { AuthService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Route,
    private authService: AuthService,
    private alertify: AlertifyService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): boolean {
    if (this.authService.loggedIn()) {
      return true;
    }

    this.alertify.error('You have to be logged in to access this page!');
  }

}
