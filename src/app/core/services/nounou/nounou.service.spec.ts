import { TestBed } from '@angular/core/testing';

import { NounouService } from './nounou.service';

describe('NounouService', () => {
  let service: NounouService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NounouService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
