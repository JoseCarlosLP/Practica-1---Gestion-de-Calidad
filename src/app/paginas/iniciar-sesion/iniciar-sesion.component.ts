import {Component, OnInit} from '@angular/core';
import {IniciarSesionService} from "../../servicios/iniciar-sesion.service";
import {Router} from "@angular/router";
import {RespuestaLogin} from "../../servicios/iniciar-sesion.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit{
  mostrarRegistroForm = false;
  mostrarRegistroNegocioForm = false;
  constructor(private iniciarSesionService: IniciarSesionService,
              private router: Router,
              private location: Location)
  {}

  ngOnInit() {
    this.iniciarSesionService.eliminarToken();
  }

  iniciarSesion(userOrAdminName:string,password:string){
    if (userOrAdminName!="" && password != "") {
      this.iniciarSesionService.iniciarSesion(userOrAdminName,password).subscribe(
        (response : RespuestaLogin) =>{
          alert("Sesion iniciada existosamente");
          this.iniciarSesionService.guardarToken(response.token);
          if(response.idNeg==-1) {
            this.router.navigate(['/inicio']);
            localStorage.setItem("idCli",String(response.idUsu));
          } else
          {
            this.router.navigate(['/dnegocio']);
            localStorage.setItem("idNeg",String(response.idNeg));
          }
        },
        (error) => {
          console.log(error);
          alert("Error al iniciar sesion");
        }
      )
    } else alert ("Complete todos los campos");
  }

  registrar(username:string,password:string,email:string){
    if (username!="" && password != "" && email != "") {
      this.iniciarSesionService.registrar(username, password, email).subscribe(
        (response) => {
          alert("Registrado existosamente, ahora inicie sesion");
          window.location.reload();
        },
        (error) => {
          alert("Error al registrar");
        }
      )
    } else alert ("Complete todos los campos");
  }

  registrarNegocio(nombreNeg:String, adminstrador:String,password:String,email:string,categoria:String){
    if (nombreNeg!="" && adminstrador != "" && password != "" && email != "" && categoria != "") {
      this.iniciarSesionService.registrarNegocio(nombreNeg,adminstrador,password,email,categoria).subscribe(
        (response) => {
          alert("Registrado existosamente, ahora inicie sesion");
          window.location.reload();
        },
        (error) => {
          alert("Error al registrar");
        }
      )
    } else alert ("Complete todos los campos");
  }

  mostrarRegistro(): void {
    this.mostrarRegistroForm = true;
    this.mostrarRegistroNegocioForm = false;
  }

  mostrarRegistroNegocio(): void {
    this.mostrarRegistroForm = false;
    this.mostrarRegistroNegocioForm = true;
  }
  volverARegistroCliente(): void {
    this.mostrarRegistroForm = true;
    this.mostrarRegistroNegocioForm = false;
  }
}
