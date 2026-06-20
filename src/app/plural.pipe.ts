import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plural',
})
export class PrularPipe implements PipeTransform {

  transform(numberOf: number, firstForm: string, secondForm: string, thirdForm: string): string {

    const formNumbers: string = numberOf.toString().slice(-1);
    const exceptions: number[] = [12, 13, 14];
    const secondFormNumbers: string[] = ['2', '3', '4'];

    if (formNumbers === '1' && numberOf !== 11) {
    return `${ numberOf } ${ firstForm }`;
    } else if(secondFormNumbers.includes(formNumbers) && !exceptions.includes(numberOf)) {
    return `${ numberOf } ${ secondForm }`;
    } else {
    return `${ numberOf } ${ thirdForm }`;
    }
  }

}