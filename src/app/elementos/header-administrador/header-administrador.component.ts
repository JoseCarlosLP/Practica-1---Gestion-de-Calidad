import { Component, OnInit } from '@angular/core';
import { NegociosService } from 'src/app/servicios/negocios.service';

@Component({
  selector: 'app-header-administrador',
  templateUrl: './header-administrador.component.html',
  styleUrls: ['./header-administrador.component.css']
})
export class HeaderAdministradorComponent implements OnInit{
  id: Number = 0;
  ngOnInit(): void {
    this.id = Number(localStorage.getItem("idNeg"));
    console.log("ID DEL NEGOCIO EN EL HEADER: " + this.id)
  }
}