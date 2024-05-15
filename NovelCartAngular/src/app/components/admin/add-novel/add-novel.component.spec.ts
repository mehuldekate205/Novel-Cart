import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNovelComponent } from './add-novel.component';

describe('AddNovelComponent', () => {
  let component: AddNovelComponent;
  let fixture: ComponentFixture<AddNovelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddNovelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddNovelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
