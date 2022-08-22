import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Producto } from '../models/producto';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private backEndPoint: string = environment.backend;
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) {}

  getProductos(): Observable<any> {
    return this.http.get<any>(this.backEndPoint);
  }

  getProductosTienda(): Observable<any> {
    return this.http.get<any>(`${this.backEndPoint}/stock-gt-zero`);
  }

  getProducto(id: number): Observable<any> {
    return this.http.get<any>(`${this.backEndPoint}/${id}`).pipe(
      catchError((e) => {
        this.router.navigate([`/productos/lista`]);
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  createProducto(producto: Producto): Observable<any> {
    return this.http
      .post(this.backEndPoint, this.formDataGenerate(producto))
      .pipe(
        map((response: any) => response.data as Producto),
        catchError((e) => {
          console.error(e.error.mensaje);
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }

  updateProducto(producto: Producto): Observable<any> {
    return this.http
      .put<any>(`${this.backEndPoint}/${producto.id}`, this.formDataGenerate(producto))
      .pipe(
        catchError((e) => {
          console.error(e.error.mensaje);
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }

  private formDataGenerate(data: any): FormData {
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }

    return formData;
  }

  deleteProducto(id: number): Observable<any> {
    return this.http
      .delete<any>(`${this.backEndPoint}/${id}`, { headers: this.httpHeaders })
      .pipe(
        catchError((e) => {
          console.error(e.error.mensaje);
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }
}
