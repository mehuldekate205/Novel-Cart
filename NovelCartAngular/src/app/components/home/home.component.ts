import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, switchMap } from 'rxjs';
import { Novel } from '../../models/novel.model';
import { NovelService } from '../../services/novel.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {

  public novels: Novel[] = [];
  public filteredProducts: Novel[] = [];
  categoryId = 0;
  priceRange = Number.MAX_SAFE_INTEGER;
  isLoading = false;
  searchItem = '';

  constructor(
    private route: ActivatedRoute,
    private shared: SharedService,
    private novelService: NovelService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.getAllNovelData();
  }

  getAllNovelData() {
    this.novelService.novels$
      .pipe(
        switchMap((data: Novel[]) => {
          this.filteredProducts = data;
          // console.log(this.route.queryParams);
          return this.route.queryParams;
        })
      )
      .subscribe((params) => {
        // console.log(params);
        this.categoryId = parseInt(params['categoryId']);
        this.searchItem = params['item'];
        this.shared.searchItemValue$.next(this.searchItem);
        this.filterNovelData();
      });
  }

  filterPrice(value: number) {
    this.priceRange = value;
    this.filterNovelData();
  }

  filterNovelData() {
    const filteredData = this.filteredProducts
      .filter((b) => b.price <= this.priceRange)
      .slice();

    if (this.categoryId) {
      this.novels = filteredData.filter(
        (b) => b.categoryId === this.categoryId
      );
    } else if (this.searchItem) {
      this.novels = filteredData.filter(
        (b) =>
          b.title.toLowerCase().indexOf(this.searchItem) !== -1 ||
          b.author.toLowerCase().indexOf(this.searchItem) !== -1
      );
    } else {
      this.novels = filteredData;
    }
    this.isLoading = false;
  }

  ngOnDestroy() {
    this.shared.searchItemValue$.next("");
  }
}

