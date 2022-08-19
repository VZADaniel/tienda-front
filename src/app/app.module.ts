import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { RelojComponent } from './components/reloj/reloj.component';
import { NavComponent } from './components/nav/nav.component';
import { ProductosComponent } from './components/productos/productos.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthModule } from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment';
import { AuthButtonComponent } from './components/auth-button/auth-button.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es-CL';
import { OrderListPipe } from './pipes/order-list.pipe';
import { TruncateLetterPipe } from './pipes/truncate-letter.pipe';
import { ListaProductosComponent } from './components/productos/lista-productos/lista-productos.component';
import { FormularioComponent } from './components/productos/formulario/formulario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

registerLocaleData(localeES, 'es');
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NosotrosComponent,
    RelojComponent,
    NavComponent,
    ProductosComponent,
    AuthButtonComponent,
    UserProfileComponent,
    OrderListPipe,
    TruncateLetterPipe,
    ListaProductosComponent,
    FormularioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    AuthModule.forRoot(environment.auth0),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
