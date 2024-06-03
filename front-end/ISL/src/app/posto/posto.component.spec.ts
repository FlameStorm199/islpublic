import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostoComponent } from './posto.component';

describe('PostoComponent', () => {
  let component: PostoComponent;
  let fixture: ComponentFixture<PostoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostoComponent]
    });
    fixture = TestBed.createComponent(PostoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
