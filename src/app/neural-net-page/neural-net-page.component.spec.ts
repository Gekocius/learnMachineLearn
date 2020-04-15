import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeuralNetPageComponent } from './neural-net-page.component';

describe('NeuralNetPageComponent', () => {
  let component: NeuralNetPageComponent;
  let fixture: ComponentFixture<NeuralNetPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeuralNetPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeuralNetPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
