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
    this.negocioService.obtenerProducto(codProd).subscribe(
      (producto:Object)=>this.producto=producto)
  }
  goBack(): void {
    this.location.back();
  }
}
