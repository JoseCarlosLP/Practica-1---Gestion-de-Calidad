import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NegociosService{

  constructor(private http: HttpClient) { }

  obtenerNegocios()
  {
   return this.http.get("http://127.0.0.1:8000/negocios")
  }
  obtenerNegocio(id:Number){
    const url=`${"http://127.0.0.1:8000/negocios"}/${id}`;
    return this.http.get(url)
  }
  obtenerProducto(idNeg:number,codProd:Number){
    const url=`${"http://127.0.0.1:8000/dnegocio"}/${idNeg}${"/producto"}/${codProd}`;
    return this.http.get(url)
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
  eliminarProducto(codProd:number){
    return this.http.delete("http://127.0.0.1:8000/producto/"+codProd);
  }
}
