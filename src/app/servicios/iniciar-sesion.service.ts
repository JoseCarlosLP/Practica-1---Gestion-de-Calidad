import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

export interface RespuestaLogin {
  token: string;
  idNeg: Number;
  idUsu: Number;
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

  iniciarSesion(userOrAdminName:string,password:String){
    const body = {
      userOrAdminName:userOrAdminName,
      password:password
    }
    return this.http.post<RespuestaLogin>("http://127.0.0.1:8000/login",body)
  }

  registrar(username:String,password:String,email:String){
    const body = {
      username:username,
      password:password,
      email:email,
    }
    return this.http.post("http://127.0.0.1:8000/registrar",body)
  }

  registrarNegocio(nombre:String, adminstrador:String,password:String,email:String,categoria:String){
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
  actualizarCliente(Username:String,Email:String,Password:String){
    const id=Number(localStorage.getItem('idCli'))
    const body = {
      username:Username,
      email:Email,
      password:Password
    }
    return this.http.post("http://127.0.0.1:8000/ActualizarUsuario/"+id,body)
  }
}
