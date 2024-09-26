import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

export interface RespuestaLogin {
  token: string;
  id_neg: number;
  idUsu: number;
}

@Injectable({
  providedIn: 'root'
})
export class IniciarSesionService {
  private tokenKey = 'authToken';
  constructor(private http: HttpClient, private router: Router) { }

  guardarToken(token: string): void {
    // Almacenar el token en localStorage
    localStorage.setItem(this.tokenKey, token);
  }

  obtenerToken(): string | null {
    // Obtener el token almacenado
    return localStorage.getItem(this.tokenKey);
  }

  eliminarToken(): void {
    // Eliminar el token de localStorage
    localStorage.removeItem(this.tokenKey);
  }

  iniciarSesion(userOrAdminName:string,password:string){
    const body = {
      userOrAdminName:userOrAdminName,
      password:password
    }
    return this.http.post<RespuestaLogin>("http://127.0.0.1:8000/login",body)
  }

  registrar(username:string,password:string,email:string){
    const body = {
      username:username,
      password:password,
      email:email,
    }
    return this.http.post("http://127.0.0.1:8000/registrar",body)
  }

  registrar_negocio(nombre:string, adminstrador:string,password:string,email:string,categoria:string){
    const body = {
      Nombre:nombre,
      AdminName:adminstrador,
      password:password,
      email:email,
      Categoria:categoria
    }
    return this.http.post("http://127.0.0.1:8000/registrarN",body)
  }
  obtenerCliente(){
    const id=Number(localStorage.getItem('idCli'))
    console.log("id en servicio",id)
    return this.http.get("http://127.0.0.1:8000/Usuario/"+id)
  }
  actualizarCliente(Username:string,Email:string,Password:string){
    const id=Number(localStorage.getItem('idCli'))
    const body = {
      username:Username,
      email:Email,
      password:Password
    }
    return this.http.post("http://127.0.0.1:8000/ActualizarUsuario/"+id,body)
  }
}
