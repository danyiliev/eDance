package com.edancesport.edance;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import com.edancesport.edance.Stripe.StripeModule;
import com.facebook.react.ReactActivity;
import com.stripe.android.view.PaymentMethodsActivityStarter;

import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    SplashScreen.show(this);

    super.onCreate(savedInstanceState);
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "eDance";
  }

  @Override
  public void onActivityResult(int requestCode, int resultCode, Intent data) {
    super.onActivityResult(requestCode, resultCode, data);

    if (requestCode == PaymentMethodsActivityStarter.REQUEST_CODE) {
      StripeModule.shared.paymentSession.handlePaymentData(requestCode, resultCode, data);
    }
  }
}
