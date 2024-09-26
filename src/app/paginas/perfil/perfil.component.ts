import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { IniciarSesionService } from 'src/app/servicios/iniciar-sesion.service';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit{
  cliente:any={}
  constructor(
    private location:Location,
    private iniciarsesionService:IniciarSesionService,
    ){}
  ngOnInit(): void {
    this.get_Cliente();
    console.log(this.cliente);
  }
  get_Cliente(){
    this.iniciarsesionService.obtenerCliente().subscribe(
        (cliente:Object)=>this.cliente=cliente)
  }
  goBack(){
    this.location.back();
  }
  save(username:string,email:string,password:string){
    this.iniciarsesionService.actualizarCliente(username,email,password).pipe(
      tap((cliente: Object) => this.cliente = cliente),
      catchError((error) => {
        console.error('Error al obtener cliente', error);
        return of(null);
      })
    )
    .subscribe();
  }
}
