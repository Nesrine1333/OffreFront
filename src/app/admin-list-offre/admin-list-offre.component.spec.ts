import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListOffreComponent } from './admin-list-offre.component';

describe('AdminListOffreComponent', () => {
  let component: AdminListOffreComponent;
  let fixture: ComponentFixture<AdminListOffreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminListOffreComponent]
    });
    fixture = TestBed.createComponent(AdminListOffreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
