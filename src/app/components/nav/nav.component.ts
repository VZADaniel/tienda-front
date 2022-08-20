import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  user : any = {};

  constructor(
    @Inject(DOCUMENT) public document: Document,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((success: any) => {
      this.user = success;
      console.log(this.user);
    });
  }

  public logout(): void {
    return this.authService.logout({ returnTo: document.location.origin });
  }
}
