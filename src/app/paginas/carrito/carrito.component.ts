import { Component, OnInit  } from '@angular/core';
import { CarritoService } from 'src/app/servicios/carrito.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carrito: any = {};
  total:number=0;
  idNeg:number=0;
  constructor(
    private carritoService: CarritoService,
    private location: Location,
    private route:ActivatedRoute
    ) {}

    ngOnInit() {
      const idNeg = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
      this.idNeg=idNeg;
      console.log("negocioId:", this.idNeg)
      this.carrito = this.carritoService.obtenerCarrito();
      this.actualizarTotal();
      
    }
  
    private actualizarTotal(): void {
      this.total = this.carritoService.calcularTotal();
    }
  goBack(): void {
    this.location.back();
  }
  vaciarCarrito():void{
    this.carritoService.vaciarCarrito()
    this.ngOnInit()
  }
  confirmarCarrito():void{
    const idUser=1;
    this.carritoService.guardarCarrito(this.idNeg,idUser).subscribe(
      (response) =>{
        alert("Pedido Realizado Exitosamente");
        this.goBack()
      },
      (error) => {
        alert("Error al Actualizar Producto");
      }
    )
    this.carritoService.vaciarCarrito();
  }
}
