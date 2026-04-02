import { Component } from '@angular/core';
import { CheckoutService } from '@app/services/checkout.service';

@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.css'],
    standalone: false
})
export class PaymentComponent {
  handler:any = null;

  success:boolean = false;

  failure:boolean = false;

  constructor(private checkout:CheckoutService) { }


 


  ngOnInit() {
 
    this.loadStripe();
  }
 
  pay(amount: any) {    
 
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51KYRwCFzyQwg0ebiijora1CJCpaAejO1J0WSMNtwuvjrLxrHTdcr9tpxyPJx6nGFvdMgx2pMVEXi6z7UQuQyrkgy00sMjvHmPW',
      locale: 'auto',
      token: function (striteToken: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        console.log(striteToken)
        alert('Token Created!!');

        paymentStripe(striteToken)

      },
    });

    const paymentStripe = (striteToken: any) => {
      this.checkout.makePayment(striteToken, null, null).subscribe((data:any) => {
        console.log(data);    

        if (data.data === "success") {
          this.success = true
        } else {
          this.failure = true
        }
      });
    };
 
    handler.open({
      name: 'Rehelp demo',
      description: 'A simple payment',
      amount: amount * 100,
    });
  }
 
  loadStripe() {
     
    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51KYRwCFzyQwg0ebiijora1CJCpaAejO1J0WSMNtwuvjrLxrHTdcr9tpxyPJx6nGFvdMgx2pMVEXi6z7UQuQyrkgy00sMjvHmPW',
          locale: 'auto',
          token: function (striteToken: any) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log(striteToken)
            alert('Payment Success!!');
          }
        });
      }
       
      window.document.body.appendChild(s);
    }
  }

}
