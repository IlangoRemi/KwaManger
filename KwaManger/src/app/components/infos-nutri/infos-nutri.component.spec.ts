import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosNutriComponent } from './infos-nutri.component';

describe('InfosNutriComponent', () => {
  let component: InfosNutriComponent;
  let fixture: ComponentFixture<InfosNutriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfosNutriComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfosNutriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
