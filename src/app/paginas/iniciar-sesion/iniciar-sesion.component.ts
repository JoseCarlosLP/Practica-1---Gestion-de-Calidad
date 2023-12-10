import { Component } from '@angular/core';
import {IniciarSesionService} from "../../servicios/iniciar-sesion.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent {
  constructor(private iniciarSesionService: IniciarSesionService, private router: Router){}

  iniciarSesion(username:String,password:String){
    this.iniciarSesionService.iniciarSesion(username,password).subscribe(
      (response) =>{
        alert("Sesion iniciada existosamente");
        alert(response);
        //this.iniciarSesionService.guardarToken(response['token']);
        this.router.navigate(['/inicio']);
      },
      (error) => {
        alert("Error al iniciar sesion");
      }
    )
  }

  registrar(username:String,password:String,email:String){
    this.iniciarSesionService.registrar(username,password,email).subscribe(
      (response) =>{
        alert("Registrado existosamente");
        this.router.navigate(['IniciarSesion']);
      },
      (error) => {
        alert("Error al registrar");
      }
    )
  }
}
