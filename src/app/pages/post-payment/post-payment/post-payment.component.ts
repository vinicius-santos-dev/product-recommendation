import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserQuery} from "../../../stores/user/user.query";

@Component({
  selector: 'app-payment',
  templateUrl: './post-payment.component.html',
  styleUrls: ['./post-payment.component.scss']
})
export class PostPaymentComponent implements OnInit {
  public showForm = false;

  public user = this.userQuery.user;

  constructor(private router: Router, private userQuery: UserQuery) {
  }

  ngOnInit(): void {
  }

  public onShowForm(): void {
    this.showForm = true;
  }

  public goToNPS(): void {
    this.router.navigate(['/nps']);
  }

}
