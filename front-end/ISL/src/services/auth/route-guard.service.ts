import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from './token.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
class RouteGuardService {

  token: string = "";
  ruoli: string[] = [];
  items: any;

  constructor(private auth: TokenService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.token = this.auth.getAuthToken();

    if(this.token == null || this.token == ""){
      this.router.navigate([''], {queryParams: {notlogged: true}});
      return false;
    }

    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(this.token);

    this.items = decodedToken['role'];

    if(!Array.isArray(this.items))
      this.ruoli.push(this.items);
    else
      this.ruoli = this.items;

    if(!this.auth.isLogged()){
      this.router.navigate([''], {queryParams: {notlogged: true}});
      return false;
    }
    else{
      let roles: string[] = [];
      roles = next.data['roles'];

      if(roles == null || roles.length === 0)
        return true;
      else if(this.ruoli.some(r => roles.includes(r)))
        return true;
      else{
        this.router.navigate(['forbidden']);
        return false;
      }
    }
  }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(RouteGuardService).canActivate(next, state);
}



