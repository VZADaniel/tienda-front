import { Component, OnInit } from '@angular/core';
import { faCartShopping, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header-productos',
  templateUrl: './header-productos.component.html',
  styleUrls: ['./header-productos.component.css']
})
export class HeaderProductosComponent implements OnInit {
faTrash = faTrash;
faCartShopping=faCartShopping;
faSearch=faSearch;
faCartPlus=faCartShopping


  constructor() { }

  ngOnInit(): void {
  }

}
