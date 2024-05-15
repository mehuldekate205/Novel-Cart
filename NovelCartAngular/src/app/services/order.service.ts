import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/orders.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  private baseURL = environment.apiUrl + 'Order/';

  myOrderDetails(userId: number) {
    return this.http.get(this.baseURL + `OrdersList/${userId}`);
  }

  allOrderDetails() {
    return this.http.get(this.baseURL + `Orders`);
  }
}
