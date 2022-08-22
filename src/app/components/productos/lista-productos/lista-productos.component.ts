import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductosService } from 'src/app/services/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css'],
})
export class ListaProductosComponent implements OnInit {
  @Input() productos: Producto[] = [];
  @Input() mensaje: string = '';
  titulo: string = 'Listado de Productos';
  public pages: number = 1;

  optionSort: { property: string | null; order: string } = {
    property: null,
    order: 'asc',
  };

  constructor(private productoService: ProductosService) {}

  ngOnInit(): void {
    this.getProductos();
  }
  getProductos(): void {
    this.productoService.getProductos().subscribe((data) => {
      this.productos = data.data;
    });
  }

  ordenarListadoProductos(property: string): void {
    const { order } = this.optionSort;
    this.optionSort = {
      property,
      order: order === 'asc' ? 'desc' : 'asc',
    };
    console.log(this.optionSort);
  }

  eliminarProducto(producto: Producto): void {
    const swalWhitBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-danger',
      },
    });

    swalWhitBootstrapButtons
      .fire({
        title: 'Estas seguro?',
        text: `Seguro que desea eliminar al empleado ${producto.nombre}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar',
        cancelButtonText: 'Me arrepiento!',
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.productoService
            .deleteProducto(producto.id)
            .subscribe((response) => {
              this.productos = this.productos.filter(
                (prod) => prod.id != producto.id
              );
              swalWhitBootstrapButtons.fire(
                'Eliminado!',
                response.message,
                'success'
              );
            });
        }
      });
  }

  filter(event: any): void {
    const searchValue = event.target.value.trim().toLocaleLowerCase();
    if (!searchValue) {
      this.getProductos();
    } else {
      this.productos = this.productos.filter((producto: Producto) =>
        producto.nombre.toLocaleLowerCase().includes(searchValue)
      );
    }
  }
}
