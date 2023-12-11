import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NegociosService } from 'src/app/servicios/negocios.service';

@Component({
  selector: 'app-header-administrador',
  templateUrl: './header-administrador.component.html',
  styleUrls: ['./header-administrador.component.css']
})
export class HeaderAdministradorComponent implements OnInit{
  primer: boolean = true;
  @Input() id:number = 0;
  idNeg: number = 0;

  constructor(
    private negocioService: NegociosService,
    private route:ActivatedRoute,
    private location: Location
  ){}
    
  ngOnInit(): void {
    console.log("VALOR DE PRIMER: " + this.primer)
    if (this.primer==true)
      this.primer = false;
      this.idNeg = this.id
    
    console.log("ID RECIBIDO EN EL HEADER: " + this.idNeg)
  }
  
}
