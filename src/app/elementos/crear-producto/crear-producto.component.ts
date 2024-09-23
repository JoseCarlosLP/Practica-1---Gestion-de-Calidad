import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NegociosService } from 'src/app/servicios/negocios.service';
@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent {
  idNeg:number=0;
  constructor(
    private negocioService: NegociosService,
    private route:ActivatedRoute,
    private location: Location
  ){}
  ngOnInit(){
    const idNeg = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.idNeg=idNeg;
  }
  goBack(): void {
    this.location.back();
  }
  save(cod_prod:string,nombre:string,descripcion:string, categoria:string,precio:string,imagen:string):void{
    console.log("Tenemos: ",nombre)
    this.negocioService.insertProducto(this.idNeg,Number(cod_prod),nombre,descripcion,categoria,Number(precio),imagen).subscribe(
      (response) =>{
        this.goBack()
      },
      (error) => {
        alert("Error al Actualizar Producto");
      }
    )
  }
}
