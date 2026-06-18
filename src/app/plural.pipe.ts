import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plural',
})
export class prularPipe implements PipeTransform {

  transform(numderOf: number, firstForm: string, secondForm: string, thirdForm: string): string {
    if (numderOf === 1) {
    return `${ numderOf } + ${ firstForm }`;
    } else if(numderOf > 1 && numderOf <= 4 ) {
    return `${ numderOf } + ${ secondForm }`;
    } else {
    return `${ numderOf } + ${ thirdForm }`;
    }
  }

}