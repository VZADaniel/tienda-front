import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header-productos',
  templateUrl: './header-productos.component.html',
  styleUrls: ['./header-productos.component.css'],
})
export class HeaderProductosComponent implements OnInit {
  @Input() message: string = '';
  @Output() searchValue = new EventEmitter<string>();
  titulo: string = 'Listado de Productos';
  constructor() {}

  ngOnInit(): void {}

  filter(event: any): void {
    const value = event.target.value;
    this.searchValue.emit(value.toLocaleLowerCase().trim());
  }
}
