import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneticAlgPageComponent } from './genetic-alg-page.component';

describe('GeneticAlgPageComponent', () => {
  let component: GeneticAlgPageComponent;
  let fixture: ComponentFixture<GeneticAlgPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneticAlgPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneticAlgPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
