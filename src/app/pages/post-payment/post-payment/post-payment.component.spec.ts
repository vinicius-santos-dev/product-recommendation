import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostPaymentComponent } from './post-payment.component';

describe('PostPaymentComponent', () => {
  let component: PostPaymentComponent;
  let fixture: ComponentFixture<PostPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostPaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
