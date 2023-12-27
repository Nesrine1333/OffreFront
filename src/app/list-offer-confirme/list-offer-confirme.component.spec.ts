import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfferConfirmeComponent } from './list-offer-confirme.component';

describe('ListOfferConfirmeComponent', () => {
  let component: ListOfferConfirmeComponent;
  let fixture: ComponentFixture<ListOfferConfirmeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListOfferConfirmeComponent]
    });
    fixture = TestBed.createComponent(ListOfferConfirmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
