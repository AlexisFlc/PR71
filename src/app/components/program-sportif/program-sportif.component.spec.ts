import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramSportifComponent } from './program-sportif.component';

describe('ProgramSportifComponent', () => {
  let component: ProgramSportifComponent;
  let fixture: ComponentFixture<ProgramSportifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramSportifComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramSportifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
