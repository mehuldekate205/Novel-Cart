import { TestBed } from '@angular/core/testing';

import { NovelService } from './novel.service';

describe('NovelService', () => {
  let service: NovelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NovelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
