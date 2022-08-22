import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { RelojComponent } from './components/reloj/reloj.component';
import { NavComponent } from './components/nav/nav.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderProductosComponent } from './components/header-productos/header-productos.component';
import { ProductosComponent } from './components/productos/productos.component';
import { HttpClientModule } from '@angular/common/http';
import { CartComponent } from './components/cart/cart.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { BuscarProductosPipe } from './pipes/buscar-productos.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment';
//AGREGAR EL IDIOMA
import localeES from '@angular/common/locales/es-CL';
import { registerLocaleData } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';

registerLocaleData(localeES,'es');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NosotrosComponent,
    RelojComponent,
    NavComponent,
    HeaderProductosComponent,
    ProductosComponent,
    CartComponent,
    BuscarProductosPipe,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule.forRoot(environment.auth0),
  ],
  providers: [
     //REGISTRO EL EDIOMA
     {provide: LOCALE_ID, useValue: 'es-CL'}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
