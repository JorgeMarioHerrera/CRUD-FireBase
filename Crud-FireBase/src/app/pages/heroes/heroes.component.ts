import { HeroesService } from './../../servicios/heroes.service';
import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/HeroeModel';
import Swal from 'sweetalert2';
import { Text } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: HeroeModel[] = [];
  cargando = false;

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.cargando = true;
    this.heroesService.getHeroes().subscribe(res => {
      this.heroes = res;
      this.cargando = false;
    });
  }

  borrarHeroe(heroe: HeroeModel, i: number) {
    Swal.fire({
      title: '¿Está seguro?',
      text: 'Seguro desea eliminar a ' + heroe.nombre,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( res => {
      if ( res.value ) {
        this.heroes.splice( i, 1 );
        this.heroesService.borrarHeroe(heroe.id).subscribe();
      }
    });
  }

}
