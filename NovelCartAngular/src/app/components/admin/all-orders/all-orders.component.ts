import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { Order } from '../../../models/orders.model';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.css'
})
export class AllOrdersComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ["orderId", "orderedOn", "orderTotal"];
  dataSource = new MatTableDataSource<Order>();
  expandedElement!: null;
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.dataSource.paginator = mp;
  }
  isLoading: boolean = true;
  private unsubscribe$ = new Subject<void>();

  constructor(private orderService: OrderService) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.getMyOrderDetails();
  }

  getMyOrderDetails() {
    this.orderService
      .allOrderDetails()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (result) => {
          if (result != null) {
            // console.log(result)
            this.dataSource.data = Object.values(result);
            // console.log(this.dataSource.data)
            this.isLoading = false;
          }
        },
        error: (error) => {
          console.log('Error ocurred while fetching my order details : ', error);
        },
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
