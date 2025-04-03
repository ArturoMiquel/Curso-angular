import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  constructor(private http: HttpClient) {}

  public get(url: string): Observable<any> {
    return this.http.get(url); //GET al api de post
  }

  public post(url: string, body: any): Observable<any> {
    return this.http.post(url, body); // Asegúrate de devolver un Observable
  }
}
