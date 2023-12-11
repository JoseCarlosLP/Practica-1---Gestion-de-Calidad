import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NegociosService } from 'src/app/servicios/negocios.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pedidos-cliente',
  templateUrl: './pedidos-cliente.component.html',
  styleUrls: ['./pedidos-cliente.component.css']
})
export class PedidosClienteComponent implements OnInit {
  pedidos:any={};
  idCliente:number=0;
  constructor(private router:Router, private negociosService: NegociosService, private route:ActivatedRoute,private location: Location){}

  ngOnInit(): void {
    this.getPedidos();
  }

  goBack(){
    this.location.back();
  }

  getPedidos(){
    this.idCliente = parseInt(this.route.snapshot.paramMap.get('idCliente')!, 10);
    console.log("ID RECIBIDO: " + this.idCliente);
    this.negociosService.obtenerPedidos(this.idCliente).subscribe(
      (pedidos:Object)=>this.pedidos=pedidos)
  }
}
