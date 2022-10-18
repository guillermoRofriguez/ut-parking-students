import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
// import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { Authenticated } from './module/auth';
// import { Authenticated } from './models/auth';
import { AuthService } from './services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }

  async canActivate() {
    let auth: Authenticated = await this.auth.isAutenticated();
    if (auth.res) {
      return true;
    }
    this.router.navigate(['/sign-in']);
    return false;

  }
}