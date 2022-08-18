import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Producto } from '../models/producto';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private backEndPoint: string = 'http://localhost:8080/api/productos';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) {}

  getProductos(): Observable<any> {
    return this.http.get<any>(this.backEndPoint);
  }

  getProducto(id: number): Observable<any> {
    return this.http.get<any>(`${this.backEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate([`/productos/lista`]);
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje,e.error.error,'error');
        return throwError(e);
      })
    )
  }

  createProducto(producto: Producto): Observable<any> {
    return this.http.post(this.backEndPoint, producto, {headers: this.httpHeaders}).pipe(
      map((response: any) => response.data as Producto),
      catchError(e => {
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje,e.error.error,'error');
        return throwError(e);
      })
    );
  }

  updateProducto(producto: Producto): Observable<any> {
    return this.http.put<any>(`${this.backEndPoint}/${producto.id}`,producto,{headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje,e.error.error,'error');
        return throwError(e);
      })
    );
  }

  deleteProducto(id: number): Observable<any> {
    return this.http.delete<any>(`${this.backEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje,e.error.error,'error');
        return throwError(e);
      })
    );
  }
}
