import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {take} from "rxjs";
import {ProductsService} from "../../../stores/products/products.service";
import {LocalStorageService} from "../../../services/storage/localstorage.service";
import {UserStoreService} from "../../../stores/user/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({height: '200px'})),
      state('fade', style({opacity: 0, display: 'none'})),
      state('appear', style({opacity: 1, height: '160px'})),
      transition('void => fade', [animate('0.2s ease-in-out')]),
      transition('void => open', [animate('1s ease-in-out')]),
      transition('void => appear', [animate('0.2s ease-in-out')]),
    ]),
  ],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public isOpen = false;

  public isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private productsService: ProductsService,
    private localStorageService: LocalStorageService,
    private userService: UserStoreService
  ) {
    this.loginForm = this.formBuilder.group({
      documentNumber: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  public onShowInput(): void {
    this.isOpen = !this.isOpen;
  }

  public onGoShop(): void {
    if (this.isLoading) {
      return;
    }

    const documentNumber = this.loginForm.get('documentNumber')?.value;

    if (documentNumber) {
      this.localStorageService.set('documentNumber', documentNumber);

      this.userService.getUserByDocumentNumber(documentNumber).pipe(take(1)).subscribe();
    }

    this.isLoading = true;

    this.productsService.loadRecommendations().pipe(take(1)).subscribe(() => {
      this.router.navigate(['/products']).then();
      this.isLoading = false;
    });

  }
}
