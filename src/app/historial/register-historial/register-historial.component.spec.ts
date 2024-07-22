import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterHistorialComponent } from './register-historial.component';

describe('RegisterHistorialComponent', () => {
  let component: RegisterHistorialComponent;
  let fixture: ComponentFixture<RegisterHistorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterHistorialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
