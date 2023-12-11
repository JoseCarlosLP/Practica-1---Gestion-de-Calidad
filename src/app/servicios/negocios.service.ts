import { Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NegociosService{

  constructor(private http: HttpClient) { }

  obtenerNegocios() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("authToken")}`
    });
    return this.http.get("http://127.0.0.1:8000/negocios",{ headers: headers })
  }
  obtenerNegocio(id:Number){
    const url=`${"http://127.0.0.1:8000/negocios"}/${id}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("authToken")}`
    });
    return this.http.get(url,{headers: headers})
  }
  obtenerProducto(idNeg:number,codProd:Number){
    const url=`${"http://127.0.0.1:8000/dnegocio"}/${idNeg}${"/producto"}/${codProd}`;
    return this.http.get(url)
  }
  insertProducto(NegId:number,codProd:number,nombre: string, descripcion:string,categoria:string, precio: number,imagen:string){
    const body = {
      codProd:codProd,
      Nombre:nombre,
      Descripcion:descripcion,
      Categoria:categoria,
      Precio:precio,
      Imagen:imagen
    }
    return this.http.post("http://127.0.0.1:8000/insertarProducto/"+NegId,body)
  }
  updateProducto(NegId:number,codProd:number,nombre: string, descripcion:string,categoria:string, precio: number,imagen:string){
    const body = {
      codProd:codProd,
      Nombre:nombre,
      Descripcion:descripcion,
      Categoria:categoria,
      Precio:precio,
      Imagen:imagen
    }
    return this.http.post("http://127.0.0.1:8000/actualizar/"+NegId,body)
  }
  eliminarProducto(codProd:number,id:Number){
    return this.http.delete("http://127.0.0.1:8000/producto/"+codProd+"/"+id);
  }

  obtenerPedidosCliente(idCliente: Number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("authToken")}`
    });
    return this.http.get("http://127.0.0.1:8000/pedidosCliente/" + idCliente,{ headers: headers })
  }

  obtenerPedidosNegocio(idNegocio: Number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("authToken")}`
    });
    return this.http.get("http://127.0.0.1:8000/pedidosNegocio/" + idNegocio,{ headers: headers })
  }

  actualizarPedido(idPedido: Number)
  {
    const body = {
      idPedido:idPedido
    }
    return this.http.post("http://127.0.0.1:8000/pedidosNegocio",body)
  }
}
