import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaDomComponent } from './prueba-dom.component';

describe('PruebaDomComponent', () => {
  let component: PruebaDomComponent;
  let fixture: ComponentFixture<PruebaDomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PruebaDomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PruebaDomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
