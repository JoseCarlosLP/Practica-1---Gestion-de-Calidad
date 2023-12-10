import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NegociosService } from 'src/app/servicios/negocios.service';
@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent {
  producto:any={};
  idNeg:number=0;
  constructor(
    private negocioService: NegociosService,
    private route:ActivatedRoute,
    private location: Location
  ){}
  ngOnInit(){
    this.obtenerProducto();
  }
  obtenerProducto():void{
    const codProd = parseInt(this.route.snapshot.paramMap.get('codProd')!, 10);
    const idNeg = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.idNeg=idNeg;
    this.negocioService.obtenerProducto(idNeg,codProd).subscribe(
      (producto:Object)=>this.producto=producto)
  }
  goBack(): void {
    this.location.back();
  }
  save(codProd:string,nombre:string,descripcion:string, categoria:string,precio:string):void{
    console.log("Tenemos: ",nombre)
    this.negocioService.updateProducto(this.idNeg,Number(codProd),nombre,descripcion,categoria,Number(precio)).subscribe(
      (response) =>{
        alert("Producto Actualizado Exitosamente");
        this.ngOnInit()
      },
      (error) => {
        alert("Error al Actualizar Producto");
      }
    )
  }
}
