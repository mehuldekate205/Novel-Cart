import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, combineLatestWith, map } from 'rxjs';
import { User } from '../../models/user.model';
import { NovelService } from '../../services/novel.service';
import { Category } from '../../models/categories.model';

@Component({
  selector: 'app-novel-details',
  templateUrl: './novel-details.component.html',
  styleUrl: './novel-details.component.css'
})
export class NovelDetailsComponent {
  userData$ = new BehaviorSubject<User>(new User()).asObservable();
  categories = Category;
  private readonly queryParams$ = this.activatedRoute.paramMap;
  private readonly novel$ = this.novelService.novels$;

  novelDetails$ = this.queryParams$.pipe(
    combineLatestWith(this.novel$),
    map(([params, novelList]) => {
      const selectedBookId = Number(params.get("id"));
      return novelList.find((novel) => novel.novelId === selectedBookId);
    })
  );

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private novelService: NovelService
  ) {}
}
