import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { Category } from '../../../models/categories.model';
import { Novel } from '../../../models/novel.model';
import { NovelService } from '../../../services/novel.service';
import { DeleteNovelComponent } from '../delete-novel/delete-novel.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent implements OnDestroy {
  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }
  
  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }
  
  displayedColumns: string[] = [
    'id',
    'title',
    'author',
    'category',
    'price',
    'operation',
  ];

  dataSource = new MatTableDataSource<Novel>();
  private unsubscribe$ = new Subject<void>();

  constructor(
    private novelService: NovelService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.getAllNovelData();
  }

  categories = Category;
  
  getAllNovelData(): void{
    this.novelService
      .getAllNovels()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (data) => {
          // console.log(data);
          this.dataSource.data = Object.values(data);
        },
        error: (error) => {
          console.log("Error ocurred while fetching book details : ", error);
        },
      });
  }

  applyFilter(event: Event): void{
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteConfirm(id: number): void {
    const dialogRef = this.dialog.open(DeleteNovelComponent, {
      data: id,
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result) => {
        if (result === 1) {
          this.getAllNovelData();
          this.snackBar.open("Data deleted successfully.");
        } else {
          this.snackBar.open("Error occurred!! Try again.");
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
