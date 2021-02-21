import { HeroesService } from './../../servicios/heroes.service';
import { HeroeModel } from './../../models/HeroeModel';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel();

  constructor(private heroesService: HeroesService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (id !== 'nuevo') {
      this.heroesService.getHeroe( id ).subscribe( (res: HeroeModel) => {
        this.heroe = res;
        this.heroe.id = id;
      });
    }
  }

  guardar(form: NgForm) {
    console.log(form);
    if (form.invalid) {
      console.log('Formulario no valido, care chimba!');
      return;
    }

    Swal.fire({
      title: 'espere',
      text: 'guardando',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();
    let peticion: Observable<any>;
    if (this.heroe.id) {
      peticion = this.heroesService.actualizarHeroe(this.heroe);
    } else {
      peticion = this.heroesService.crearHeroe(this.heroe);
    }
    peticion.subscribe( (data) => {
      console.log(data);
      Swal.fire({
        title: this.heroe.nombre,
        text: 'Se actualizó correctamente',
        icon: 'success',
        allowOutsideClick: false
      });
    });
  }

}
