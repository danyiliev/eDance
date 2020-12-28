package com.edancesport.edance.Stripe;

import android.os.Handler;

import androidx.activity.ComponentActivity;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.stripe.android.CustomerSession;
import com.stripe.android.PaymentSession;
import com.stripe.android.PaymentSessionConfig;
import com.stripe.android.PaymentSessionData;
import com.stripe.android.model.PaymentMethod;
import com.stripe.android.model.ShippingInformation;

public class StripeModule extends ReactContextBaseJavaModule {
    public String customerId = null;
    public PaymentSession paymentSession;

    public static StripeModule shared;

    public StripeModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public void initialize() {
        super.initialize();

        StripeModule.shared = this;
    }

    @NonNull
    @Override
    public String getName() {
        return "StripeManager";
    }

    @ReactMethod
    public void initCustomer(String cId, Promise promise) {
        customerId = cId;

        CustomerSession.initCustomerSession(
                this.getReactApplicationContext(),
                new MyEphemeralKeyProvider()
        );

        promise.resolve("done");
    }

    @ReactMethod
    public void presentPaymentMethod(Promise promise) {
        Handler handler = new Handler(getReactApplicationContext().getMainLooper());
        handler.post(new Runnable() {
            @Override
            public void run() {
                if (paymentSession == null) {
                    paymentSession = new PaymentSession(
                            (ComponentActivity) getCurrentActivity(),
                            new PaymentSessionConfig.Builder()
                                    .setShippingInfoRequired(false)
                                    .setShippingMethodsRequired(false)
                                    .build()
                    );

                    paymentSession.init(
                            new PaymentSession.PaymentSessionListener() {
                                @Override
                                public void onCommunicatingStateChanged(
                                        boolean isCommunicating
                                ) {
                                    // update UI, such as hiding or showing a progress bar
                                }

                                @Override
                                public void onError(
                                        int errorCode,
                                        @Nullable String errorMessage
                                ) {
                                    // handle error
                                }

                                @Override
                                public void onPaymentSessionDataChanged(
                                        @NonNull PaymentSessionData data
                                ) {
                                    final PaymentMethod paymentMethod = data.getPaymentMethod();
                                    // use paymentMethod

                                  if (paymentMethod != null) {
                                    WritableMap params = Arguments.createMap();
                                    params.putString("id", paymentMethod.id);
                                    if (paymentMethod.card != null) {
                                      params.putString("brand", paymentMethod.card.brand.getDisplayName());
                                      params.putString("last4", paymentMethod.card.last4);
                                    }

                                    StripeEventHandler.shared.sendEvent("didChangePaymentMethod", params);
                                  }
                                }
                            }
                    );
                }

                paymentSession.presentPaymentMethodSelection(null);

                promise.resolve("done");
            }
        });
    }
}
