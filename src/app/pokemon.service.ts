import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './common/api_base_service/api.base.service';

@Injectable({
  providedIn: 'root'
})

export class PokemonService {

  private RESOURSE_NAME: string = "pokemon";

  constructor(private api: ApiService) { }

  public listPokemons(limit:number, offset:number): Observable<any> {
    return this.api.get(`${this.RESOURSE_NAME}/?limit=${limit}&offset=${offset}`);
  }

  public searchByName(name:string): Observable<any> {
    return this.api.get(`${this.RESOURSE_NAME}/${name}`);
  }

  public getDetails(url:string): Observable<any> {
    return this.api.httpClient.get(url);
  }

}
