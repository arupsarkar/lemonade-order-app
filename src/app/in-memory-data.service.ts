import { Injectable } from '@angular/core';
import { Account} from './Account';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    const accounts = [
      { id: '11', name: 'Dr Nice', loyalty_points: 12, flavor: '', size: '', price: 0.00},
      { id: '12', name: 'Narco' , loyalty_points: 28, flavor: '', size: '', price: 0.00},
      { id: '13', name: 'Bombasto' , loyalty_points: 90, flavor: '', size: '', price: 0.00},
      { id: '14', name: 'Celeritas' , loyalty_points: 15, flavor: '', size: '', price: 0.00},
      { id: '15', name: 'Magneta' , loyalty_points: 99, flavor: '', size: '', price: 0.00},
      { id: '16', name: 'RubberMan' , loyalty_points: 14, flavor: '', size: '', price: 0.00},
      { id: '17', name: 'Dynama' , loyalty_points: 23, flavor: '', size: '', price: 0.00},
      { id: '18', name: 'Dr IQ' , loyalty_points: 4, flavor: '', size: '', price: 0.00},
      { id: '19', name: 'Magma' , loyalty_points: 29, flavor: '', size: '', price: 0.00},
      { id: '20', name: 'Tornado' , loyalty_points: 67, flavor: '', size: '', price: 0.00}
    ];

    return {accounts};
  }
}
