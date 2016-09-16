package com.anthonysherbondy.nytimessearch.models;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

/**
 * Created by anthonysherbondy on 9/15/16.
 */
public class Article {

    String webUrl;
    String headline;
    String thumbnail;

    public String getWebUrl() {
        return webUrl;
    }

    public String getHeadline() {
        return headline;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public Article(JSONObject jsonObject) throws JSONException {
        webUrl = jsonObject.getString("web_url");
        headline = jsonObject.getJSONObject("headline").getString("main");
        JSONArray multimedia = jsonObject.getJSONArray("multimedia");

        if (multimedia.length() > 0) {
            String url = multimedia.getJSONObject(0).getString("url");
            thumbnail = "http://www.nytimes.com/" + url;
        } else {
            thumbnail = "";
        }
    }

    public static ArrayList<Article> fromJSONArray(JSONArray jsonArray) throws JSONException {
        ArrayList<Article> articles = new ArrayList<>();
        for (int a = 0; a < jsonArray.length(); a++) {
            articles.add(new Article(jsonArray.getJSONObject(a)));
        }
        return articles;
    }
}
