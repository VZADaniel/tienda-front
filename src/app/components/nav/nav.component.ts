import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  user: any = {};
  cartCount: number = 0;

  constructor(
    @Inject(DOCUMENT) public document: Document,
    public authService: AuthService,
    private cartService: CartService
  ) {
    this.cartService.cartCount.subscribe(response => this.cartCount = response);

  }

  ngOnInit(): void {
    this.authService.user$.subscribe((success: any) => {
      this.user = success;
      console.log(this.user);
    });
  }

  public login(): void {
    this.authService.loginWithRedirect();
  }

  public logout(): void {
    return this.authService.logout({ returnTo: document.location.origin });
  }
}
