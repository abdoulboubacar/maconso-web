import { environment } from '../environments/environment';

export class Config {

  static getApiUrl():string {
    let apiUrl:string = 'http://localhost:9000/api';
    if (environment.production) {
      apiUrl = 'https://maconso.abdoul-boubacar.com/api';
    }

    return apiUrl;
  }

}
