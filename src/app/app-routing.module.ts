import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { ProductosComponent } from './components/productos/productos.component';

const routes: Routes = [
 
{
  path: 'home', component:HomeComponent,
},
{
  path:'nosotros', component:NosotrosComponent,
},
{
path:'productos', component:ProductosComponent,
},
{
  path:'cart', component:CartComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
