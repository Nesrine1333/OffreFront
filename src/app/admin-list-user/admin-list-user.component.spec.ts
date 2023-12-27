import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListUserComponent } from './admin-list-user.component';

describe('AdminListUserComponent', () => {
  let component: AdminListUserComponent;
  let fixture: ComponentFixture<AdminListUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminListUserComponent]
    });
    fixture = TestBed.createComponent(AdminListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
