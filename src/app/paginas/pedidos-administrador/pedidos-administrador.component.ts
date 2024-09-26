import { Component} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NegociosService } from 'src/app/servicios/negocios.service';
import { Location } from '@angular/common';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
@Component({
  selector: 'app-pedidos-administrador',
  templateUrl: './pedidos-administrador.component.html',
  styleUrls: ['./pedidos-administrador.component.css']
})
export class PedidosAdministradorComponent {

  pedidos:any={};
  id_neg:number=0;

  constructor(private router:Router, private negociosService: NegociosService, private route:ActivatedRoute,private location: Location){}
  
  ngOnInit(): void {
    this.id_neg = Number(localStorage.getItem("id_neg"));
    this.getPedidos();
  }

  goBack(){
    this.location.back();
  }

  getPedidos(){
    this.negociosService.obtenerPedidosNegocio(this.id_neg).subscribe(
      (pedidos:Object)=>this.pedidos=pedidos)
  }

  cambiarEstado(id:number)
  {
    this.negociosService.actualizarPedido(id).pipe(
      tap((response) => {
        alert("Pedido Actualizado Exitosamente");
        this.ngOnInit();
      }),
      catchError((error) => {
        alert("Error al Actualizar Pedido");
        return of(null);
      })
    )
    .subscribe();
  }
}
