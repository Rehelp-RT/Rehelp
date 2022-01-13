import { TestBed } from '@angular/core/testing';

import { ForumFormService } from './forum-form.service';

describe('ForumFormService', () => {
  let service: ForumFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForumFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
