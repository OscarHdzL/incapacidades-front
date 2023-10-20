import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechaCorta'
})
export class FechaCortaPipe implements PipeTransform {

  transform(value: string): string {
    const fechaCorta = value.substring(0,10)
    return fechaCorta;
  }

}