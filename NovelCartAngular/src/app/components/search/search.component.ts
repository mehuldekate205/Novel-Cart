import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, startWith, map } from 'rxjs';
import { Novel } from '../../models/novel.model';
import { NovelService } from '../../services/novel.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  public novels: Novel[] = [];
  searchControl = new FormControl();
  filteredNovels!: Observable<Novel[]>;

  constructor(
    private novelService: NovelService,
    private shared: SharedService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadNovelData();
    this.setSearchControlValue();
    this.filterNovelData();
  }

  searchStore() {
    const searchItem = this.searchControl.value;
    if (searchItem !== "") {
      this.router.navigate(["/search"], {
        queryParams: {
          item: searchItem.toLowerCase(),
        },
      });
    }
  }

  cancelSearch() {
    this.router.navigate(["/"]);
  }

  private loadNovelData() {
    this.novelService.novels$.subscribe((data: Novel[]) => {
      this.novels = data;
    });
  }

  private setSearchControlValue() {
    this.shared.searchItemValue$.subscribe((data) => {
      if (data) {
        this.searchControl.setValue(data);
      } else {
        this.searchControl.setValue("");
      }
    });
  }

  private filterNovelData() {
    this.filteredNovels = this.searchControl.valueChanges.pipe(
      startWith(""),
      map((value) => (value.length >= 1 ? this._filter(value) : []))
    );
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.novels?.filter(
      (option) =>
        option.title.toLowerCase().includes(filterValue) ||
        option.author.toLowerCase().includes(filterValue)
    );
  }
}