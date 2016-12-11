package com.shopreactnative;

import android.content.Intent;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by James on 2016/12/11.
 */
public class ReactAuthModule extends ReactContextBaseJavaModule {

    private static final String MODULE_NAME="reactAuthModule";

    public ReactAuthModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @ReactMethod
    public void authWeiboActivity(){
        Intent intent = new Intent(MainApplication.getContext(),AuthActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        MainApplication.getContext().startActivity(intent);
    }
}
