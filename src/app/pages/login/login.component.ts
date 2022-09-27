import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({ height: '200px' })),
      state('fade', style({ opacity: 0, display: 'none' })),
      state('appear', style({ opacity: 1, height: '160px' })),
      transition('void => fade', [animate('0.2s ease-in-out')]),
      transition('void => open', [animate('1s ease-in-out')]),
      transition('void => appear', [animate('0.2s ease-in-out')]),
    ]),
  ],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public isOpen = false;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = this.formBuilder.group({
      documentNumber: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  public showInput(): void {
    this.isOpen = !this.isOpen;
  }

  public goShop(): void {
    this.router.navigate(['/products']);
  }
}
