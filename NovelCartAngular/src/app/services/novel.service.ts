import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { shareReplay, map } from "rxjs/operators";
import { Categories } from "../models/categories.model";
import { Novel } from '../models/novel.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NovelService {

  private baseURL = environment.apiUrl + "Novel/";

  constructor(private http: HttpClient) {}

  categories$ = this.http
    .get<Categories[]>(this.baseURL + "GetCategoriesList")
    .pipe(shareReplay(1));

  novels$ = this.getAllNovels().pipe(shareReplay(1));

  getAllNovels() {
    return this.http.get<Novel[]>(this.baseURL);
  }

  getCategories() {
    return this.http.get<Categories[]>(this.baseURL + "GetCategoriesList");
  }

  addNovel(novel: any) {
    return this.http.post(this.baseURL + 'AddNovel', novel);
  }

  getNovelById(id: number) {
    return this.http.get<Novel>(this.baseURL + id);
  }

  getsimilarNovels(novelId: number) {
    return this.http.get<Novel[]>(this.baseURL + "GetSimilarNovels/" + novelId);
  }

  updateNovelDetails(novel: any) {
    return this.http.put(this.baseURL + 'UpdateNovel', novel);
  }

  deleteNovel(id: number) {
    return this.http.delete(this.baseURL + 'DeleteNovel?id=' + id);
  }
}
