package com.edancesport.edance.Stripe;

import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Size;

import com.edancesport.edance.Config;
import com.stripe.android.EphemeralKeyProvider;
import com.stripe.android.EphemeralKeyUpdateListener;

import java.util.HashMap;
import java.util.Map;

import okhttp3.HttpUrl;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class MyEphemeralKeyProvider implements EphemeralKeyProvider {
    private static String TAG = MyEphemeralKeyProvider.class.getSimpleName();

    @Override
    public void createEphemeralKey(
            @NonNull @Size(min = 4) String apiVersion,
            @NonNull final EphemeralKeyUpdateListener keyUpdateListener) {

        String customerId = StripeModule.shared.customerId;

        OkHttpClient client = new OkHttpClient();

        HttpUrl.Builder httpBuilder = HttpUrl.parse(String.format("%s/api/v1/stripe/ephemeral_keys", Config.SERVER_URL)).newBuilder();
        httpBuilder.addQueryParameter("apiVersion", apiVersion);
        httpBuilder.addQueryParameter("customerId", customerId);

        Request request = new Request.Builder()
                .url(httpBuilder.build())
                .build();

        try {
            Response response = client.newCall(request).execute();

            final String rawKey = response.body().string();
            keyUpdateListener.onKeyUpdate(rawKey);
        } catch (Exception e) {
            Log.d(TAG, e.getMessage());
        }
    }
}
