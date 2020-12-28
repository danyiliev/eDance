package com.edancesport.edance.Stripe;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class StripeEventHandler extends ReactContextBaseJavaModule {
    public static StripeEventHandler shared;

    public StripeEventHandler(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public void initialize() {
        super.initialize();

        StripeEventHandler.shared = this;
    }

    @NonNull
    @Override
    public String getName() {
        return "StripeEventHandler";
    }

    public void sendEvent(String eventName,
                          @Nullable WritableMap params) {
        getReactApplicationContext()
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }
}
