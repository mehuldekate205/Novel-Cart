import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteNovelComponent } from './delete-novel.component';

describe('DeleteNovelComponent', () => {
  let component: DeleteNovelComponent;
  let fixture: ComponentFixture<DeleteNovelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteNovelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteNovelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
