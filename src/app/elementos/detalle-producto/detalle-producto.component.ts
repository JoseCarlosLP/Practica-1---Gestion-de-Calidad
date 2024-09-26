import { Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NegociosService } from 'src/app/servicios/negocios.service';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent {
  producto:any={};
  id_neg:number=0;
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
    const id_negString = this.route.snapshot.paramMap.get('id');
    if (id_negString === null) {
      throw new Error("El parámetro 'id' no está presente en la URL.");
    }
    const id_neg = parseInt(id_negString, 10);
    this.id_neg=id_neg;
    this.negocioService.obtenerProducto(id_neg,cod_prod).subscribe(
      (producto:Object)=>this.producto=producto)
  }
  goBack(): void {
    this.location.back();
  }
  save(cod_prod:string,nombre:string,descripcion:string, categoria:string,precio:string,imagen:string):void{
    console.log("Tenemos: ",nombre)
    this.negocioService.updateProducto(this.id_neg,Number(cod_prod),nombre,descripcion,categoria,Number(precio),imagen).pipe(
      tap((response) => {
        this.goBack();
      }),
      catchError((error) => {
        alert("Error al Actualizar Producto");
        return of(null);
      })
    )
    .subscribe();
  }
}
