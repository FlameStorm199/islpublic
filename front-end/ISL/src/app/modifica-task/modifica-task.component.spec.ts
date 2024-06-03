import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaTaskComponent } from './modifica-task.component';

describe('ModificaTaskComponent', () => {
  let component: ModificaTaskComponent;
  let fixture: ComponentFixture<ModificaTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificaTaskComponent]
    });
    fixture = TestBed.createComponent(ModificaTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
