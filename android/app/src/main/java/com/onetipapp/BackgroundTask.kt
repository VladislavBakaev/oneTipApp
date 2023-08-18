package com.onetipapp

import android.content.Intent
import android.util.Log
import com.facebook.react.HeadlessJsTaskService
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.WritableNativeMap
import com.facebook.react.jstasks.HeadlessJsTaskConfig


class BackgroundTask : HeadlessJsTaskService() {
    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        Thread {
            while (true) {
                Log.e("Service", "Service is running...")
                try {
                    Thread.sleep(2000)
                } catch (e: InterruptedException) {
                    e.printStackTrace()
                }
            }
        }.start()
        return super.onStartCommand(intent, flags, startId)
    }

    override fun getTaskConfig(intent: Intent): HeadlessJsTaskConfig? {
        val extras = intent.extras
        val data: WritableMap = WritableNativeMap()
        if (extras != null) {
            val data = Arguments.fromBundle(extras)
            return HeadlessJsTaskConfig(
                "WidgetTask",
                data,
                5000,
                true// timeout for the task
            )
        }
        return HeadlessJsTaskConfig(
            "WidgetTask",
            data,
            5000,
            true// timeout for the task
        )
    }
}