import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterproductsComponent } from './enterproducts.component';

describe('EnterproductsComponent', () => {
  let component: EnterproductsComponent;
  let fixture: ComponentFixture<EnterproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
