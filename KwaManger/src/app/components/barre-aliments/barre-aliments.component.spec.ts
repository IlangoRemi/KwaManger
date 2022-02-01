import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarreAlimentsComponent } from './barre-aliments.component';

describe('BarreAlimentsComponent', () => {
  let component: BarreAlimentsComponent;
  let fixture: ComponentFixture<BarreAlimentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarreAlimentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarreAlimentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
