import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocNutritionComponent } from './bloc-nutrition.component';

describe('BlocNutritionComponent', () => {
  let component: BlocNutritionComponent;
  let fixture: ComponentFixture<BlocNutritionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlocNutritionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocNutritionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
