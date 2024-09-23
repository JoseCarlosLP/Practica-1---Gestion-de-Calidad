import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carrito: any[] = [];
  id_neg:Number= 0;
  constructor(private http: HttpClient) { }
  obtenerCarrito(): any[] {
    return this.carrito;
  }

  agregarAlCarrito(cod_prod: string, nombre:string,cantidad: number, precio: number): void {
    const productoEnCarrito = this.carrito.find(item => item.cod_prod === cod_prod);

    if (productoEnCarrito) {
      productoEnCarrito.cantidad += cantidad;
    } else {
      this.carrito.push({ cod_prod, nombre,cantidad, precio });
    }
  }
  calcularTotal(): number {
    return this.carrito.reduce((total, item) => total + item.cantidad * item.precio, 0);
  }
  vaciarCarrito(): void {
    this.carrito = [];
  }
  guardarCarrito(id_neg:number,idUser:number){
    const body = {
      id_neg:id_neg,
      idUser:Number(localStorage.getItem('idCli')),
      productos:this.carrito,
      total:this.calcularTotal()
    }
    console.log("manda body: ",body)
    return this.http.post("http://127.0.0.1:8000/registrarPedido",body);
  }
}
