package com.shopreactnative;

import android.app.Application;
import android.content.Context;

import cn.leancloud.chatkit.LCChatKit;
import com.avos.avoscloud.AVOSCloud;
import com.facebook.react.ReactApplication;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.shell.MainReactPackage;
import com.oblador.vectoricons.VectorIconsPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {



  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<com.facebook.react.ReactPackage> getPackages() {
      return Arrays.<com.facebook.react.ReactPackage>asList(
          new MainReactPackage(),
            new RNDeviceInfo(),
          new VectorIconsPackage(),
              new MyReactPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }


    private static Context context  = null ;

    @Override
    public void onCreate() {
        super.onCreate();
        AVOSCloud.initialize(this, "zaeoJsvpr1Do7ufp9D8Ci0BH-gzGzoHsz", "dSM3xn9gnWi0rO02XzNsRVSe");
       // LCChatKit.getInstance().setProfileProvider(CustomUserProvider.getInstance());
        LCChatKit.getInstance().init(getApplicationContext(), "", "");
        context = getApplicationContext();
    }


    public static Context getContext(){
        return context;
    }
}
