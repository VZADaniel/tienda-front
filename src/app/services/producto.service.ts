import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { Producto } from './producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  //de que puerto lo va a levantar
  private urlEndPoint: string = 'http://localhost:8088/api/productos';
  private httpHeaders = new HttpHeaders({'Content-type' : 'application/json'});  
  
  constructor(private http: HttpClient,  private router: Router) { }

  getProducto() : Observable<any> {
    return this.http.get<any>(this.urlEndPoint);
  } 
}
