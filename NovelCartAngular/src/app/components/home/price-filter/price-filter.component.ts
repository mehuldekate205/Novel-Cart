import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Novel } from '../../../models/novel.model';
import { NovelService } from '../../../services/novel.service';

@Component({
  selector: 'app-price-filter',
  templateUrl: './price-filter.component.html',
  styleUrl: './price-filter.component.css'
})
export class PriceFilterComponent implements OnInit{
  @Output()
  priceValue = new EventEmitter<number>(true);

  max: number =0;
  min: number=0;
  value: number=0;

  constructor(private novelService: NovelService) {}

  ngOnInit(): void {
    this.setPriceFilterProperties();
  }

  setPriceFilterProperties() {
    this.novelService.novels$.pipe().subscribe((data: Novel[]) => {
      this.setMinValue(data);
      this.setMaxValue(data);
    });
  }

  onChange() {
    this.priceValue.emit(this.value);
  }

  setMinValue(novel: Novel[]) {
    this.min = novel.reduce((prev, curr) => {
      return prev.price < curr.price ? prev : curr;
    }).price;
  }

  setMaxValue(novel: Novel[]) {
    this.value = this.max = novel.reduce((prev, curr) => {
      return prev.price > curr.price ? prev : curr;
    }).price;
  }
}

