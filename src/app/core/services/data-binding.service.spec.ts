import { TestBed } from '@angular/core/testing';

import { DataBindingService } from './data-binding.service';

describe('DataBindingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataBindingService = TestBed.get(DataBindingService);
    expect(service).toBeTruthy();
  });
});
