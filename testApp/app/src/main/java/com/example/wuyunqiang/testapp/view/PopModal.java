package com.example.wuyunqiang.testapp.view;

import android.content.Context;
import android.os.Build;
import android.support.annotation.RequiresApi;
import android.util.AttributeSet;
import android.view.ViewGroup;
import android.widget.PopupWindow;

/**
 * Created by wuyunqiang on 2018/2/9.
 */

public class PopModal extends ViewGroup {

    public PopupWindow getPopupWindow() {
        return popupWindow;
    }

    private PopupWindow popupWindow;

    public PopModal(Context context) {
        super(context);
        this.initView(context, null);
    }

    public PopModal(Context context, AttributeSet attrs) {
        super(context, attrs);
        this.initView(context, attrs);
    }

    public PopModal(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        this.initView(context, attrs);
    }

    @RequiresApi(Build.VERSION_CODES.LOLLIPOP)
    public PopModal(Context context, AttributeSet attrs, int defStyleAttr, int defStyleRes) {
        super(context, attrs, defStyleAttr, defStyleRes);
        this.initView(context, attrs);
    }

    private void initView(Context context, AttributeSet attrs) {
        popupWindow = new PopupWindow(context);
    }



    @Override
    protected void onLayout(boolean changed, int l, int t, int r, int b) {

    }
}
