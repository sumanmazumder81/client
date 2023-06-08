import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WearhouseListComponent } from './wearhouse-list.component';

describe('WearhouseListComponent', () => {
  let component: WearhouseListComponent;
  let fixture: ComponentFixture<WearhouseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WearhouseListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WearhouseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
