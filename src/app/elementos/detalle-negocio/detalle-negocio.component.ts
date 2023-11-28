import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-detalle-negocio',
  templateUrl: './detalle-negocio.component.html',
  styleUrls: ['./detalle-negocio.component.css']
})
export class DetalleNegocioComponent {
  @Input() Imagen: string = "";
  @Input() Nombre: string = "";
  @Input() Categoria: string = "";
}

