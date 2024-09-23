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
  obtenerProducto(idNeg:number,cod_prod:Number){
    const url=`${"http://127.0.0.1:8000/dnegocio"}/${idNeg}${"/producto"}/${cod_prod}`;
    return this.http.get(url)
  }
  insertProducto(NegId:number,cod_prod:number,nombre: string, descripcion:string,categoria:string, precio: number,imagen:string){
    const body = {
      cod_prod:cod_prod,
      Nombre:nombre,
      Descripcion:descripcion,
      Categoria:categoria,
      Precio:precio,
      Imagen:imagen
    }
    return this.http.post("http://127.0.0.1:8000/insertarProducto/"+NegId,body)
  }
  updateProducto(NegId:number,cod_prod:number,nombre: string, descripcion:string,categoria:string, precio: number,imagen:string){
    const body = {
      cod_prod:cod_prod,
      Nombre:nombre,
      Descripcion:descripcion,
      Categoria:categoria,
      Precio:precio,
      Imagen:imagen
    }
    return this.http.post("http://127.0.0.1:8000/actualizar/"+NegId,body)
  }
  eliminarProducto(cod_prod:number,id:Number){
    return this.http.delete("http://127.0.0.1:8000/producto/"+cod_prod+"/"+id);
  }

  obtenerPedidosCliente(id_cliente: Number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("authToken")}`
    });
    return this.http.get("http://127.0.0.1:8000/pedidosCliente/" + id_cliente,{ headers: headers })
  }

  obtenerPedidosNegocio(id_negocio: Number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("authToken")}`
    });
    return this.http.get("http://127.0.0.1:8000/pedidosNegocio/" + id_negocio,{ headers: headers })
  }

  actualizarPedido(idPedido: Number)
  {
    const body = {
      idPedido:idPedido
    }
    return this.http.post("http://127.0.0.1:8000/pedidosNegocio",body)
  }
}
