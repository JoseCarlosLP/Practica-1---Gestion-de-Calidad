import {Component, OnInit} from '@angular/core';
import {IniciarSesionService, RespuestaLogin} from "../../servicios/iniciar-sesion.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

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

  iniciarSesion(userOrAdminName: string, password: string) {
    if (userOrAdminName !== "" && password !== "") {
      this.iniciarSesionService.iniciarSesion(userOrAdminName, password)
        .pipe(
          tap((response: RespuestaLogin) => {
            alert("Sesión iniciada exitosamente");
            this.iniciarSesionService.guardarToken(response.token);
            if (response.id_neg === -1) {
              this.router.navigate(['/inicio']);
              localStorage.setItem("idCli", String(response.idUsu));
            } else {
              this.router.navigate(['/dnegocio']);
              localStorage.setItem("id_neg", String(response.id_neg));
            }
          }),
          catchError((error) => {
            console.log(error);
            alert("Error al iniciar sesión");
            return of(null);
          })
        )
        .subscribe();
    } else {
      alert("Complete todos los campos");
    }
  }

  registrar(username:string,password:string,email:string){
    if (username!="" && password != "" && email != "") {
      this.iniciarSesionService.registrar(username, password, email) .pipe(
        tap(() => {
          alert("Registrado exitosamente, ahora inicie sesión");
          window.location.reload();
        }),
        catchError(() => {
          alert("Error al registrar");
          return of(null);
        })
      )
      .subscribe();
    } else alert ("Complete todos los campos");
  }

  registrar_negocio(nombreNeg:string, adminstrador:string,password:string,email:string,categoria:string){
    if (nombreNeg!="" && adminstrador != "" && password != "" && email != "" && categoria != "") {
      this.iniciarSesionService.registrar_negocio(nombreNeg,adminstrador,password,email,categoria).pipe(
        tap(() => {
          alert("Registrado exitosamente, ahora inicie sesión");
          window.location.reload();
        }),
        catchError(() => {
          alert("Error al registrar");
          return of(null);
        })
      )
      .subscribe();
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
