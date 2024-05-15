import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivateFn, Router } from '@angular/router';

export const userGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const snackbar = inject(MatSnackBar);
  if(localStorage.getItem('usertype') == 'User'){
    return true;
  }
  else{
    snackbar.open('You Are Not Authorised');
    router.navigateByUrl('/notfound');
    return false;
  }
};
