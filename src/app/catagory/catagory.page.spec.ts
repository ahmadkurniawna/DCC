import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatagoryPage } from './catagory.page';

describe('CatagoryPage', () => {
  let component: CatagoryPage;
  let fixture: ComponentFixture<CatagoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatagoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatagoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
