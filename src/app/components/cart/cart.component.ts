import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item';
import { CartService } from 'src/app/services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  public cartItems: CartItem[] = [];

  constructor(private cartService: CartService) {}

  optionSort: { property: string | null; order: string } = {
    property: null,
    order: 'asc',
  };

  ngOnInit(): void {
    this.cartService.cartItems.subscribe((data) => (this.cartItems = data));
  }

  ordenarListadoProductos(property: string): void {
    const { order } = this.optionSort;
    this.optionSort = {
      property,
      order: order === 'asc' ? 'desc' : 'asc',
    };
    console.log(this.optionSort);
  }

  total(): number {
    let sum = 0;
    this.cartItems.forEach((item) => {
      sum += item.cantidad * item.precio;
    });

    return sum;
  }

  aumentar(item: CartItem): void {
    if (item['stock'] > item.cantidad) {
      item.cantidad++;
      this.cartService.updateCart(item);
    } else {
      Swal.fire(
        'Advertencia',
        `No se pueden pedir más ${item.nombre} de los que hay en stock`,
        'warning'
      );
    }
  }

  disminuir(item: CartItem): void {
    if (item.cantidad > 1) {
      item.cantidad--;
      this.cartService.updateCart(item);
    } else {
      Swal.fire(
        'Advertencia',
        `No se pueden pedir menos que 1 ${item.nombre}`,
        'warning'
      );
    }
  }

  verifyBeerQuantity(item: CartItem): void {
    if (item['stock'] < item.cantidad) {
      item.cantidad = item['stock'];
    }

    if (item.cantidad < 0) {
      Swal.fire(
        'Advertencia',
        `No se pueden pedir menos que 0 ${item.nombre}`,
        'warning'
      );
      item.cantidad = 0;
    }
  }

  removeProduct(id: number) {
    this.cartService.removeItem(id);
  }

  deleteCart(){
    this.cartService.deleteCart();
  }
}
