import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ProductosService } from 'src/app/services/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent implements OnInit {
  titleCreate: string = 'Formulario Registro Nuevos Productos';
  titleUpdate: string = 'Formulario Actualización Productos';
  producto: Producto = new Producto();
  submitted: boolean = false;

  form: FormGroup = new FormGroup({
    codigo: new FormControl(''),
    nombre: new FormControl(''),
    descripcion: new FormControl(''),
    precio: new FormControl(''),
    stock: new FormControl(''),
    foto: new FormControl(''),
  });

  constructor(
    private formBuilder: FormBuilder,
    private productoService: ProductosService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getProducto();
    this.form = this.formBuilder.group({
      codigo: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ],
      ],
      nombre: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      descripcion: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(100),
        ],
      ],
      precio: [
        0,
        [Validators.required, Validators.min(0), Validators.maxLength(11)],
      ],
      stock: [
        0,
        [Validators.required, Validators.min(0), Validators.maxLength(11)],
      ],
      foto: [''],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmitCreate(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.createProducto();
  }

  onSubmitUpdate(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.updateProducto();
  }

  fileUpload(event: any) {
    this.producto.foto = event.target.files[0];
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  public createProducto(): void {
    this.productoService.createProducto(this.producto).subscribe((producto) => {
      this.router.navigate(['/productos/lista']);
      Swal.fire(
        'Producto nuevo',
        `El Producto ${producto.nombre} ha sido registrado satisfactoriamente`,
        'success'
      );
    });
  }

  public getProducto(): void {
    this.activatedRoute.params.subscribe((params) => {
      let id = params['id'];
      if (id) {
        this.productoService
          .getProducto(id)
          .subscribe((response) => (this.producto = response.data));
      }
    });
  }

  public updateProducto(): void {
    this.productoService.updateProducto(this.producto).subscribe((data) => {
      this.router.navigate(['/productos/lista']);
      Swal.fire(
        'Producto actualizado',
        `Producto ${data.nombre} modificado con éxito`,
        'success'
      );
    });
  }
}
