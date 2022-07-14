import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root',
})

// Service de API genérico
export class ApiService {

  // API URL
  private API_ENDPOINT: string = `${environment.api_url}/${environment.api_ver}`;

  // Constructor
  constructor(public httpClient: HttpClient) {}

  // Generic GET
  get(path: string): Observable<any> {
    return this.httpClient.get(`${this.API_ENDPOINT}/${path}`);
  }

  /* En este challenge solo se solicitaron GETs, pero en una aplicación real 
     seguramente agregaría otros métodos genéricos para encapsular las llamadas 
     POST, PUT, DELETE, etc. */

}
