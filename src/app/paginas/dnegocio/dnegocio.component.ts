import { Component} from '@angular/core';
import { NegociosService } from 'src/app/servicios/negocios.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-dnegocio',
  templateUrl: './dnegocio.component.html',
  styleUrls: ['./dnegocio.component.css']
})
export class DNegocioComponent {
  id:number=0;
  negocio:any={};
  constructor(
    private negocioService: NegociosService,
    private route:ActivatedRoute,
    private location: Location,
    private router: Router
  ){}
  ngOnInit(){
    this.id = Number(localStorage.getItem("id_neg"));
    this.obtenerNegocio();
    console.log("ID DEL DNEGOCIO: " + this.id);
  }
  obtenerNegocio(): void {
    this.negocioService.obtenerNegocio(this.id) .pipe(
      tap((negocio: Object) => this.negocio = negocio),
      catchError((error) => {
        if (error.error.error === 'Token expirado') {
          alert("Su sesión ha expirado, inicie sesión nuevamente");
          this.router.navigate(['/IniciarSesion']);
        }
        return of(null);
      })
    )
    .subscribe();
  }
  eliminar(cod_prod:number){
    console.log("Entra a funcion Eliminar: ",typeof(cod_prod));
    this.negocioService.eliminarProducto(cod_prod,this.negocio._id).subscribe(
      (response) =>{
        alert("Producto Eliminado Exitosamente");
        this.ngOnInit();
      },
      (error) => {
        alert("Error al Eliminar Producto");
      }
    )
  }
}
