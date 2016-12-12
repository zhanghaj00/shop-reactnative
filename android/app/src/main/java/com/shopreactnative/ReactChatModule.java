package com.shopreactnative;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Toast;
import cn.leancloud.chatkit.LCChatKit;
import cn.leancloud.chatkit.activity.LCIMConversationActivity;
import cn.leancloud.chatkit.utils.LCIMConstants;
import com.avos.avoscloud.im.v2.AVIMClient;
import com.avos.avoscloud.im.v2.AVIMException;
import com.avos.avoscloud.im.v2.callback.AVIMClientCallback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by James on 2016/12/11.
 */
public class ReactChatModule extends ReactContextBaseJavaModule {

    private static final String MODULE_NAME="reactChatModule";

    public ReactChatModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @ReactMethod
    public void openChatWithAdmin(final String userName){
        LCChatKit.getInstance().open("10000", new AVIMClientCallback() {
            @Override
            public void done(AVIMClient avimClient, AVIMException e) {

                if (null == e) {
                    Intent intent = new Intent(MainApplication.getContext(), LCIMConversationActivity.class);
                    Bundle bundle = new Bundle();
                    intent.putExtras(bundle);
                    intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                    intent.putExtra(LCIMConstants.PEER_ID, userName);

                    MainApplication.getContext().startActivity(intent);
                } else {
                    Toast.makeText(MainApplication.getContext(), e.toString(), Toast.LENGTH_SHORT).show();
                }
            }
        });
    }
}
