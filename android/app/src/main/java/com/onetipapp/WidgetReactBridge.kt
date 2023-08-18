package com.onetipapp

import android.util.Log
import android.widget.RemoteViews
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter


class WidgetReactBridge (reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    private val context: ReactApplicationContext = reactContext
    override fun getName() = "WidgetReactBridge"

    @ReactMethod
    fun setWidgetValue(text: String) {
        Log.i(null, text)
//        val views = RemoteViews(context.packageName, R.layout.widget_app)
//        val currentContext: ReactContext = reactApplicationContext
//        val eventName = "myAwesomeEvent"
//        val params = Arguments.createMap()
//        params.putString("type", "myEventType")
//
//        sendEvent(currentContext, eventName, params)
    }
//    private fun sendEvent(reactContext: ReactContext,
//                          eventName: String,
//                          params: WritableMap) {
//        reactContext
//                .getJSModule(RCTDeviceEventEmitter::class.java)
//                .emit(eventName, params)
//    }
}