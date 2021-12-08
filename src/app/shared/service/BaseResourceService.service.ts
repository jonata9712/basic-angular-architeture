import { HttpClient } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";


export abstract class BaseResourceService<T>{

    protected toastr: ToastrService;
    protected http: HttpClient;
    protected endpoint = ''
    constructor(protected injector: Injector, protected url: any){
        this.toastr = injector.get(ToastrService)
        this.http = injector.get(HttpClient)
        this.endpoint = url
    }


  get(url?: string):Observable<any>{
    return this.http.get(`${environment.apiUrl}${this.endpoint}/${url != undefined ? url : ''}`)
  }

  getWithParams(params: any): Observable<any>{
    let headers = new Headers();
headers.append('Content-Type', 'application/json');
    return this.http.get(`${environment.apiUrl}${this.endpoint}`,{params: params})
  }


  post(value: any):Observable<any> {
    return this.http.post(`${environment.apiUrl}${this.endpoint}`, value)
  }

  delete(id: any):Observable<any> {
    return this.http.delete(`${environment.apiUrl}${this.endpoint}/${id}`)
  }
  patch(value: any) {
    return this.http.patch(`${environment.apiUrl}${this.endpoint}`, value)
  }


}
