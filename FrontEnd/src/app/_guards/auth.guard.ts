import { Injectable } from "@angular/core";
import { CanActivate, Router  ,ActivatedRouteSnapshot ,RouterStateSnapshot} from "@angular/router";
import { UserService } from "../services/user.service";

@Injectable({providedIn:'root'})

export class AuthGuard implements CanActivate {

    constructor(private router:Router ,
    private userService :UserService
    )
    {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const currentUser = this.userService.currentUserValue;
        if (currentUser) {
          // check if route is restricted by role
          if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
            // role not authorised so redirect to home page
            this.router.navigate(['/']);


            return false;
          }

          // authorised so return true
          return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/student-login'], { queryParams: { returnUrl: state.url } });

        return false;
      }




}
