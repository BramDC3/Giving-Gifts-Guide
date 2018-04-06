import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoegGiftToeComponent } from './voeg-gift-toe.component';

describe('VoegGiftToeComponent', () => {
  let component: VoegGiftToeComponent;
  let fixture: ComponentFixture<VoegGiftToeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoegGiftToeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoegGiftToeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
