import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currect',
})
export class CurrectPipe implements PipeTransform {

  transform(numderOf: number): string {
    if (numderOf === 1) {
    return numderOf + 'пользователь';
    } else if(numderOf > 1 && numderOf <= 4 ) {
    return  numderOf + 'пользователя';
    } else {
    return  numderOf + 'пользователей';
    }
  }

}