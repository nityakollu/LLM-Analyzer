import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './auth.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).token;
  return next(
    token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req
  );
};
