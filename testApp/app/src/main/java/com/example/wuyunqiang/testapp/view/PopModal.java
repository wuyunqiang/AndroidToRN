package com.example.wuyunqiang.testapp.view;

import android.app.Activity;
import android.app.Dialog;
import android.content.Context;
import android.content.DialogInterface;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Build;
import android.support.annotation.RequiresApi;
import android.util.AttributeSet;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.Gravity;
import android.view.KeyEvent;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.view.accessibility.AccessibilityEvent;
import android.widget.FrameLayout;
import android.widget.PopupWindow;

import com.example.wuyunqiang.testapp.Utils.Utils;
import com.facebook.infer.annotation.Assertions;
import com.facebook.react.bridge.GuardedRunnable;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.common.annotations.VisibleForTesting;
import com.facebook.react.uimanager.JSTouchDispatcher;
import com.facebook.react.uimanager.RootView;
import com.facebook.react.uimanager.UIManagerModule;
import com.facebook.react.uimanager.events.EventDispatcher;
import com.facebook.react.views.view.ReactViewGroup;

import java.lang.reflect.Field;
import java.util.ArrayList;

import javax.annotation.Nullable;

/**
 * Created by wuyunqiang on 2018/2/9.
 */

public class PopModal extends ViewGroup implements LifecycleEventListener {


    static final String TAG = "PopModal";
    private DialogRootViewGroup mHostView;
    private @Nullable PopupWindow popupWindow;
    public static Context mContext;
    // Set this flag to true if changing a particular property on the view requires a new Dialog to
    // be created.  For instance, animation does since it affects Dialog creation through the theme
    // but transparency does not since we can access the window to update the property.

    public PopModal(Context context) {
        super(context);
        ((ReactContext) context).addLifecycleEventListener(this);
        mContext = context;
        mHostView = new DialogRootViewGroup(context);
        Log.i(TAG,"PopModal");
    }

    public static Context getReactContext(){
        return mContext;
    }

    public boolean isShow(){
        if(popupWindow!=null){
            return popupWindow.isShowing();
        }
        return false;
    }

    @Override
    protected void onLayout(boolean changed, int l, int t, int r, int b) {
        Log.i(TAG,"onLayout");
        // Do nothing as we are laid out by UIManager
    }

    @Override
    public void addView(View child, int index) {
        mHostView.addView(child, index);
        Log.i(TAG,"addView");
    }

    @Override
    public int getChildCount() {
        Log.i(TAG,"getChildCount");
        return mHostView.getChildCount();
    }

    @Override
    public View getChildAt(int index) {
        Log.i(TAG,"getChildAt");
        return mHostView.getChildAt(index);
    }

    @Override
    public void removeView(View child) {
        Log.i(TAG,"removeView");
        mHostView.removeView(child);
    }

    @Override
    public void removeViewAt(int index) {
        View child = getChildAt(index);
        mHostView.removeView(child);
        Log.i(TAG,"removeViewAt");
    }

    @Override
    public void addChildrenForAccessibility(ArrayList<View> outChildren) {
        // Explicitly override this to prevent accessibility events being passed down to children
        // Those will be handled by the mHostView which lives in the dialog
        Log.i(TAG,"addChildrenForAccessibility");
    }

    @Override
    public boolean dispatchPopulateAccessibilityEvent(AccessibilityEvent event) {
        // Explicitly override this to prevent accessibility events being passed down to children
        // Those will be handled by the mHostView which lives in the dialog
        Log.i(TAG,"dispatchPopulateAccessibilityEvent");
        return false;
    }

    public void onDropInstance() {
        ((ReactContext) getReactContext()).removeLifecycleEventListener(this);
        dismiss();
        Log.i(TAG,"onDropInstance");
//        mContext = null;
    }

    public void dismiss() {
        Log.i(TAG,"dismiss");
        if (popupWindow != null) {
            if (popupWindow.isShowing()) {
                popupWindow.dismiss();
            }
            popupWindow = null;

            // We need to remove the mHostView from the parent
            // It is possible we are dismissing this dialog and reattaching the hostView to another
            ViewGroup parent = (ViewGroup) mHostView.getParent();
            parent.removeViewAt(0);
        }
    }

    @Override
    public void onHostResume() {
        Log.i(TAG,"onHostResume");
        // We show the dialog again when the host resumes
//        showOrUpdate();
    }

    @Override
    public void onHostPause() {
        // We dismiss the dialog and reconstitute it onHostResume
        dismiss();
        Log.i(TAG,"onHostPause");
    }

    @Override
    public void onHostDestroy() {
        // Drop the instance if the host is destroyed which will dismiss the dialog
        onDropInstance();
        Log.i(TAG,"onHostDestroy");
    }

    @VisibleForTesting
    public @Nullable PopupWindow getDialog() {
        Log.i(TAG,"getDialog");
        return popupWindow;
    }

    /**
     * showOrUpdate will display the Dialog.  It is called by the manager once all properties are set
     * because we need to know all of them before creating the Dialog.  It is also smart during
     * updates if the changed properties can be applied directly to the Dialog or require the
     * recreation of a new Dialog.
     */
    public void showOrUpdate() {
        Log.i(TAG,"showOrUpdate");
        // If the existing Dialog is currently up, we may need to redraw it or we may be able to update
        // the property without having to recreate the dialog
        if (popupWindow != null) {
            fitPopupWindowOverStatusBar(popupWindow,true);
            popupWindow.showAtLocation(mHostView,Gravity.BOTTOM,0,0);
            return;
        }

        Activity currentActivity = getCurrentActivity();
//        Context context = currentActivity == null ? getReactContext() : currentActivity;
        Utils.init(getCurrentActivity().getApplication());
        popupWindow = new PopupWindow(getCurrentActivity());
        popupWindow.setWidth(LinearLayout.LayoutParams.MATCH_PARENT);
        popupWindow.setHeight(LinearLayout.LayoutParams.MATCH_PARENT);
        View v = getContentView();
        popupWindow.setContentView(v);
        popupWindow.setWidth(Utils.getScreenWidth());
        popupWindow.setTouchable(true);// true popwindow优先一切（系统级以外）处理touch  false:popwindow 只是一个view 不影响界面操作
        popupWindow.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));//不设置 不是全屏 周围会有空白部分
        popupWindow.setOutsideTouchable(true);
        fitPopupWindowOverStatusBar(popupWindow,true);
        if (currentActivity != null || !currentActivity.isFinishing()) {
            popupWindow.showAtLocation(mHostView,Gravity.BOTTOM,0,0);
        }
    }

    private @Nullable Activity getCurrentActivity() {
        Log.i(TAG,"getCurrentActivity");
        return ((ReactContext) getReactContext()).getCurrentActivity();
    }

    /**
     * Returns the view that will be the root view of the dialog. We are wrapping this in a
     * FrameLayout because this is the system's way of notifying us that the dialog size has changed.
     * This has the pleasant side-effect of us not having to preface all Modals with
     * "top: statusBarHeight", since that margin will be included in the FrameLayout.
     */
    private View getContentView() {
        Log.i(TAG,"getContentView");
        FrameLayout frameLayout = new FrameLayout(getReactContext());
        FrameLayout.LayoutParams params = new FrameLayout.LayoutParams(LayoutParams.MATCH_PARENT,LayoutParams.MATCH_PARENT);
        frameLayout.setLayoutParams(params);
        frameLayout.addView(mHostView);
        frameLayout.setFocusable(true);
        frameLayout.setFocusableInTouchMode(true);
        frameLayout.setPadding(0,0,0,0);
        frameLayout.setFitsSystemWindows(true);
        return frameLayout;
    }

    //适配全屏
    public void fitPopupWindowOverStatusBar(PopupWindow popupWindow,boolean needFullScreen) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            try {
                Field mLayoutInScreen = PopupWindow.class.getDeclaredField("mLayoutInScreen");
                mLayoutInScreen.setAccessible(true);
                mLayoutInScreen.set(popupWindow, needFullScreen);
            } catch (NoSuchFieldException e) {
                e.printStackTrace();
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }
    }

    /**
     * DialogRootViewGroup is the ViewGroup which contains all the children of a Modal.  It gets all
     * child information forwarded from PopModal and uses that to create children.  It is
     * also responsible for acting as a RootView and handling touch events.  It does this the same
     * way as ReactRootView.
     *
     * To get layout to work properly, we need to layout all the elements within the Modal as if they
     * can fill the entire window.  To do that, we need to explicitly set the styleWidth and
     * styleHeight on the LayoutShadowNode to be the window size. This is done through the
     * UIManagerModule, and will then cause the children to layout as if they can fill the window.
     */
    static class DialogRootViewGroup extends ReactViewGroup implements RootView {

        private final JSTouchDispatcher mJSTouchDispatcher = new JSTouchDispatcher(this);

        public DialogRootViewGroup(Context context) {
            super(context);
        }

        @Override
        protected void onSizeChanged(final int w, final int h, int oldw, int oldh) {
            super.onSizeChanged(w, h, oldw, oldh);
            Log.i(TAG,"onSizeChanged w:"+w+" h:"+h+" oldw:"+oldw + " oldh:"+oldh);
            if (getChildCount() > 0) {
                final int viewTag = getChildAt(0).getId();
                ReactContext reactContext = (ReactContext) getReactContext();
                reactContext.runOnNativeModulesQueueThread(
                        new GuardedRunnable(reactContext) {
                            @Override
                            public void runGuarded() {
                                ((ReactContext) getReactContext()).getNativeModule(UIManagerModule.class)
                                        .updateNodeSize(viewTag, w, h);
                            }
                        });
            }
        }

        @Override
        public boolean onInterceptTouchEvent(MotionEvent event) {
            Log.i(TAG,"onInterceptTouchEvent");
            mJSTouchDispatcher.handleTouchEvent(event, getEventDispatcher());
            return super.onInterceptTouchEvent(event);
        }

        @Override
        public boolean onTouchEvent(MotionEvent event) {
            Log.i(TAG,"onTouchEvent");
            mJSTouchDispatcher.handleTouchEvent(event, getEventDispatcher());
            super.onTouchEvent(event);
            // In case when there is no children interested in handling touch event, we return true from
            // the root view in order to receive subsequent events related to that gesture
            return true;
        }

        @Override
        public void onChildStartedNativeGesture(MotionEvent androidEvent) {
            Log.i(TAG,"onChildStartedNativeGesture");
            mJSTouchDispatcher.onChildStartedNativeGesture(androidEvent, getEventDispatcher());
        }

        @Override
        public void requestDisallowInterceptTouchEvent(boolean disallowIntercept) {
            Log.i(TAG,"requestDisallowInterceptTouchEvent");
            // No-op - override in order to still receive events to onInterceptTouchEvent
            // even when some other view disallow that
        }

        private EventDispatcher getEventDispatcher() {
            Log.i(TAG,"getEventDispatcher");
            ReactContext reactContext = (ReactContext) getReactContext();
            return reactContext.getNativeModule(UIManagerModule.class).getEventDispatcher();
        }
    }
}
