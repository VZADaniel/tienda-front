import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _cartItems: CartItem[] =
    JSON.parse(window.sessionStorage.getItem('cartSession')) || [];
  private _itemsSubject: BehaviorSubject<CartItem[]> = new BehaviorSubject(
    this._cartItems
  );
  public cartItems: Observable<CartItem[]> = this._itemsSubject.asObservable();
  constructor() {}

  addToCart(producto: CartItem) {
    let index = this._cartItems.findIndex((item) => item.id === producto.id);
    if (index === -1)
      this._cartItems.push({
        ...producto,
        cantidad: 1,
        total: producto.precio,
      });
    else {
      if(this._cartItems[index].cantidad < producto['stock']){
        this._cartItems[index].cantidad++;
        this._cartItems[index].total =
          this._cartItems[index].precio * this._cartItems[index].cantidad;
      }else{
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
    if(this._cartItems[index].cantidad > 1){
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

    window.sessionStorage.setItem(
      'cartSession',
      JSON.stringify(this._cartItems)
    );
  }

  deleteCart(){
    this._cartItems.splice(0, this._cartItems.length);

    window.sessionStorage.setItem(
      'cartSession',
      JSON.stringify(this._cartItems)
    );
  }
}
