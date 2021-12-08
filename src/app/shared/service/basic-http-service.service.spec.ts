import { TestBed } from '@angular/core/testing';

import { BasicHttpServiceService } from './basic-http-service.service';

describe('BasicHttpServiceService', () => {
  let service: BasicHttpServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasicHttpServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
