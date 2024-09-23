import { Component} from '@angular/core';
import { NegociosService } from 'src/app/servicios/negocios.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';

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
    this.id = Number(localStorage.getItem("idNeg"));
    this.obtenerNegocio();
    console.log("ID DEL DNEGOCIO: " + this.id);
  }
  obtenerNegocio(): void {
    this.negocioService.obtenerNegocio(this.id).subscribe(
      (negocio: Object) => this.negocio = negocio,
      error => {
        if (error.error.error == 'Token expirado') {
          alert("Su sesion ha expirado, inicie sesion nuevamente")
          this.router.navigate(['/IniciarSesion']);
        }
      })
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
