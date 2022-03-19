import { TestBed } from '@angular/core/testing';

import { EnvoiAlimentsService } from './envoi-aliments.service';

describe('EnvoiAlimentsService', () => {
  let service: EnvoiAlimentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnvoiAlimentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
