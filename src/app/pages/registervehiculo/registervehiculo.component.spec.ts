import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistervehiculoComponent } from './registervehiculo.component';

describe('RegistervehiculoComponent', () => {
  let component: RegistervehiculoComponent;
  let fixture: ComponentFixture<RegistervehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistervehiculoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistervehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
