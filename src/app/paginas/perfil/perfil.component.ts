import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { IniciarSesionService } from 'src/app/servicios/iniciar-sesion.service';
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
  save(username:String,email:String,password:String){
    this.iniciarsesionService.actualizarCliente(username,email,password).subscribe(
      (response) =>{
        alert("Perfil Actualizado Exitosamente");
        this.ngOnInit()
      },
      (error) => {
        alert("Error al Actualizar Perfil");
      }
    )
  }
}
