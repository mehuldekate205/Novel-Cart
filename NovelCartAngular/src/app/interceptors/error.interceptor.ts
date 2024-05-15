import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const snackbar = inject(MatSnackBar);
  return next(req).pipe(catchError(err => {
    if (err.status === 401) {
      snackbar.open('Session Expired');
      router.navigateByUrl('/login');
    } else if (err.status === 404) {
      router.navigate(['not-found']);
    }
    return throwError(() => req);
  }));
};
