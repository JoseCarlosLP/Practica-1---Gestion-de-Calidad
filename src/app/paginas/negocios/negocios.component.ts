import { Component, OnInit } from '@angular/core';
import { NegociosService } from 'src/app/servicios/negocios.service';
import { Router } from '@angular/router';
import { CarritoService } from 'src/app/servicios/carrito.service';


@Component({
  selector: 'app-negocios',
  templateUrl: './negocios.component.html',
  styleUrls: ['./negocios.component.css']
})
export class NegociosComponent implements OnInit{

  datos: any;
  constructor(private router:Router, private negociosService: NegociosService,private carritoService:CarritoService){}
  ngOnInit(): void {
    this.negociosService.obtenerNegocios().subscribe(
      data => this.datos = data,
      error => console.log(error),
      () => console.log("Fin de los negocios")
    )
    this.carritoService.vaciarCarrito();
  }
}
