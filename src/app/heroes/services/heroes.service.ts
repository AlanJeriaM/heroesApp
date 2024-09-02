import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from '../../../environments/environments';

@Injectable({providedIn: 'root'})
export class HeroesService {

  private baseUrl = environments.baseUrl; //propiedad privada que almacena la URL base para las solicitudes HTTP, el valor proviene de las configuraciones de entorno (environments.baseUrl).


  constructor(private http: HttpClient) { }


  getHeroes() : Observable<Hero[]> {  //observable estara emitiendo un arreglo de Hero que lo importamos de las interfaces
      return this.http.get<Hero[]>(`${ this.baseUrl }/heroes`); //obtiene la url del environment.ts + /heroes, El tipo de dato esperado como respuesta es un arreglo de Hero. La función devuelve un Observable que puede ser suscrito en otros componentes para manejar la respuesta.
  }

}
