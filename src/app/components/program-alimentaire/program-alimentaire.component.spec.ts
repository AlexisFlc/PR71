import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramAlimentaireComponent } from './program-alimentaire.component';

describe('ProgramAlimentaireComponent', () => {
  let component: ProgramAlimentaireComponent;
  let fixture: ComponentFixture<ProgramAlimentaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramAlimentaireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramAlimentaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
