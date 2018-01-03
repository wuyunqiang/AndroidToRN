package com.example.wuyunqiang.testapp.codepush;

import android.content.Context;
import android.content.SharedPreferences;

import com.example.wuyunqiang.testapp.codepush.*;
import com.example.wuyunqiang.testapp.codepush.CodePushConstants;
import com.example.wuyunqiang.testapp.codepush.CodePushMalformedDataException;
import com.example.wuyunqiang.testapp.codepush.CodePushUnknownException;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class SettingsManager {

    private SharedPreferences mSettings;

    public SettingsManager(Context applicationContext) {
        mSettings = applicationContext.getSharedPreferences(com.example.wuyunqiang.testapp.codepush.CodePushConstants.CODE_PUSH_PREFERENCES, 0);
    }

    public JSONArray getFailedUpdates() {
        String failedUpdatesString = mSettings.getString(com.example.wuyunqiang.testapp.codepush.CodePushConstants.FAILED_UPDATES_KEY, null);
        if (failedUpdatesString == null) {
            return new JSONArray();
        }

        try {
            return new JSONArray(failedUpdatesString);
        } catch (JSONException e) {
            // Unrecognized data format, clear and replace with expected format.
            JSONArray emptyArray = new JSONArray();
            mSettings.edit().putString(com.example.wuyunqiang.testapp.codepush.CodePushConstants.FAILED_UPDATES_KEY, emptyArray.toString()).commit();
            return emptyArray;
        }
    }

    public JSONObject getPendingUpdate() {
        String pendingUpdateString = mSettings.getString(com.example.wuyunqiang.testapp.codepush.CodePushConstants.PENDING_UPDATE_KEY, null);
        if (pendingUpdateString == null) {
            return null;
        }

        try {
            return new JSONObject(pendingUpdateString);
        } catch (JSONException e) {
            // Should not happen.
            com.example.wuyunqiang.testapp.codepush.CodePushUtils.log("Unable to parse pending update metadata " + pendingUpdateString +
                    " stored in SharedPreferences");
            return null;
        }
    }


    public boolean isFailedHash(String packageHash) {
        JSONArray failedUpdates = getFailedUpdates();
        if (packageHash != null) {
            for (int i = 0; i < failedUpdates.length(); i++) {
                try {
                    JSONObject failedPackage = failedUpdates.getJSONObject(i);
                    String failedPackageHash = failedPackage.getString(com.example.wuyunqiang.testapp.codepush.CodePushConstants.PACKAGE_HASH_KEY);
                    if (packageHash.equals(failedPackageHash)) {
                        return true;
                    }
                } catch (JSONException e) {
                    throw new com.example.wuyunqiang.testapp.codepush.CodePushUnknownException("Unable to read failedUpdates data stored in SharedPreferences.", e);
                }
            }
        }

        return false;
    }

    public boolean isPendingUpdate(String packageHash) {
        JSONObject pendingUpdate = getPendingUpdate();

        try {
            return pendingUpdate != null &&
                    !pendingUpdate.getBoolean(com.example.wuyunqiang.testapp.codepush.CodePushConstants.PENDING_UPDATE_IS_LOADING_KEY) &&
                    (packageHash == null || pendingUpdate.getString(com.example.wuyunqiang.testapp.codepush.CodePushConstants.PENDING_UPDATE_HASH_KEY).equals(packageHash));
        }
        catch (JSONException e) {
            throw new com.example.wuyunqiang.testapp.codepush.CodePushUnknownException("Unable to read pending update metadata in isPendingUpdate.", e);
        }
    }

    public void removeFailedUpdates() {
        mSettings.edit().remove(com.example.wuyunqiang.testapp.codepush.CodePushConstants.FAILED_UPDATES_KEY).commit();
    }

    public void removePendingUpdate() {
        mSettings.edit().remove(com.example.wuyunqiang.testapp.codepush.CodePushConstants.PENDING_UPDATE_KEY).commit();
    }

    public void saveFailedUpdate(JSONObject failedPackage) {
        String failedUpdatesString = mSettings.getString(com.example.wuyunqiang.testapp.codepush.CodePushConstants.FAILED_UPDATES_KEY, null);
        JSONArray failedUpdates;
        if (failedUpdatesString == null) {
            failedUpdates = new JSONArray();
        } else {
            try {
                failedUpdates = new JSONArray(failedUpdatesString);
            } catch (JSONException e) {
                // Should not happen.
                throw new CodePushMalformedDataException("Unable to parse failed updates information " +
                        failedUpdatesString + " stored in SharedPreferences", e);
            }
        }

        failedUpdates.put(failedPackage);
        mSettings.edit().putString(com.example.wuyunqiang.testapp.codepush.CodePushConstants.FAILED_UPDATES_KEY, failedUpdates.toString()).commit();
    }

    public void savePendingUpdate(String packageHash, boolean isLoading) {
        JSONObject pendingUpdate = new JSONObject();
        try {
            pendingUpdate.put(com.example.wuyunqiang.testapp.codepush.CodePushConstants.PENDING_UPDATE_HASH_KEY, packageHash);
            pendingUpdate.put(com.example.wuyunqiang.testapp.codepush.CodePushConstants.PENDING_UPDATE_IS_LOADING_KEY, isLoading);
            mSettings.edit().putString(CodePushConstants.PENDING_UPDATE_KEY, pendingUpdate.toString()).commit();
        } catch (JSONException e) {
            // Should not happen.
            throw new com.example.wuyunqiang.testapp.codepush.CodePushUnknownException("Unable to save pending update.", e);
        }
    }

}
