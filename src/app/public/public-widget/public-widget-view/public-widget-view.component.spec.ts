import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicWidgetViewComponent } from './public-widget-view.component';

describe('PublicWidgetViewComponent', () => {
  let component: PublicWidgetViewComponent;
  let fixture: ComponentFixture<PublicWidgetViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicWidgetViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicWidgetViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
