import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlasmaDonorRegistrationPage } from './plasma-donor-registration.page';

describe('PlasmaDonorRegistrationPage', () => {
  let component: PlasmaDonorRegistrationPage;
  let fixture: ComponentFixture<PlasmaDonorRegistrationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlasmaDonorRegistrationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
