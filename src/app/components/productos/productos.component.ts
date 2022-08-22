import { Component, Input, OnInit } from '@angular/core';
import { faCartShopping, faICursor } from '@fortawesome/free-solid-svg-icons';
import { CartService } from 'src/app/services/cart.service';
import { Producto } from 'src/app/services/producto';
import { ProductoService } from 'src/app/services/producto.service';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  
})
export class ProductosComponent implements OnInit {
 @Input() producto: Producto []=[]
 @Input()mensaje: string ='';
 faComprar=faCartShopping;
 p: number = 1;  

  constructor(private productoService: ProductoService, private cartService: CartService) { }

  ngOnInit(): void {

    this.obtenerProductos()
    
  }


  obtenerProductos():void{
    this.productoService.getProducto().subscribe(
      (data)=>{
        console.log(data)
        this.producto = data.data;
        this.mensaje = data.message;
        console.log(this.producto);

        this.producto.forEach((a:any) => {
          Object.assign(a,{quantity:1,total:a.price})
        });
      }
        
      
    )
  }

  addtocart(producto: any){
   this.cartService.addtocart(producto);
  }

}
