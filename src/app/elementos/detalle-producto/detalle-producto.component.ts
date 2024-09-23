import { Component} from '@angular/core';
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
    const cod_prodString = this.route.snapshot.paramMap.get('cod_prod');
    if (cod_prodString === null) {
      throw new Error("El parámetro 'cod_prod' no está presente en la URL.");
    }
    const cod_prod = parseInt(cod_prodString, 10);
    const idNegString = this.route.snapshot.paramMap.get('id');
    if (idNegString === null) {
      throw new Error("El parámetro 'id' no está presente en la URL.");
    }
    const idNeg = parseInt(idNegString, 10);
    this.idNeg=idNeg;
    this.negocioService.obtenerProducto(idNeg,cod_prod).subscribe(
      (producto:Object)=>this.producto=producto)
  }
  goBack(): void {
    this.location.back();
  }
  save(cod_prod:string,nombre:string,descripcion:string, categoria:string,precio:string,imagen:string):void{
    console.log("Tenemos: ",nombre)
    this.negocioService.updateProducto(this.idNeg,Number(cod_prod),nombre,descripcion,categoria,Number(precio),imagen).subscribe(
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
