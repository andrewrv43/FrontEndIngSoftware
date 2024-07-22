import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterRolesComponent } from './register-roles.component';

describe('RegisterRolesComponent', () => {
  let component: RegisterRolesComponent;
  let fixture: ComponentFixture<RegisterRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterRolesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
