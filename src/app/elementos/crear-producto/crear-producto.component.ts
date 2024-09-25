import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NegociosService } from 'src/app/servicios/negocios.service';
@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent {
  id_neg:number=0;
  constructor(
    private negocioService: NegociosService,
    private route:ActivatedRoute,
    private location: Location
  ){}
  ngOnInit(){
    const id_neg = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.id_neg=id_neg;
  }
  goBack(): void {
    this.location.back();
  }
  save(cod_prod:string,nombre:string,descripcion:string, categoria:string,precio:string,imagen:string):void{
    console.log("Tenemos: ",nombre)
    this.negocioService.insertProducto(this.id_neg,Number(cod_prod),nombre,descripcion,categoria,Number(precio),imagen).subscribe(
      (response) =>{
        this.goBack()
      },
      (error) => {
        alert("Error al Actualizar Producto");
      }
    )
  }
}
