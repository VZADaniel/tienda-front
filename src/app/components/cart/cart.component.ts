import { Component, OnInit } from '@angular/core';
import { faDeleteLeft, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  faDelete=faTrashAlt;
  constructor() { }

  ngOnInit(): void {
  }

}
