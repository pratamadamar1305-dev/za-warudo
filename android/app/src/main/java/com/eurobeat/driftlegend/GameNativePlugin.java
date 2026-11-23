package com.eurobeat.driftlegend;

import android.view.WindowManager;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "GameNative")
public class GameNativePlugin extends Plugin {
    @PluginMethod
    public void setRaceActive(PluginCall call) {
        boolean active = call.getBoolean("active", false);
        getActivity().runOnUiThread(() -> {
            if (active) {
                getActivity().getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
            } else {
                getActivity().getWindow().clearFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
            }
        });
        JSObject result = new JSObject();
        result.put("active", active);
        call.resolve(result);
    }
}
