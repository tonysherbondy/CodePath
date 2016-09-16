package com.anthonysherbondy.nytimessearch.models;

import android.net.Uri;
import android.util.Log;

import com.loopj.android.http.RequestParams;

import java.io.Serializable;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Locale;

/**
 * Created by anthonysherbondy on 9/16/16.
 */
public class QueryFilter implements Serializable {
    Boolean ndArts = false;
    Boolean ndFashion = false;
    Boolean ndSports = true;
    Date beginDate;

    public Boolean getNdArts() {
        return ndArts;
    }

    public Boolean getNdFashion() {
        return ndFashion;
    }

    public Boolean getNdSports() {
        return ndSports;
    }

    public Date getBeginDate() {
        return beginDate;
    }

    public int getSortOrder() {
        return sortOrder;
    }

    // TODO - Consider descriptors
    // 0: oldest, 1: newest
    int sortOrder = 0;

    public QueryFilter(int sortOrder, Date beginDate, Boolean ndArts, Boolean ndFashion, Boolean ndSports) {
        this.sortOrder = sortOrder;
        this.beginDate = beginDate;
        this.ndArts = ndArts;
        this.ndFashion = ndFashion;
        this.ndSports = ndSports;
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
        // TODO - add filter to params
        DateFormat format = new SimpleDateFormat("yyyyMMdd", Locale.ENGLISH);
        if (beginDate != null) {
            String date = format.format(beginDate);
            params.put("begin_date", date);
        } else {
            Log.d("DEBUG", "no date specified");
        }
        String sort = sortOrder == 0 ? "oldest" : "newest";
        params.put("sort", sort);
        addNewsDeskOptions(params);
    }

}
