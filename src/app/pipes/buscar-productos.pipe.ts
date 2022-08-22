import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscarProductos'
})
export class BuscarProductosPipe implements PipeTransform {



  // transform(value : any,arg:any):any{

  //   if(arg === '' || arg.length < 3 ) return value;
  //     const resultProductos =[];
  //     for (const prod of value){
  //       if (prod.title.toLoweCase().indexof(arg.toLoweCase())>-1 ){
  //         resultProductos.push(prod)
  //       };    
  //     };
  //    return resultProductos;

  // }

  // }

  transform(value: any, buscarProductosString: string, propName: string): any[] {
    const result: any = [];

    if (!value || buscarProductosString === '' || propName === '') {
      return value;
    }
    value.forEach((a: any) => {

      if (a[propName].trim().toLowerCase().includes(buscarProductosString.toLowerCase())) {
        result.push(a);
      }
    });
    return result;
  }
}