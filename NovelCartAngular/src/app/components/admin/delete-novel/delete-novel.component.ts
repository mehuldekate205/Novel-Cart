import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { catchError, EMPTY, Subject, takeUntil } from 'rxjs';
import { Category } from '../../../models/categories.model';
import { NovelService } from '../../../services/novel.service';

@Component({
  selector: 'app-delete-novel',
  templateUrl: './delete-novel.component.html',
  styleUrl: './delete-novel.component.css'
})
export class DeleteNovelComponent implements OnDestroy {

  novelData$ = this.novelService.getNovelById(this.novelId).pipe(
    catchError((error) => {
      console.log("Error ocurred while fetching novel data : ", error);
      return EMPTY;
    })
  );
  categories = Category;
  private unsubscribe$ = new Subject<void>();

  constructor(
    public dialogRef: MatDialogRef<DeleteNovelComponent>,
    @Inject(MAT_DIALOG_DATA) public novelId: number,
    private novelService: NovelService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.novelService
      .deleteNovel(this.novelId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        error: (error) => {
          console.log("Error ocurred while fetching novel data : ", error);
        },
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
