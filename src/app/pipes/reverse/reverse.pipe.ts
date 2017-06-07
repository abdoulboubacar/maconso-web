import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value: Array<any>): Array<any> {
    let array = [];
    if (value) {
      array = value.reverse();
    }
    return array;
  }

}
