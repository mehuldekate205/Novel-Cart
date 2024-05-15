import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Cart } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  private baseURL = environment.apiUrl + 'Cart/';

  addNovelToCart(userId: number, novelId: number) 
  {
    return this.http.post<number>(this.baseURL + `AddNovelToCart/${userId}/${novelId}`, {});
  }

  getCartItems(userId: number) {
    return this.http.get(this.baseURL + `GetCartItems/${userId}`);
  }

  removeCartItems(userId: number, bookId: number) {
    return this.http.delete<number>(this.baseURL + `RemoveCartItem/${userId}/${bookId}`);
  }

  deleteOneCartItem(userId: number, bookId: number) {
    return this.http.put<number>(this.baseURL + `RemoveOneCartItem/${userId}/${bookId}`, {});
  }

  clearCart(userId: number) {
    return this.http.delete<number>(this.baseURL + `ClearCart/${userId}`);
  }

}
