import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfferNonConfirmeComponent } from './list-offer-non-confirme.component';

describe('ListOfferNonConfirmeComponent', () => {
  let component: ListOfferNonConfirmeComponent;
  let fixture: ComponentFixture<ListOfferNonConfirmeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListOfferNonConfirmeComponent]
    });
    fixture = TestBed.createComponent(ListOfferNonConfirmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
