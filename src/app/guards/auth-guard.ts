import { Observable } from "rxjs";
import { LoginService } from "../service/login.service";
import { inject } from "@angular/core";
import { Router } from "@angular/router";




function checkAuthentication(): boolean | Observable<boolean> {
  const authService = inject(LoginService);
  const router = inject(Router);

  const user = authService.checkAuth();
  if (!user) {
    router.navigate(['/login']);
    return false;
  }
  return true;
}

function loggedUser(): boolean | Observable<boolean> {
  const authService = inject(LoginService);
  const router = inject(Router);

  const user = authService.checkAuth();
  if (user) {
    router.navigate(['/dashboard']);
    return false;
  }
  return true;
}

export const AuthGuard = () => {
  return checkAuthentication();
}

export const LoggedUser = () => {
  return loggedUser();
}