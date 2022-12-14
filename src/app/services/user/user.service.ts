import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Invoice, InvoiceParams, User } from '../../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.backendUrl}/user`;
    console.log(environment.backendUrl, this.baseUrl);
  }

  public getUserByDocumentNumber(documentNumber: string): Observable<User> {
    return this.http.get(`${this.baseUrl}/documentNumber/${documentNumber}`, {
      withCredentials: false,
    }) as Observable<User>;
  }
}
