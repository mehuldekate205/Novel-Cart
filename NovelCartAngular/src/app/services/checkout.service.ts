import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http: HttpClient) { }

  private baseUrl = environment.apiUrl + 'CheckOut/';

  placeOrder(userId: number) {
    return this.http.post<number>(this.baseUrl + userId, null);
  }
}
