import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { Pagina404Component } from './components/pagina404/pagina404.component';
import { FormularioComponent } from './components/productos/formulario/formulario.component';
import { ListaProductosComponent } from './components/productos/lista-productos/lista-productos.component';
import { ProductosComponent } from './components/productos/productos.component';

const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home' },
  { path: 'home', redirectTo: '' },
  { path: 'nosotros', component: NosotrosComponent, title: 'Nosotros' },
  { path: 'cart', component: CartComponent, title: 'Carro de Compras' },
  { path: 'productos', title: 'Productos', component: ProductosComponent },
  {
    path: 'productos/lista',
    title: 'Admin | Listado Productos',
    component: ListaProductosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'productos/lista/formulario',
    title: 'Admin | Formulario Productos',
    component: FormularioComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'productos/lista/formulario/:id',
    title: 'Admin | Formulario Productos',
    component: FormularioComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '404',
    title: 'Página no encontrada!',
    component: Pagina404Component,
  },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
