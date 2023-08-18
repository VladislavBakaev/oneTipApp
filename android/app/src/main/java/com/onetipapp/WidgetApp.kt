package com.onetipapp

import android.app.PendingIntent
import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.util.Log
import android.widget.RemoteViews
import androidx.annotation.RequiresApi
import com.facebook.react.HeadlessJsTaskService


/**
 * Implementation of App Widget functionality.
 */
class WidgetApp : AppWidgetProvider() {
    private val ACTION_CLICK = "android.appwidget.action.ACTION_CLICK"
    override fun onUpdate(context: Context, appWidgetManager: AppWidgetManager, appWidgetIds: IntArray) {
        // There may be multiple widgets active, so update all of them
        for (appWidgetId in appWidgetIds) {
//            updateAppWidget(context, appWidgetManager, appWidgetId)
            val views: RemoteViews = RemoteViews(context.packageName, R.layout.widget_app)
            val watchWidget = ComponentName(context, WidgetApp::class.java)
            views.setOnClickPendingIntent(R.id.button_1, getPendingSelfIntent(context, ACTION_CLICK))

            appWidgetManager.updateAppWidget(watchWidget, views)
        }
    }
    private fun getPendingSelfIntent(context: Context?, action: String?): PendingIntent? {
        val intent = Intent(context, javaClass)
        intent.action = action
        return PendingIntent.getBroadcast(context, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE)
    }

    override fun onEnabled(context: Context) {
        // Enter relevant functionality for when the first widget is createda
        Log.d("WIDGET_ENABLE", "Enabled")
        val serviceIntent = Intent(context, BackgroundTask::class.java)
        context.startService(serviceIntent)
        HeadlessJsTaskService.acquireWakeLockNow(context)
    }

    override fun onDisabled(context: Context) {
        // Enter relevant functionality for when the last widget is disabled
    }

    override fun onReceive(context: Context?, intent: Intent?) {
        super.onReceive(context, intent)
        if (intent?.action?.startsWith(ACTION_CLICK) == true) {
            intent?.action?.let { Log.i(null, it)}

            val serviceIntent = Intent(context, BackgroundTask::class.java)
            val bundle: Bundle = Bundle()
            bundle.putFloat("key", 223.0F)
            serviceIntent.putExtras(bundle)
            context?.startService(serviceIntent)
        }
    }
}

//internal fun updateAppWidget(context: Context, appWidgetManager: AppWidgetManager, appWidgetId: Int) {
//    val widgetText = context.getString(R.string.appwidget_text)
//    // Construct the RemoteViews object
//    val views = RemoteViews(context.packageName, R.layout.widget_app)
//    views.setTextViewText(R.id.appwidget_text, widgetText)
//    // Instruct the widget manager to update the widget
//    appWidgetManager.updateAppWidget(appWidgetId, views)
//}