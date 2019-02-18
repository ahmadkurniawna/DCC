import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClipingPage } from './cliping.page';

describe('ClipingPage', () => {
  let component: ClipingPage;
  let fixture: ComponentFixture<ClipingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClipingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClipingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
