
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faCartShopping, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-header-productos',
  templateUrl: './header-productos.component.html',
  styleUrls: ['./header-productos.component.css']
})
export class HeaderProductosComponent implements OnInit {
  faTrash = faTrash;
  faCartShopping = faCartShopping;
  faSearch = faSearch;
  faCartPlus = faCartShopping


  // se declara la variable total item que empieza en cero
  public totalItem: number = 0;
  // se declara la variable como un string vacio
  public searchTerm !: string;
  @Input() message: string = '';
  @Output() searchValue = new EventEmitter<string>();
  titulo: string = 'Listado de Productos';

  constructor(private cartService: CartService) { }
  // constructor() { }

  ngOnInit(): void {
    // para agregar productos al carrito
    this.cartService.getProducts().subscribe(res => {
      this.totalItem = res.length;
    })

  }

  //filtrar
  // buscarProductos(event: any): void {
  //   this.searchTerm =(event.target as HTMLInputElement).value;
  //   console.log(this.searchTerm);
  //   this.cartService.search.next(this.searchTerm);
  // }
  
  // buscarProductos(event: any): void {
  //   const value = event.target.value;
  //   this.searchValue.emit(value.toLocaleLowerCase().trim());
  // }

}
