import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'resource'
})
export class ResourcePipe implements PipeTransform {

  transform(value: any, plu?:boolean, args?: any): any {
    let trad = {
      ELECTRICITY: 'électrique',
      GAS: 'de gaz',
      WATTER: "d'eau"
    };

    let tradPlu = {
      ELECTRICITY: 'électriques',
      GAS: 'de gaz',
      WATTER: "d'eau"
    };

    if (plu) {
      return tradPlu[value];
    } else {
      return trad[value];
    }

  }

}
