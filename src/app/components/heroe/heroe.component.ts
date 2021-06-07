import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { any } from 'joi';
import { Observable } from 'rxjs/internal/Observable';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroeService } from 'src/app/services/heroe.service';
import swal  from "sweetalert2";

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel();
  //id: string = "";
  constructor( private _heroe:HeroeService,
               private route:ActivatedRoute ) { }


  ngOnInit(): void {
      const id:any = this.route.snapshot.paramMap.get('id');
      if(id !=='nuevo'){
        this._heroe.getHeore(id)
        .subscribe(
          (res:any)=>{
            this.heroe = res
            this.heroe.id = id;
          }
        )
      }
  }

  guardar(form:NgForm){
    //validar el formulario
   
    if (form.invalid){
      console.log('Formulario invalido..!');
      alert('Debe llenar el formulario con sus datos..! (Por lo menos en nombre)')
      return;
    }

    swal.fire({
      title:'Espere',
      text:'Guardando información',
      icon:'info',
      allowOutsideClick:false,
    });
    swal.showLoading();

    let peticion: Observable <any>;
    if(this.heroe.id){
      peticion = this._heroe.actualziarHeroe(this.heroe)
    }else{
      peticion = this._heroe.crearHeroe(this.heroe)
    }
    
    peticion.subscribe( res =>{
      swal.fire({
        title: this.heroe.nombre,
        text: 'Se actualizó correctamente..!',
        icon:'success'
      })
    })
    
  }
}
