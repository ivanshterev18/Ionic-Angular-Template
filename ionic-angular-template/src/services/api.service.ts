import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Api {
  constructor(public http: HttpClient) {
    }
    get(endpoint: string, reqOpts?: any) {
      return this.http.get(endpoint, reqOpts).toPromise();
    }
    post(endpoint: string, body: any, reqOpts?: any) {
      return this.http.post(endpoint, body, reqOpts).toPromise();
    }
    put(endpoint: string, body: any, reqOpts?: any) {
      return this.http.put(endpoint, body, reqOpts).toPromise();
    }
    delete(endpoint: string, reqOpts?: any) {
      return this.http.delete(endpoint, reqOpts).toPromise();
    }
    patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.patch(endpoint, body, reqOpts).toPromise();
    }
}
