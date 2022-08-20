import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CartService } from 'src/app/services/cart.service';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit {
  @Input() productos: Producto[] = [];
  cantidadProductos: number = 0;
  searchKey: string = '';
  @Output() searchValue = new EventEmitter<string>();
  public pages: number = 1;

  constructor(
    private productoService: ProductosService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(): void {
    this.productoService.getProductosTienda().subscribe((data) => {
      this.productos = data.data;
      this.cantidadProductos = this.productos.length;
    });
  }

  addtocart(producto: Producto): void {
    this.cartService.addToCart(producto);
  }

  filter(searchValue: any): void {
    if (!searchValue) {
      this.obtenerProductos();
    } else {
      this.productos = this.productos.filter((producto: Producto) =>
        producto.nombre.toLocaleLowerCase().includes(searchValue)
      );
      this.cantidadProductos = this.productos.length;
    }
  }
}
