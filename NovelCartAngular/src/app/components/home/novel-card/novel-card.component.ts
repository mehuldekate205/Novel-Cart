import { Component, Input } from '@angular/core';
import { Novel } from '../../../models/novel.model';

@Component({
  selector: 'app-novel-card',
  templateUrl: './novel-card.component.html',
  styleUrl: './novel-card.component.css'
})
export class NovelCardComponent {
  @Input()
  novel!: Novel;

  isActive = false;
}
