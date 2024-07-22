import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearUsuariosComponent } from './crearusuarios.component';

describe('CrearusuariosComponent', () => {
  let component: CrearUsuariosComponent;
  let fixture: ComponentFixture<CrearUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearUsuariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
