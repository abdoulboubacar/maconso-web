import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'upperFirst'
})
export class UpperFirstPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value != null) {
      return value.charAt(0).toUpperCase() + value.substr(1).toLowerCase();
    }

    return value;
  }

}
