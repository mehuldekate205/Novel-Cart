import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cart } from '../../models/cart.model';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit, OnDestroy {
  public cartItems: Cart[]= [];
  userId;
  totalPrice: number = 0;
  private unsubscribe$ = new Subject<void>();
  isLoading: boolean = true;
  displayedColumns: string[] = [
    "image",
    "title",
    "price",
    "quantity",
    "total",
    "action",
  ];

  constructor(
    private cartService: CartService,
    private shared: SharedService,
    private snackbar: MatSnackBar
  ) {
    this.userId = parseInt(localStorage.getItem("userid")!);
  }

  ngOnInit() {
    this.cartItems = [];
    this.isLoading = true;
    this.getShoppingCartItems();
  }

  getShoppingCartItems() {
    this.cartService
      .getCartItems(this.userId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (result) => {
          this.cartItems = Object.values(result);
          this.getTotalPrice();
          this.isLoading = false;
        },
        error: (error) => {
          console.log(
            "Error ocurred while fetching shopping cart item : ",
            error
          );
        },
      });
  }

  getTotalPrice() {
    this.totalPrice = 0;
    this.cartItems.forEach((item) => {
      this.totalPrice += item.novel.price * item.quantity;
    });
  }

  deleteCartItem(novelId: number) {
    this.cartService
      .removeCartItems(this.userId, novelId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (result) => {
          this.shared.cartItemcount$.next(result);
          this.getShoppingCartItems();
          this.snackbar.open("Product removed from cart");
        },
        error: (error) => {
          console.log("Error ocurred while deleting cart item : ", error);
        },
      });
  }

  addToCart(novelId: number) {
    this.cartService
      .addNovelToCart(this.userId, novelId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (result) => {
          this.shared.cartItemcount$.next(result);
          this.getShoppingCartItems();
          this.snackbar.open("One item added to cart");
        },
        error: (error) => {
          console.log("Error ocurred while addToCart data : ", error);
        },
      });
  }

  deleteOneCartItem(novelId: number) {
    this.cartService
      .deleteOneCartItem(this.userId, novelId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (result) => {
          this.shared.cartItemcount$.next(result);
          this.snackbar.open("One item removed from cart");
          this.getShoppingCartItems();
        },
        error: (error) => {
          console.log("Error ocurred while fetching novel data : ", error);
        },
      });
  }

  clearCart() {
    this.cartService
      .clearCart(this.userId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (result) => {
          this.shared.cartItemcount$.next(result);
          this.snackbar.open("Cart cleared!!!");
          this.getShoppingCartItems();
        },
        error: (error) => {
          console.log("Error ocurred while deleting cart item : ", error);
        },
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
