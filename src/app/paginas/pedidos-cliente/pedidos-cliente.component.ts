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
  id_usuario:number=1;
  constructor(private router:Router, private negociosService: NegociosService, private route:ActivatedRoute,private location: Location){}

  ngOnInit(): void {
    this.getPedidos();
  }

  goBack(){
    this.location.back();
  }

  getPedidos(){
    // this.id_usuario = parseInt(this.route.snapshot.paramMap.get('id_usuario')!, 10);
    // console.log("ID RECIBIDO: " + this.id_usuario);
    this.negociosService.obtenerPedidos().subscribe(
      (pedidos:Object)=>this.pedidos=pedidos)
  }
}
