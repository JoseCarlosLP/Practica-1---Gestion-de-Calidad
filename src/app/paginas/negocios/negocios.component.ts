import { Component, OnInit } from '@angular/core';
import { NegociosService } from 'src/app/servicios/negocios.service';
import { Router } from '@angular/router';
import { CarritoService } from 'src/app/servicios/carrito.service';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';


@Component({
  selector: 'app-negocios',
  templateUrl: './negocios.component.html',
  styleUrls: ['./negocios.component.css']
})
export class NegociosComponent implements OnInit{

  datos: any;
  constructor(private router:Router, private negociosService: NegociosService,private carritoService:CarritoService){}

  ngOnInit(): void {
    this.negociosService.obtenerNegocios().pipe(
      tap(data => this.datos = data),
      catchError(error => {
        if (error.error.error === 'Token expirado') {
          alert("Su sesión ha expirado, inicie sesión nuevamente");
          this.router.navigate(['/IniciarSesion']);
        }
        return of(null);
      }),
      tap(() => console.log("Fin de los negocios"))
    )
    .subscribe();
    this.carritoService.vaciarCarrito();
  }
}
