import { Component, Input, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  @Input() productos: Producto[] = [];
  @Input() message: string = '';
  titulo: string = 'Listado de Productos';
  public pages: number = 1;

  constructor(private productoService: ProductosService) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos():void{
    this.productoService.getProductos().subscribe((data) => {
      this.message = data.message;
      this.productos = data.data;
    });
  }
}
