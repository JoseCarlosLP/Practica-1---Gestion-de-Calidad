import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carrito: any[] = [];
  idNeg:Number= 0;
  constructor(private http: HttpClient) { }
  obtenerCarrito(): any[] {
    return this.carrito;
  }

  agregarAlCarrito(codProd: string, nombre:string,cantidad: number, precio: number): void {
    const productoEnCarrito = this.carrito.find(item => item.codProd === codProd);

    if (productoEnCarrito) {
      productoEnCarrito.cantidad += cantidad;
    } else {
      this.carrito.push({ codProd, nombre,cantidad, precio });
    }
  }
  calcularTotal(): number {
    return this.carrito.reduce((total, item) => total + item.cantidad * item.precio, 0);
  }
  vaciarCarrito(): void {
    this.carrito = [];
  }
  guardarCarrito(IdNeg:number,idUser:number){
    const body = {
      idNeg:IdNeg,
      idUser:localStorage.getItem('idCli'),
      productos:this.carrito,
      total:this.calcularTotal()
    }
    console.log("manda body: ",body)
    return this.http.post("http://127.0.0.1:8000/registrarPedido",body);
  }
}
