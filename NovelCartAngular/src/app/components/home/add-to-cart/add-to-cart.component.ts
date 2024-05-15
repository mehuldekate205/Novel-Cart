import { Component, Input, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { CartService } from '../../../services/cart.service';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrl: './add-to-cart.component.css'
})
export class AddToCartComponent implements OnDestroy {
  @Input()
  novelId!: number;

  userId = localStorage.getItem("userid")!;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private cartService: CartService,
    private shared: SharedService,
    private snackbar: MatSnackBar
  ) {
  }

  addToCart() {
    this.cartService
      .addNovelToCart(parseInt(this.userId), this.novelId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (result) => {
          this.shared.cartItemcount$.next(result);
          this.snackbar.open("One Item added to cart");
        },
        error: (error) => {
          console.log("Error ocurred while addToCart data : ", error);
        },
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

