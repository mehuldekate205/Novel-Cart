import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { CheckoutService } from '../../services/checkout.service';
import { Order } from '../../models/orders.model';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit, OnDestroy {
  userId = parseInt(localStorage.getItem("userid")!);
  totalPrice: number = 0;
  checkOutItems: Order = new Order();
  showLoader = false;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cartService: CartService,
    private checkOutService: CheckoutService,
    private shared: SharedService,
    private snackbar: MatSnackBar
  ) {
  }

  checkOutForm = this.fb.group({
    name: ["", Validators.required],
    addressLine1: ["", Validators.required],
    addressLine2: ["", Validators.required],
    pincode: [
      "",
      Validators.compose([
        Validators.required,
        Validators.pattern("^[1-9][0-9]{5}$"),
      ]),
    ],
    state: ["", [Validators.required]],
  });

  get checkoutFormControl() {
    return this.checkOutForm.controls;
  }

  ngOnInit() {
    this.getCheckOutItems();
  }

  getCheckOutItems() {
    this.showLoader = true;
    this.cartService
      .getCartItems(this.userId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (result) => {
          const checkedOutItemCount = Object.values(result).length;
          if (checkedOutItemCount > 0) {
            this.checkOutItems.orderDetails = Object.values(result);
            this.getTotalPrice();
          } else {
            this.checkOutForm.disable();
          }
          this.showLoader = false;
        },
        error: (error) => {
          console.log(
            "Error ocurred while fetching shopping cart item : ",
            error
          );
          this.showLoader = false;
        },
      });
  }

  getTotalPrice() {
    this.totalPrice = 0;
    this.checkOutItems.orderDetails.map((item) => {
      this.totalPrice += item.novel.price * item.quantity;
    });
    this.checkOutItems.cartTotal = this.totalPrice;
  }

  placeOrder() {
    if (this.checkOutForm.valid) {
      this.checkOutService
        .placeOrder(this.userId)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: (result) => {
            this.shared.cartItemcount$.next(result);
            this.router.navigate(["/orders"]);
            this.snackbar.open("Order placed successfully!!!");
          },
          error: (error) => {
            console.log("Error ocurred while placing order : ", error);
          },
        });
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
