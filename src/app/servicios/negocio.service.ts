import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NegocioService {

  constructor(private http: HttpClient) { }
  getNegocio(id: number): Observable<any> {
    const cadena: string = "http://127.0.0.1:8000/negocio";
    const url: string = `${cadena}${id}`;
    return this.http.get(url);
  }
}
