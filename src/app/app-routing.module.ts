import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { HomeComponent } from './components/home/home.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { FormularioComponent } from './components/productos/formulario/formulario.component';
import { ListaProductosComponent } from './components/productos/lista-productos/lista-productos.component';
import { ProductosComponent } from './components/productos/productos.component';

const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home' },
  { path: 'home', redirectTo: '' },
  { path: 'nosotros', component: NosotrosComponent, title: 'Nosotros' },
  { path: 'productos', title: 'Productos', component: ProductosComponent },
  { path: 'productos/lista', title: 'Admin | Listado Productos', component: ListaProductosComponent, canActivate:[AuthGuard] },
  { path: 'productos/lista/formulario', title: 'Admin | Formulario Productos', component: FormularioComponent, canActivate:[AuthGuard] },
  { path: 'productos/lista/formulario/:id', title: 'Admin | Formulario Productos', component: FormularioComponent, canActivate:[AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
