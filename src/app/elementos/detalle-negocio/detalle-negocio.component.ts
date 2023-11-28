import { Component, Input, Output } from '@angular/core';
import { NegociosService } from 'src/app/servicios/negocios.service';

@Component({
  selector: 'app-detalle-negocio',
  templateUrl: './detalle-negocio.component.html',
  styleUrls: ['./detalle-negocio.component.css']
})
export class DetalleNegocioComponent {
  @Input() Imagen: string = "";
  @Input() Nombre: string = "";
  @Input() Categoria: string = "";
  @Input() Id: string = "";
  @Output() click = NegociosService;
}

