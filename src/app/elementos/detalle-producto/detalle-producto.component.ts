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
    const codProdString = this.route.snapshot.paramMap.get('codProd');
    if (codProdString === null) {
      throw new Error("El parámetro 'codProd' no está presente en la URL.");
    }
    const codProd = parseInt(codProdString, 10);

    const idNeg = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.idNeg=idNeg;
    this.negocioService.obtenerProducto(idNeg,codProd).subscribe(
      (producto:Object)=>this.producto=producto)
  }
  goBack(): void {
    this.location.back();
  }
  save(codProd:string,nombre:string,descripcion:string, categoria:string,precio:string,imagen:string):void{
    console.log("Tenemos: ",nombre)
    this.negocioService.updateProducto(this.idNeg,Number(codProd),nombre,descripcion,categoria,Number(precio),imagen).subscribe(
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
