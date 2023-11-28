import { Component,OnInit } from '@angular/core';
import { NegociosService } from 'src/app/servicios/negocios.service';
import { ActivatedRoute } from '@angular/router';
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
}
