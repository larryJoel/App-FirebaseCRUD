import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';
import { map, delay } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HeroeService {
  private url ="https://appfirebase-3fe5d-default-rtdb.firebaseio.com";

  heroeTemp:any = [];
  id: string = "";
  constructor( private http:HttpClient) { }

  crearHeroe( heroe:HeroeModel){
    return this.http.post(`${this.url}/heroes.json`,heroe)
          .pipe(
            map((res:any) =>{
              heroe.id = res.name;
              return heroe
            })
          );
  };

  actualziarHeroe(heroe:any){
    this.id = heroe.id
    this.heroeTemp = heroe
    delete this.heroeTemp.id;
    return this.http.put(`${this.url}/heroes/${this.id}.json`,this.heroeTemp)
  }

borrarHeroe(id:string){
  return this.http.delete(`${this.url}/heroes/${id}.json`)
}


getHeore(id:string){
  return this.http.get(`${this.url}/heroes/${id}.json`)
}


getHeroes(){
  return this.http.get(`${this.url}/heroes.json`)
         .pipe(
           map( this.crearArreglo),
           delay(1500)
         )
}

 crearArreglo( heroeObj:any){
  const heroes: HeroeModel[]=[]
  console.log(heroeObj);
  if (heroeObj === null){return []}

  Object.keys(heroeObj).forEach(key =>{
    const heroe: HeroeModel = heroeObj[key];
    heroe.id = key;

    heroes.push(heroe);
  }) 


  return heroes;
}

}
