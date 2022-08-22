import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/models/cart-item';
import { Cliente } from 'src/app/models/cliente';
import { Envio } from 'src/app/models/envio';
import { Pedido } from 'src/app/models/pedido';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class CheckoutComponent implements OnInit {

  public cartItems: CartItem[] = [];
  cliente = new Cliente();
  envio = new Envio();

  formCliente: FormGroup = new FormGroup({
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    correo: new FormControl(''),
    telefono: new FormControl(''),
  });

  formEnvio: FormGroup = new FormGroup({
    calle: new FormControl(''),
    numero: new FormControl(''),
    ciudad: new FormControl(''),
    region: new FormControl('')
  });

  private emailPattern: any = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  submittedCliente: boolean = false;
  submittedEnvio: boolean = false;


  constructor(private formBuilder: FormBuilder, private router: Router, private cartService: CartService) { }


  ngOnInit(): void {
    this.cartItems = this.cartService.getCart();
    this.formCliente = this.formBuilder.group({
      nombre: ['',
        [Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)]
      ],
      apellido: ['',
        [Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)]
      ],
      correo: ['',
        [Validators.required,
        Validators.maxLength(255),
        Validators.pattern(this.emailPattern)]
      ],
      telefono: ['',
        [Validators.required,
        Validators.minLength(8),
        Validators.maxLength(15)]
      ],
    });

    this.formEnvio = this.formBuilder.group({
      calle: ['',
        [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)]
      ],
      numero: ['',
        [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(20)]
      ],
      ciudad: ['',
        [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)]
      ],
      region: ['',
        [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40)]
      ],
    })
  }

  get fCliente(): { [key: string]: AbstractControl } {
    return this.formCliente.controls;
  }

  get fEnvio(): { [key: string]: AbstractControl } {
    return this.formEnvio.controls;
  }

  stepTwo(): void{
    this.submittedCliente = true;
    if (this.formCliente.invalid) return;
  }

  confirmStep(): void {
    this.submittedEnvio = true;
    if (this.formEnvio.invalid) return;
  }

  total(): number {
    let sum = 0;
    this.cartItems.forEach((item) => {
      sum += item.cantidad * item.precio;
    });

    return sum;
  }

  enviarOrden(): void{
    const pedido = new Pedido(this.cliente, this.envio, this.cartItems);
    this.cartService.enviarPedido(pedido).subscribe(data => console.log(data));
  }
}
