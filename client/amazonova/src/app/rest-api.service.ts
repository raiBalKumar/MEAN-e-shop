import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RestApiService {

  constructor(private http: HttpClient) { }

  get(link: string){
    return this.http.get(link,{ headers: this.getHeaders()}).toPromise();
  }

  post(link: string, body: any){
    return this.http.post(link, body, { headers: this.getHeaders()}).toPromise();
  }

  getHeaders(){
    const token = localStorage.getItem('token');
    return token ? new HttpHeaders().set('Authorization', token) : null;
  }

}
