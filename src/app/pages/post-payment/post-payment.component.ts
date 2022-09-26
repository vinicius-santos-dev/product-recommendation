import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './post-payment.component.html',
  styleUrls: ['./post-payment.component.scss']
})
export class PostPaymentComponent implements OnInit {
  public showForm = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public onShowForm(): void {
    this.showForm = true;
  }

  public goToNPS(): void {
    // this.router.navigate(['/nps']);
    console.log('goToNPS');
    
  }

}
