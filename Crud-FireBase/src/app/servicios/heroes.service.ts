import { HeroeModel } from './../models/HeroeModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {


  url = 'https://prueba2-99e32-default-rtdb.firebaseio.com/';

  constructor( private http: HttpClient ) { }

  crearHeroe( heroe: HeroeModel ) {
    return this.http.post( this.url + 'heroes.json', heroe )
    .pipe(
      map( ( resp: any ) => {
        heroe.id = resp.name;
        return heroe;
      })
      );
  }

  actualizarHeroe( heroe: HeroeModel ) {
    const temp = {
      ...heroe
    };
    delete temp.id;
    return this.http.put( `${this.url}heroes/${heroe.id}.json`, temp );
  }

  getHeroes() {
    return this.http.get(this.url + 'heroes.json')
    .pipe(
      map( this.crearArreglo )
    );
  }

  private crearArreglo( heroeObj: object ) {
    const heroes: HeroeModel[] = [];
    Object.keys( heroeObj ).forEach( key => {
      const heroe: HeroeModel = heroeObj[ key ];
      heroe.id = key;
      heroes.push( heroe );
    } );

    if ( heroeObj === null ) { return []; }
    return heroes;
  }

  getHeroe(id: string) {
    return this.http.get(this.url + 'heroes/' + id + '.json');
  }

  borrarHeroe(id: string) {
    return this.http.delete(this.url + 'heroes/' + id + '.json');
  }

}
