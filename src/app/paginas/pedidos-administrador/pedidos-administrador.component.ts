import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NegociosService } from 'src/app/servicios/negocios.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pedidos-administrador',
  templateUrl: './pedidos-administrador.component.html',
  styleUrls: ['./pedidos-administrador.component.css']
})
export class PedidosAdministradorComponent {

  pedidos:any={};
  idNeg:number=0;

  constructor(private router:Router, private negociosService: NegociosService, private route:ActivatedRoute,private location: Location){}
  
  ngOnInit(): void {
    this.idNeg = Number(localStorage.getItem("idNeg"));
    this.getPedidos();
  }

  goBack(){
    this.location.back();
  }

  getPedidos(){
    this.negociosService.obtenerPedidosNegocio(this.idNeg).subscribe(
      (pedidos:Object)=>this.pedidos=pedidos)
  }

  cambiarEstado(id:number)
  {
    this.negociosService.actualizarPedido(id).subscribe(
      (response) =>{
        alert("Pedido Actualizado Exitosamente");
        this.ngOnInit();
      },
      (error) => {
        alert("Error al Actualizar Pedido");
      }
    );
  }
}
