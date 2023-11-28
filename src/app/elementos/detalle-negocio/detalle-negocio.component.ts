import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-detalle-negocio',
  templateUrl: './detalle-negocio.component.html',
  styleUrls: ['./detalle-negocio.component.css']
})
export class DetalleNegocioComponent {
  @Input() imagen: string = "";
  @Input() Nombre: string = "";
  @Input() Categoria: string = "";

  @Output() click: EventEmitter<string> = new EventEmitter<string>();
}

