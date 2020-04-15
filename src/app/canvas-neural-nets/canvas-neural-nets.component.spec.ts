import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasNeuralNetsComponent } from './canvas-neural-nets.component';

describe('CanvasNeuralNetsComponent', () => {
  let component: CanvasNeuralNetsComponent;
  let fixture: ComponentFixture<CanvasNeuralNetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasNeuralNetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasNeuralNetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
