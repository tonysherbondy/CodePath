package com.anthonysherbondy.nytimessearch.models;

import android.net.Uri;
import android.support.annotation.NonNull;
import android.util.Log;

import com.loopj.android.http.RequestParams;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Locale;

/**
 * Created by anthonysherbondy on 9/16/16.
 */
public class QueryFilter implements Serializable {
    Boolean ndArts = false;
    Boolean ndFashion = false;
    Boolean ndSports = true;

    public void setBeginDate(Calendar beginDate) {
        this.beginDate = beginDate;
    }

    Calendar beginDate;

    public Boolean getNdArts() {
        return ndArts;
    }

    public Boolean getNdFashion() {
        return ndFashion;
    }

    public Boolean getNdSports() {
        return ndSports;
    }

    public Calendar getBeginDate() {
        return beginDate;
    }

    @NonNull
    public String getBeginDateString() {
        if (beginDate == null) {
            return "";
        }
        int year = beginDate.get(Calendar.YEAR);
        int month = beginDate.get(Calendar.MONTH) + 1;
        int day = beginDate.get(Calendar.DAY_OF_MONTH);
        return String.format(Locale.ENGLISH, "%d/%d/%d", month, day, year);
    }

    public int getSortOrder() {
        return sortOrder;
    }

    // TODO - Consider descriptors
    // 0: oldest, 1: newest
    int sortOrder = 1;

    public QueryFilter(int sortOrder, Calendar beginDate, Boolean ndArts, Boolean ndFashion, Boolean ndSports) {
        this.sortOrder = sortOrder;
        this.ndArts = ndArts;
        this.ndFashion = ndFashion;
        this.ndSports = ndSports;
        this.beginDate = beginDate;
    }

    public QueryFilter() {
    }

    private void addNewsDeskOptions(RequestParams params) {
        ArrayList<String> newsDeskOptions = new ArrayList<>();
        if (ndArts) {
            newsDeskOptions.add("Arts");
        }
        if (ndFashion) {
            newsDeskOptions.add("Fashion & Style");
        }
        if (ndSports) {
            newsDeskOptions.add("Sports");
        }
        if (newsDeskOptions.size() > 0) {
            String fq = "news_desk:(";
            for (int i = 0; i < newsDeskOptions.size(); i++) {
                String option = Uri.encode(newsDeskOptions.get(i));
                if (i == 0) {
                    fq = String.format("%s\"%s\"", fq, option);
                } else {
                    fq = String.format("%s \"%s\"", fq, option);
                }
            }
            fq += ")";
            params.put("fq", fq);
        }
    }

    public void addParamsToRequest(RequestParams params) {
        if (beginDate != null) {
            int year = beginDate.get(Calendar.YEAR);
            int month = beginDate.get(Calendar.MONTH) + 1;
            int day = beginDate.get(Calendar.DAY_OF_MONTH);
            String date = String.format("%d%02d%02d", year, month, day);
            params.put("begin_date", date);
        } else {
            Log.d("DEBUG", "no date specified");
        }
        String sort = sortOrder == 0 ? "oldest" : "newest";
        params.put("sort", sort);
        addNewsDeskOptions(params);
    }

}
