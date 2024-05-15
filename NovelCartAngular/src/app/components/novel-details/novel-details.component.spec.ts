import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovelDetailsComponent } from './novel-details.component';

describe('NovelDetailsComponent', () => {
  let component: NovelDetailsComponent;
  let fixture: ComponentFixture<NovelDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NovelDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NovelDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
