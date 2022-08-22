import { CartItem } from "./cart-item";
import { Cliente } from "./cliente";
import { Envio } from "./envio";

export class Pedido {
  cliente: Cliente;
  envio: Envio;
  productos: CartItem[];

  constructor(cliente: Cliente, envio: Envio, productos: CartItem[]) {
    this.cliente = cliente;
    this.envio = envio;
    this.productos = productos;
  }
}
