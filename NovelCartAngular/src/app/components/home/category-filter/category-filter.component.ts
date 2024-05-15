import { Component, Input } from '@angular/core';
import { catchError, EMPTY } from 'rxjs';
import { NovelService } from '../../../services/novel.service';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrl: './category-filter.component.css'
})
export class CategoryFilterComponent {
  @Input()
  categoryId = 0;

  categories$ = this.novelService.categories$.pipe(
    catchError((error) => {
      console.log("Error ocurred while fetching category List : ", error);
      return EMPTY;
    })
  );

  constructor(private novelService: NovelService) {}
}
