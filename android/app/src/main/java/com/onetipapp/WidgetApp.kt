package com.onetipapp

import android.app.PendingIntent
import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.os.Handler
import android.os.Looper
import android.util.Log
import android.widget.RemoteViews
import java.util.Random
import java.util.concurrent.Executors
import java.util.concurrent.TimeUnit


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
//            views.setOnClickPendingIntent(R.id.button_1, getPendingSelfIntent(context, ACTION_CLICK)
            //    val widgetText = context.getString(R.string.appwidget_text)
//    // Construct the RemoteViews object
            val r = Random()
            val i1: Int = r.nextInt(45 - 28) + 28
            views.setTextViewText(R.id.appwidget_text, "Random $i1")
            Log.d("WIDGET_TASK", "UPDATE_UPDATE")
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
        val service = Executors.newSingleThreadScheduledExecutor()
        val handler = Handler(Looper.getMainLooper())
        service.scheduleAtFixedRate({
            handler.run {
                Log.d("WIDGET_TASK", "UPDATE")
                val intent = Intent(context, WidgetApp::class.java)
                intent.action = AppWidgetManager.ACTION_APPWIDGET_UPDATE
                val ids = AppWidgetManager.getInstance(context)
                    .getAppWidgetIds(
                        context?.let {
                            ComponentName(
                                it,
                                WidgetApp::class.java
                            )
                        }
                    )
                intent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, ids)
                context?.sendBroadcast(intent)
            }
        }, 0, 2, TimeUnit.SECONDS);
    }

    override fun onDisabled(context: Context) {
        // Enter relevant functionality for when the last widget is disabled
    }

    override fun onReceive(context: Context?, intent: Intent?) {
        super.onReceive(context, intent)
//        if (intent != null) {
//            Log.d("ON_RECEIVE", intent.action.toString())
//            val views = RemoteViews(context?.packageName, R.layout.widget_app)
//            views.setTextViewText(R.id.appwidget_text, R.string.app_name.toString())
//            val intent =
//                Intent(context, WidgetApp::class.java)
//            intent.action = AppWidgetManager.ACTION_APPWIDGET_UPDATE
//            val ids = AppWidgetManager.getInstance(context)
//                .getAppWidgetIds(
//                    context?.let {
//                        ComponentName(
//                            it,
//                            WidgetApp::class.java
//                        )
//                    }
//                )
//            intent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, ids)
//            context?.sendBroadcast(intent)
//            Log.d("ON_RECEIVE", "UPDATED")
//        }

//        if (intent?.action?.startsWith(ACTION_CLICK) == true) {
//            intent?.action?.let { Log.i(null, it)}
//
//            val serviceIntent = Intent(context, BackgroundTask::class.java)
//            val bundle: Bundle = Bundle()
//            bundle.putFloat("key", 223.0F)
//            serviceIntent.putExtras(bundle)
//            context?.startService(serviceIntent)
//        }
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