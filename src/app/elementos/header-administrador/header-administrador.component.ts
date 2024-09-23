import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-administrador',
  templateUrl: './header-administrador.component.html',
  styleUrls: ['./header-administrador.component.css']
})
export class HeaderAdministradorComponent implements OnInit{
  id: number = 0;
  ngOnInit(): void {
    this.id = Number(localStorage.getItem("id_neg"));
    console.log("ID DEL NEGOCIO EN EL HEADER: " + this.id)
  }
}