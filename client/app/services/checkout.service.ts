import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { EmailValidator } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http: HttpClient) { }

  // post request to the server

  makePayment(striteToken: any, email: string, amount: number):Observable<any> {
    const url = "http://localhost:5000/checkout/"

    return this.http.post<any>(url,{token:striteToken, email:email, amount:amount})
  }

}
