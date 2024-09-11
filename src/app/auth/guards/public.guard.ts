import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, GuardResult, MaybeAsync, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../services/auth-service';

@Injectable({providedIn: 'root'})
  export class PublicGuard implements CanActivate, CanMatch {


  constructor( private authService: AuthService,
               private router: Router,

  ) { }


  private checkAuthStatuss(): boolean | Observable<boolean>{

    return this.authService.checkAuthentication()
              .pipe(
                tap(isAuthenticated => console.log('Authenticated:', isAuthenticated)),
                tap( isAuthenticated => {
                  if ( isAuthenticated ){
                    this.router.navigate(['./'])
                  }
                }),
                map(isAuthenticated => !isAuthenticated)
              )
  }

  canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
    return  this.checkAuthStatuss();
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    return this.checkAuthStatuss();
  }

}
