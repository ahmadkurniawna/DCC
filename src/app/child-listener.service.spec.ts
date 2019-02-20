import { TestBed } from '@angular/core/testing';

import { ChildListenerService } from './child-listener.service';

describe('ChildListenerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChildListenerService = TestBed.get(ChildListenerService);
    expect(service).toBeTruthy();
  });
});
