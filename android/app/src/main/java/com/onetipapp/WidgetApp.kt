package com.onetipapp

import android.annotation.SuppressLint
import android.app.AlarmManager
import android.app.PendingIntent
import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.net.Uri
import android.os.Build
import android.os.Handler
import android.os.Looper
import android.util.Log
import android.widget.RemoteViews
import java.time.Duration
import java.time.LocalDateTime
import java.time.ZonedDateTime
import java.util.Random
import java.util.concurrent.Executors


/**
 * Implementation of App Widget functionality.
 */
class WidgetApp : AppWidgetProvider() {


    private val imageTest = Uri.parse("https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80")
    private val imageTest2 = Uri.parse("https://media.istockphoto.com/id/1322277517/photo/wild-grass-in-the-mountains-at-sunset.jpg?s=612x612&w=0&k=20&c=6mItwwFFGqKNKEAzv0mv6TaxhLN3zSE43bWmFN--J5w=")
    var flag = true

    @SuppressLint("NewApi")
    val widget1 = mapOf(
        "imageURL" to Uri.parse("https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"),
        "user" to mapOf(
            "first_name" to "Kek",
            "last_name" to "Cheburec"
        ),
        "date" to LocalDateTime.now(),
        "track" to mapOf(
            "name" to "song",
            "author" to "author",
            "url" to "url"
        ),
        "geo_tag" to mapOf(
            "lat" to 1212,
            "lon" to 1234
        )
    )

    @SuppressLint("NewApi")
    val widget2 = mapOf(
        "imageURL" to Uri.parse("https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"),
        "user" to mapOf(
            "first_name" to "Kek",
            "last_name" to "Cheburec"
        ),
        "date" to LocalDateTime.now(),
        "track" to mapOf(
            "name" to "song",
            "author" to "author",
            "url" to "url"
        ),
        "geo_tag" to mapOf(
            "lat" to 1212,
            "lon" to 1234
        )
    )

    override fun onUpdate(context: Context, appWidgetManager: AppWidgetManager, appWidgetIds: IntArray) {
        for (appWidgetId in appWidgetIds) {
            onUpdateWidget(context, appWidgetId, appWidgetManager)
        }
        scheduleUpdates(context)
    }

    private fun getActiveWidgetIds(context: Context): IntArray {
        val appWidgetManager = AppWidgetManager.getInstance(context)
        val componentName = ComponentName(context, this::class.java)
        return appWidgetManager.getAppWidgetIds(componentName)
    }

    private fun scheduleUpdates(context: Context) {
        val activeWidgetIds = getActiveWidgetIds(context)

        if (activeWidgetIds.isNotEmpty()) {
            val nextUpdate = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                ZonedDateTime.now() + WIDGET_UPDATE_INTERVAL
            } else {
                TODO("VERSION.SDK_INT < O")
            }
            val pendingIntent = getUpdatePendingIntent(context)
            Log.d("WIDGET_UPDATE", "Enable update")
            context.alarmManager.set(
                AlarmManager.RTC_WAKEUP,
                nextUpdate.toInstant().toEpochMilli(), // alarm time in millis since 1970-01-01 UTC
                pendingIntent
            )
        }
    }

    private val Context.alarmManager: AlarmManager
        get() = getSystemService(Context.ALARM_SERVICE) as AlarmManager

    private fun getUpdatePendingIntent(context: Context): PendingIntent {
        val widgetClass = this::class.java
        val widgetIds = getActiveWidgetIds(context)
        val updateIntent = Intent(context, widgetClass)
            .setAction(AppWidgetManager.ACTION_APPWIDGET_UPDATE)
            .putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, widgetIds)
        val requestCode = widgetClass.name.hashCode()
        val flags = PendingIntent.FLAG_CANCEL_CURRENT or
                PendingIntent.FLAG_IMMUTABLE

        return PendingIntent.getBroadcast(context, requestCode, updateIntent, flags)
    }

    companion object {
        private val WIDGET_UPDATE_INTERVAL = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            Duration.ofSeconds(1)
        } else {
            TODO("VERSION.SDK_INT < O")
        }
    }

    override fun onEnabled(context: Context) {
        // Enter relevant functionality for when the first widget is createda
//        val service = Executors.newSingleThreadScheduledExecutor()
//        val handler = Handler(Looper.getMainLooper())
//        service.scheduleAtFixedRate({
//            handler.run {
//                Log.d("WIDGET_TASK", "UPDATE")
//                val intent = Intent(context, WidgetApp::class.java)
//                intent.action = AppWidgetManager.ACTION_APPWIDGET_UPDATE
//                val ids = AppWidgetManager.getInstance(context)
//                    .getAppWidgetIds(
//                        context?.let {
//                            ComponentName(
//                                it,
//                                WidgetApp::class.java
//                            )
//                        }
//                    )
//                intent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, ids)
//                context?.sendBroadcast(intent)
//            }
//        }, 0, 2, TimeUnit.SECONDS);
    }

    override fun onDisabled(context: Context) {
    }

    override fun onReceive(context: Context?, intent: Intent?) {
        super.onReceive(context, intent)
    }

    private fun onUpdateWidget(context: Context, appWidgetId: Int, appWidgetManager: AppWidgetManager) {
        val views: RemoteViews = RemoteViews(context.packageName, R.layout.widget_app)
        val executor = Executors.newSingleThreadExecutor()
        val handler = Handler(Looper.getMainLooper())
        var image: Bitmap? = null
        var src = ""

        val r = Random()
        val i1: Int = r.nextInt(10)
        src = if (i1 > 5){
            imageTest.toString()
        } else {
            imageTest2.toString()
        }

        executor.execute {
            try {
                val `in` = java.net.URL(src).openStream()
                image = BitmapFactory.decodeStream(`in`)
                handler.post{
                    views.setImageViewBitmap(R.id.imageView ,image)
//                    views.setTextViewText(R.id.appwidget_text, "Random $i1")
                    appWidgetManager.updateAppWidget(appWidgetId, views)
                }
            } catch (e: java.lang.Exception) {
                e.printStackTrace()
            }
        }
    }
}
