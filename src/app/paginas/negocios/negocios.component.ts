import { Component, OnInit } from '@angular/core';
import { NegociosService } from 'src/app/servicios/negocios.service';

@Component({
  selector: 'app-negocios',
  templateUrl: './negocios.component.html',
  styleUrls: ['./negocios.component.css']
})
export class NegociosComponent implements OnInit{

  datos: any;

  constructor(private negociosService: NegociosService){}
  ngOnInit(): void { 
    this.negociosService.obtenerNegocios().subscribe(
      //data => console.log(data),
      data => this.datos = data,
      error => console.log(error),
      () => console.log("Fin de los negocios")
    )
  }
  mostrar(dato: any):void{
    console.log(dato)
  }
}
