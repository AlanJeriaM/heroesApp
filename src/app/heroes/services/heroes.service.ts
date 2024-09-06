import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, map } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from '../../../environments/environments';

@Injectable({providedIn: 'root'})
export class HeroesService {

  private baseUrl = environments.baseUrl; //propiedad privada que almacena la URL base para las solicitudes HTTP, el valor proviene de las configuraciones de entorno (environments.baseUrl).


  constructor(private http: HttpClient) { }


  getHeroes() : Observable<Hero[]> {  //observable estara emitiendo un arreglo de Hero que lo importamos de las interfaces
      return this.http.get<Hero[]>(`${ this.baseUrl }/heroes`); //obtiene la url del environment.ts + /heroes, El tipo de dato esperado como respuesta es un arreglo de Hero. La función devuelve un Observable que puede ser suscrito en otros componentes para manejar la respuesta.
  }


//Es un método que toma un parámetro id de tipo string.
//Este método devuelve un Observable que puede emitir un objeto de tipo Hero o undefined.
  getHeroById(id: string): Observable<Hero | undefined>{
      return this.http.get<Hero>(`${ this.baseUrl }/heroes/${ id }`)
      .pipe( //.pipe(...) se utiliza para encadenar operadores que pueden transformar, filtrar o manejar errores en el flujo de datos del observable.
        catchError(error => of(undefined) ) // si viene otro endpoint equivocado retorna undefined o of(undefined) crea un observable que emite el valor undefined.
      );
  }

//Este método realiza una solicitud GET al servidor para buscar héroes basados en un término de búsqueda (query).
//Devuelve un observable que emite un arreglo con hasta 6 héroes que coincidan con el término de búsqueda.
  getSuggestions(query: string): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${ this.baseUrl }/heroes?q=${ query }&_limit=6`);
  }

  //Envía una petición POST para crear un nuevo héroe. Devuelve un Observable<Hero> con el héroe creado.
  addHero(hero : Hero): Observable<Hero>{
    return this.http.post<Hero>(`${ this.baseUrl }/heroes` , hero);
  }

  //Actualiza la información de un héroe existente utilizando su id. Si no hay id, lanza un error. Devuelve un Observable<Hero> con el héroe actualizado.
  updateHero(hero : Hero): Observable<Hero>{
    if(!hero.id) throw Error('Hero id is requerido');
    return this.http.patch<Hero>(`${ this.baseUrl }/heroes/${hero.id}` , hero);
  }

  //Elimina un héroe por su id. Si ocurre un error, devuelve false, y si la eliminación es exitosa, devuelve true. Devuelve un Observable<boolean> que indicará si la eliminación fue exitosa (true) o fallida (false).
  deleteHeroById( id: string): Observable<boolean>{
    return this.http.delete(`${ this.baseUrl }/heroes/${ id }`)
    .pipe(
      catchError (err => of(false) ),
      map(resp => true)
    );
  }


}



