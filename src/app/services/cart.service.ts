import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItemList: any = []
  public productList = new BehaviorSubject<any>([]);
  //variable para buscar en buscador
  public search = new BehaviorSubject<string>("");

  constructor() { }

  getProducts() {
    return this.productList.asObservable()
  }

  setProduct(prod: any) {
    this.cartItemList.push(...prod);
    this.productList.next(prod);
  }

  addtocart(prod: any) {
    this.cartItemList.push(prod);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    console.log(this.cartItemList)

  }
  getTotalPrice(): number {
    let granTotal = 0;
    this.cartItemList.map((a: any) => {
      granTotal += a.total;
      console.log(granTotal + 'oli')
    })
    return granTotal;
  }
  removeCartItem(prod: any) {
    this, this.cartItemList.map((a: any, index: any) => {
      if (prod.id === a.id) {
        this.cartItemList.splice(index, 1);
      }
    })
    this.productList.next(this.cartItemList);
  }
  removeAllCart() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList)

  }
}
