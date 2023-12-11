import { Component,OnInit } from '@angular/core';
import { NegociosService } from 'src/app/servicios/negocios.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dnegocio',
  templateUrl: './dnegocio.component.html',
  styleUrls: ['./dnegocio.component.css']
})
export class DNegocioComponent {
  negocio:any={};
  constructor(
    private negocioService: NegociosService,
    private route:ActivatedRoute,
    private location: Location,
    private router: Router
  ){}
  ngOnInit(){
    this.obtenerNegocio();
  }
  obtenerNegocio(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.negocioService.obtenerNegocio(id).subscribe(
      (negocio: Object) => this.negocio = negocio,
      error => {
        if (error.error.error == 'Token expirado') {
          alert("Su sesion ha expirado, inicie sesion nuevamente")
          this.router.navigate(['/IniciarSesion']);
        }
      })
  }
  eliminar(codProd:number){
    console.log("Entra a funcion Eliminar: ",typeof(codProd));
    this.negocioService.eliminarProducto(codProd,this.negocio._id).subscribe(
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
