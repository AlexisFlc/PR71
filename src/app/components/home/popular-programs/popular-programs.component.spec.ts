import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularProgramsComponent } from './popular-programs.component';

describe('PopularProgramsComponent', () => {
  let component: PopularProgramsComponent;
  let fixture: ComponentFixture<PopularProgramsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopularProgramsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopularProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
