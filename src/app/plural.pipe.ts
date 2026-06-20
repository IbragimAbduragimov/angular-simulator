import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plural',
})
export class PrularPipe implements PipeTransform {

  transform(numberOf: number, firstForm: string, secondForm: string, thirdForm: string): string {

    const lastDitig: string = numberOf.toString().slice(-1);
    const lastTwoDitig: string = numberOf.toString().slice(-2);
    const exceptionsSecondForm: string[] = ['12', '13', '14'];

    const isFirsForm: boolean = lastDitig === '1' && lastTwoDitig !== '11';
    const isSecondForm: boolean = ['2', '3', '4'].includes(lastDitig) && !exceptionsSecondForm.includes(lastTwoDitig);

    if (isFirsForm) {
    return `${ numberOf } ${ firstForm }`;
    } else if(isSecondForm) {
    return `${ numberOf } ${ secondForm }`;
    } else {
    return `${ numberOf } ${ thirdForm }`;
    }
  }

}
