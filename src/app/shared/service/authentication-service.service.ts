import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tokenName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { DateUtil } from '../util/date-util';
@Injectable({
  providedIn: 'root'
})

// npm install @auth0/angular-jwt
export class AuthenticationService {

   logout() {
    localStorage.clear()
    this.router.navigate(['/login'])
  }

  token: string | null | undefined;
  tokenName: string = 'authentication';

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }

  public isAuthenticated() {
    var cookie = localStorage.getItem(this.tokenName);
    var jwtHelper = new JwtHelperService;
    const token = JSON.stringify(cookie);

    if(cookie == 'null'){
      return false;
    }
    if (cookie == null || jwtHelper.isTokenExpired(token)) {
      localStorage.removeItem(this.tokenName)
      return false;
    }
    return true;
  }

  public hasAuthority(authority: string[]) {
    var cookie = localStorage.getItem(this.tokenName);
    var jwtHelper = new JwtHelperService;
    const token = JSON.stringify(cookie);

    for (var i = 0; i < authority.length; i++) {
      if (jwtHelper.decodeToken(token).authorities.includes(authority[i])) {
        return true;
      }
    }
    return false;
  }

   getTimeLeft(){
    var cookie = localStorage.getItem(this.tokenName);
    var jwtHelper = new JwtHelperService;
    const token = JSON.stringify(cookie);
    var time = jwtHelper.getTokenExpirationDate(token)!.getTime() - new Date().getTime();
    if(time <= 0){
      this.logout();
    }
    return DateUtil.getTimeFromMilliseconds(time);
  }

  public authenticate(username: string, password: string) {
    // const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    console.log('logando')
    this.http.get(environment.apiUrl + '/login', {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa(username + ':' + password)
      })
      , observe: 'response', responseType: 'blob'
    }).subscribe(
      data => {
        if(data.headers.get(this.tokenName) != null){
          localStorage.setItem(this.tokenName, data.headers.get(this.tokenName) as string)
        }else{
          this.toastr.error('falha na autenticação, verifique usuário e senha','', {positionClass: 'toast-top-center'})
        }
        this.router.navigate(['']);
      },
      error => {
        if(error.status == 401){
          this.toastr.error('falha na autenticação, verifique usuário e senha','', {positionClass: 'toast-top-center'})
        }
        if(error.status == 0){
          this.toastr.error('falha na conexão','', {positionClass: 'toast-top-center'})
        }
        console.log(error);
      }


    );

  }


}
