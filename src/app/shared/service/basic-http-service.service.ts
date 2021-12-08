import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class BasicHttpServiceService {

  constructor(private http: HttpClient) { }

  get(endpoint: string):Observable<any>{
    return this.http.get(`${environment.apiUrl}${endpoint}`)
  }

  getWithParams(endpoint: string, params: any): Observable<any>{
    let headers = new Headers();
headers.append('Content-Type', 'application/json');
    return this.http.get(`${environment.apiUrl}${endpoint}`,{params: params})
  }


  post(endpoint: string, value: any):Observable<any> {
    return this.http.post(`${environment.apiUrl}${endpoint}`, value)
  }

  delete(url: any):Observable<any> {
    return this.http.delete(`${environment.apiUrl}${url}`)
  }
  patch(endpoint: string, value: any) {
    return this.http.patch(`${environment.apiUrl}${endpoint}`, value)
  }

  downloadFile(url: string,filename: string, rType: any){
    this.http.get(url, {responseType: rType}).subscribe(
      res => {
        const blob = new Blob([res], { type : 'application/vnd.ms.excel' });
        const file = new File([blob], filename, { type: 'application/vnd.ms.excel' });
        saveAs(file);
      }
    )
  }

}
