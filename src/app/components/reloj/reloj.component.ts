import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reloj',
  templateUrl: './reloj.component.html',
  styleUrls: ['./reloj.component.css'],
})
export class RelojComponent implements OnInit {
  //variable de tipo number, nos muestra la fecha de ahora
  fecha: number = Date.now();
  // otra variable de tipo
  hora: any;

  constructor() {}

  ngOnInit(): void {
    this.mostrarHora();
  }

  mostrarHora() {
    //esta hora es igual
    this.hora = new Date();
    // que cada 1 segundo
    setInterval(() => {this.hora = new Date()}, 1000);
  }
}
