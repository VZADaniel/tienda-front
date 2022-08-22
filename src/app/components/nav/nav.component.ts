import { DOCUMENT, Location } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  //indicar variables
  route: string = '';
  isAuthenticated: boolean;


  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService, private location: Location, private router: Router) {
    this.isAuthenticated = false;
  }

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe((success: boolean) => {
      this.isAuthenticated = success
    })
  }

  public login(): void {
    this.route = this.location.path();
    this.auth.loginWithRedirect({
      appState: { target: this.route }
    });
  }

  public logout(): void {
    this.auth.logout({ returnTo: document.location.origin })
  }

}
