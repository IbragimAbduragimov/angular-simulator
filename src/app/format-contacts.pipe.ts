import { Pipe, PipeTransform } from '@angular/core';
import { Phone } from '../enums/PhoneMode';

@Pipe({
  name: 'formatContacts',
})
export class FormatContactsPipe implements PipeTransform {

  transform(phone: string, phoneMode: Phone): string {
    const clearedPhone: string = phone.replace(/[()-.xх]/g, '');
    const countryCode: string = clearedPhone.slice(0,2);
    const operatorCode: string = clearedPhone.slice(2,5);
    const firstPart: string = clearedPhone.slice(5,8);
    const secondPart: string = clearedPhone.slice(8,10);
    const thirdPart: string = clearedPhone.slice(10,12);
    switch (phoneMode) {
      case Phone.COMPACT :
        return `+ ${ clearedPhone }`
      case Phone.INTERNATIONAL:
        return `+ ${ countryCode } ${ operatorCode } ${ firstPart } ${ secondPart } ${ thirdPart }`;
      case Phone.NATIONAL:
        return `${ operatorCode } ${ firstPart } ${ secondPart } ${ thirdPart }`;
      case Phone.MASKED:
        return `+ ${ countryCode } ${ operatorCode } *** ** ${ thirdPart }`;
    }
  }

}
