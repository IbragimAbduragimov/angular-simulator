import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plural',
})
export class PrularPipe implements PipeTransform {

  transform(numberOf: number, firstForm: string, secondForm: string, thirdForm: string): string {
    if (numberOf === 1) {
    return `${ numberOf } + ${ firstForm }`;
    } else if(numberOf > 1 && numberOf <= 4 ) {
    return `${ numberOf } + ${ secondForm }`;
    } else {
    return `${ numberOf } + ${ thirdForm }`;
    }
  }

}