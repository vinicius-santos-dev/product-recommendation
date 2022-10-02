import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Invoice, InvoiceParams} from "../../models";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private readonly baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.backendUrl}/invoices`;
  }

  public createInvoice(params: InvoiceParams): Observable<Invoice> {
    return this.http.post(this.baseUrl, params) as Observable<Invoice>;
  }
}
