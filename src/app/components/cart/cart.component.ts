import { Component, OnInit } from '@angular/core';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  faDelete = faTrashAlt;
  // se declara producto vacio
  public productos: any = [];
  public granTotal !: number;

  // se inyecta carService
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    // se colocan los productos en el carrito
    this.cartService.getProducts()
      .subscribe(res => {
        this.productos = res;
        //   this.granTotal = this.cartService.getTotalPrice();
        //   console.log(this.granTotal)
        //   console.log(this.productos)
        // })
        this.granTotal = this.productos.reduce((acc: number, productos: { precio: number; quantity: number; }) => acc + (productos.precio * productos.quantity), 0);
        console.log(this.granTotal)
      });


  }
  removeItem(item: any) {
    this.cartService.removeCartItem(item);
  }

  emptycart() {
    this.cartService.removeAllCart();
  }

}