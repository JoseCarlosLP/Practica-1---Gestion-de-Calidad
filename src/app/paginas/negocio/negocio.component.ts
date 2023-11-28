import { Component,OnInit } from '@angular/core';
import { NegociosService } from 'src/app/servicios/negocios.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-negocio',
  templateUrl: './negocio.component.html',
  styleUrls: ['./negocio.component.css']
})
export class NegocioComponent {
  negocio:any={};
  constructor(
    private negocioService: NegociosService,
    private route:ActivatedRoute,
    private location: Location
  ){}
  ngOnInit(){
    this.obtenerNegocio();
  }
  obtenerNegocio():void{
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.negocioService.obtenerNegocio(id).subscribe(
      (negocio:Object)=>this.negocio=negocio)
  }
  obtenerVista():void{
    const vista = this.route.snapshot.paramMap.get('vista');
  }
  comprarProducto() {
    alert('El restaurante está preparando tu pedido. Por favor, pasa a recogerlo en 15 minutos.');
  }
  
}
