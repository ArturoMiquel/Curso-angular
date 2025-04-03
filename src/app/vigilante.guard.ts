import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class VigilanteGuard implements CanActivate  {

  constructor(private coockieService: CookieService, private router: Router) { }

  redirect(flag: boolean): void {
    if (!flag) {
      this.router.navigate(['login']);
    }
  }
     
  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const cookie = this.coockieService.check('token_access');
    this.redirect(cookie);
    return cookie;    
  }
};
