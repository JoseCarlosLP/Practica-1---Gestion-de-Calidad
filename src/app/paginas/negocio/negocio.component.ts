import { Component } from '@angular/core';
import { NegociosService } from 'src/app/servicios/negocios.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CarritoService } from 'src/app/servicios/carrito.service';
@Component({
  selector: 'app-negocio',
  templateUrl: './negocio.component.html',
  styleUrls: ['./negocio.component.css']
})
export class NegocioComponent {
  negocio:any={};
  id:number=0;
  constructor(
    private negocioService: NegociosService,
    private route:ActivatedRoute,
    private location: Location,
    private carritoService: CarritoService
  ){}
  ngOnInit(){
    this.obtenerNegocio();
  }
  goBack(){
    this.location.back();
  }
  obtenerNegocio():void{
    this.id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.negocioService.obtenerNegocio(this.id).subscribe(
      (negocio:Object)=>this.negocio=negocio)
  }

  comprarProducto(producto:any) {
    alert("producto añadido");
    const codProd = producto.codProd;
    const Nombre = producto.Nombre;
    const cantidad = 1;
    const precio = producto.Precio;
    this.carritoService.agregarAlCarrito(codProd, Nombre, cantidad, precio);
  }
}
