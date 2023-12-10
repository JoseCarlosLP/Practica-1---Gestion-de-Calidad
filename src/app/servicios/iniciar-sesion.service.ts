import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

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

  iniciarSesion(username:String,password:String){
    const body = {
      username:username,
      password:password
    }
    return this.http.post("http://127.0.0.1:8000/login",body)
  }

  registrar(username:String,password:String,email:String){
    const body = {
      "_id":2222,
      username:username,
      password:password,
      email:email
    }
    //return this.http.post("http://127.0.0.1:8000/registrar",body)
    return this.http.delete("http://127.0.0.1:8000/producto/2");
  }

  cerrarSesion(): void {
    this.router.navigate(['/login']);
  }
}
