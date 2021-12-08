import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../service/authentication-service.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService, private authService: AuthenticationService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (localStorage.getItem('authorization') != null) {
      if (!this.authService.isAuthenticated()){
        this.router.navigate(['/login'])
      }
      req = req.clone({
        setHeaders: {
          'authorization': localStorage.getItem('authorization') as string,
          'Content-Type': 'application/json'
        }
      });
    }

    return next.handle(req).pipe(
      catchError((error) => {


        if(error.status == 403){
          console.log(error.error.errorsObjects);
          this.toastr.error(error.error.message, '', { positionClass: 'toast-top-center' })
        }
        console.log(error)
        // console.log(error.error.message)
        this.failActions(error)
        return throwError(error.message);
      })
    );

  }

  failActions(error: any) {
    if (error.status === 500 || error.status === 400) {
      this.toastr.error(error.error.message, '', { positionClass: 'toast-top-center' })
      console.log(error.error);
    }
    if (error.status === 401) {
      this.toastr.error('Não autorizado', '', { positionClass: 'toast-top-center' })
      console.log(error.error);
    }
    if (error.status === 0) {
      this.toastr.error('Falha na conexão', '', { positionClass: 'toast-top-center' })
    } else if (error.status != 401) {
      console.log(error.error.errorsObjects);
      this.toastr.error('Falha na operação', '', { positionClass: 'toast-top-center' })
    }
  }
}
