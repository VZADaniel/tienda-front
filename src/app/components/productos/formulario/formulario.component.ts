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
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  titleCreate: string = 'Formulario Registro Nuevos Productos';
	titleUpdate: string = 'Formulario Actualización Productos';
	producto: Producto = new Producto();
	submitted: boolean = false;

  private emailPattern: any =
		/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

	form: FormGroup = new FormGroup({
		nombre: new FormControl(''),
		descripcion: new FormControl(''),
		precio: new FormControl(''),
		stock: new FormControl(''),
		imagen: new FormControl(''),
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
			nombre: [
				'',
				[
					Validators.required,
					Validators.minLength(2),
					Validators.maxLength(50),
				],
			],
			apellido: [
				'',
				[
					Validators.required,
					Validators.minLength(2),
					Validators.maxLength(50),
				],
			],
			email: [
				'',
				[
					Validators.required,
					Validators.maxLength(255),
					Validators.pattern(this.emailPattern),
				],
			],
			genero: ['', [Validators.required]],
			precio: [0, [Validators.required, Validators.min(0)]],
			stock: [0, [Validators.required, Validators.min(0)]],
		});
  }

  get f(): { [key: string]: AbstractControl } {
		return this.form.controls;
	}

	onSubmit(): void {
		this.submitted = true;
		if (this.form.invalid) {
			return;
		}
		console.log(this.producto);
		this.createProducto();
	}

	onReset(): void {
		this.submitted = false;
		this.form.reset();
	}

	public createProducto(): void {
		this.productoService
			.createProducto(this.producto)
			.subscribe((producto) => {
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
		this.productoService
			.updateProducto(this.producto)
			.subscribe((data) => {
				this.router.navigate(['/productos/lista']);
				Swal.fire(
					'Producto actualizado',
					`Producto ${data.nombre} modificado con éxito`,
					'success'
				);
			});
	}
}
