package com.shopreactnative;

import android.content.Intent;
import android.os.Bundle;
import com.avos.avoscloud.AVException;
import com.avos.sns.*;
import com.facebook.react.LifecycleState;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import org.json.JSONObject;

import javax.annotation.Nullable;

/**
 * Created by James on 2016/12/11.
 */
public class AuthActivity extends ReactActivity{

    private
    ReactInstanceManager mReactInstanceManager;


    @Override
    public void onCreate(Bundle savedInstanceState){
        mReactInstanceManager = getReactInstanceManager();
        try {
            SNS.setupPlatform(SNSType.AVOSCloudSNSSinaWeibo, "https://leancloud.cn/1.1/sns/goto/xxx");
        } catch (AVException e) {
            e.printStackTrace();
        }
        SNS.loginWithCallback(this, SNSType.AVOSCloudSNSSinaWeibo, new SNSCallback() {
            @Override
            public void done(SNSBase base, SNSException e) {
                if(e == null){
                    JSONObject result = base.authorizedData();
                    WritableMap map = new WritableNativeMap();
                    map.putString("weiboLoginResult", result.toString());
                    map.putString("code", "success");
                    sendTransMisson(mReactInstanceManager.getCurrentReactContext(), "weiboLoginResult",map);

                }else{
                    WritableMap map = new WritableNativeMap();
                    map.putString("code", "fail");
                    map.putString("weiboLoginResult", e.getMessage());
                    sendTransMisson(mReactInstanceManager.getCurrentReactContext(), "weiboLoginResult",map);

                }
                   /*if (e==null) {

                    SNS.loginWithAuthData(base.userInfo(), new LogInCallback<AVUser>() {
                        @Override
                        public void done(final AVUser user, AVException e) {

                        }
                    });
                }*/
            }
        });
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        SNS.onActivityResult(requestCode, resultCode, data, SNSType.AVOSCloudSNSSinaWeibo);
    }


    /**
     * @param reactContext
     * @param eventName
     * @param params
     */
    public void sendTransMisson(ReactContext reactContext, String eventName, @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);

    }


}
