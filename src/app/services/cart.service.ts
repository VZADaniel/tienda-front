import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { CartItem } from '../models/cart-item';
import { Pedido } from '../models/pedido';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private backEndPoint: string = environment.backend;
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  private _cartItems: CartItem[] =
    JSON.parse(window.sessionStorage.getItem('cartSession')) || [];
  private _itemsSubject: BehaviorSubject<CartItem[]> = new BehaviorSubject(this._cartItems);
  public cartItems: Observable<CartItem[]> = this._itemsSubject.asObservable();
  cartCount = new BehaviorSubject<number>(parseInt(window.sessionStorage.getItem('cartCount')) || 0);

  constructor(private httpClient: HttpClient, private router: Router) { }

  getCart() {
    return this._cartItems;
  }

  addToCart(producto: CartItem) {
    let index = this._cartItems.findIndex((item) => item.id === producto.id);
    if (index === -1) {
      this._cartItems.push({
        ...producto,
        cantidad: 1,
        total: producto.precio,
      });
      this.cartCount.next(this._cartItems.length);
      window.sessionStorage.setItem('cartCount', this._cartItems.length.toString());
      Swal.fire({
        icon: 'success',
        title: `${producto.nombre} agregado al carrito`,
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      if (this._cartItems[index].cantidad < producto['stock']) {
        this._cartItems[index].cantidad++;
        this._cartItems[index].total =
          this._cartItems[index].precio * this._cartItems[index].cantidad;
        Swal.fire({
          icon: 'success',
          title: `${producto.nombre} agregado al carrito`,
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        Swal.fire(
          'Advertencia',
          `No se pueden pedir más ${producto.nombre} de los que hay en stock`,
          'warning'
        );
      }
    }

    window.sessionStorage.setItem(
      'cartSession',
      JSON.stringify(this._cartItems)
    );
  }

  updateCart(producto: CartItem) {
    let index = this._cartItems.findIndex((item) => item.id === producto.id);
    if (this._cartItems[index].cantidad > 1) {
      this._cartItems[index].total =
        this._cartItems[index].precio * this._cartItems[index].cantidad;
    }

    window.sessionStorage.setItem(
      'cartSession',
      JSON.stringify(this._cartItems)
    );
  }

  removeItem(id: number) {
    let index = this._cartItems.findIndex((item) => item.id === id);
    this._cartItems.splice(index, 1);
    this.cartCount.next(this._cartItems.length);
    window.sessionStorage.setItem('cartCount', this._cartItems.length.toString());

    window.sessionStorage.setItem(
      'cartSession',
      JSON.stringify(this._cartItems)
    );
  }

  deleteCart() {
    this._cartItems.splice(0, this._cartItems.length);
    this.cartCount.next(this._cartItems.length);
    window.sessionStorage.setItem('cartCount', this._cartItems.length.toString());

    window.sessionStorage.setItem(
      'cartSession',
      JSON.stringify(this._cartItems)
    );
  }

  enviarPedido(data: Pedido):Observable<any> {
    return this.httpClient.post(`${this.backEndPoint}/checkout`, data, { headers: this.httpHeaders });
  }
}
