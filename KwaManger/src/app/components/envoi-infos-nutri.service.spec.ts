import { TestBed } from '@angular/core/testing';

import { EnvoiInfosNutriService } from './envoi-infos-nutri.service';

describe('EnvoiInfosNutriService', () => {
  let service: EnvoiInfosNutriService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnvoiInfosNutriService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
