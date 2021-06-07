import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroeService } from 'src/app/services/heroe.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  
  heroes: any[] = [];
  cargando:boolean = false;

  constructor(private _heroe: HeroeService) {}

  ngOnInit(): void {
    this.cargando = true;
    this._heroe.getHeroes().subscribe(
      (res) => {
        this.heroes = res;
        this.cargando = false;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  borrarHeroe(heroe: HeroeModel, i: number) {
    Swal.fire({
      title: '¿Desea borrar este registro..?',
      text: `¿Esta seguro de querer borrar ${heroe.nombre}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
    }).then((res) => {
      if (res.value) {
        this.heroes.splice(i, 1);
        this._heroe.borrarHeroe(heroe.id).subscribe();
      }
    });
  }
}
