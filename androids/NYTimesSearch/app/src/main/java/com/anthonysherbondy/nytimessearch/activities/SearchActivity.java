package com.anthonysherbondy.nytimessearch.activities;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.inputmethod.InputMethodManager;
import android.widget.AdapterView;
import android.widget.EditText;
import android.widget.GridView;

import com.anthonysherbondy.nytimessearch.ArticleArrayAdapter;
import com.anthonysherbondy.nytimessearch.R;
import com.anthonysherbondy.nytimessearch.models.Article;
import com.anthonysherbondy.nytimessearch.models.QueryFilter;
import com.loopj.android.http.AsyncHttpClient;
import com.loopj.android.http.JsonHttpResponseHandler;
import com.loopj.android.http.RequestParams;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

import cz.msebera.android.httpclient.Header;

public class SearchActivity extends AppCompatActivity {

    GridView gvResults;
    EditText etQuery;
    String apiKey = "f886fb17fa1d44a280f905ea197e6f66";
    ArrayList<Article> articles;
    ArticleArrayAdapter adapter;
    QueryFilter filter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_search);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        filter = new QueryFilter();
        setupViews();
    }

    public void setupViews() {
        etQuery = (EditText) findViewById(R.id.etQuery);
        gvResults = (GridView) findViewById(R.id.gvResults);
        articles = new ArrayList<>();
        adapter = new ArticleArrayAdapter(this, articles);
        gvResults.setAdapter(adapter);

        gvResults.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                Article article = articles.get(i);
                Intent intent = new Intent(SearchActivity.this, ArticleActivity.class);
                intent.putExtra("url", article.getWebUrl());
                startActivity(intent);
            }
        });

    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_search, menu);
        return true;
    }

    public void onArticleSearch(View view) {
        this.fetchNewQuery();
    }

    private void fetchNewQuery() {
        String query = etQuery.getText().toString();
        String url = "http://api.nytimes.com/svc/search/v2/articlesearch.json";
        RequestParams params = new RequestParams();
        params.put("api-key", apiKey);
        params.put("q", query);
        params.put("page", 0);
        filter.addParamsToRequest(params);
        Log.d("DEBUG", String.format("New query for: %s?%s", url, params.toString()));

        // remove previous articles
        articles.clear();

        // Clear keyboard
        hideSoftKeyboard();

        AsyncHttpClient client = new AsyncHttpClient();
        client.get(url, params, new JsonHttpResponseHandler() {
            @Override
            public void onSuccess(int statusCode, Header[] headers, JSONObject response) {
                JSONArray articleJsonResults = null;

                try {
                    articleJsonResults = response.getJSONObject("response").getJSONArray("docs");
                    articles.addAll(Article.fromJSONArray(articleJsonResults));
                    adapter.notifyDataSetChanged();
                    Log.d("DEBUG", articles.toString());

                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        });
    }

    public void hideSoftKeyboard() {
        View view = getCurrentFocus();
        if (view != null) {
            InputMethodManager imm =(InputMethodManager)getSystemService(Context.INPUT_METHOD_SERVICE);
            imm.hideSoftInputFromWindow(view.getWindowToken(), 0);
            view.clearFocus();
        }
    }

    private final int SETTINGS_CODE = 20;
    public void onSettings(MenuItem item) {
        Intent i = new Intent(this, SettingsActivity.class);
        i.putExtra("queryFilter", filter);
        startActivityForResult(i, SETTINGS_CODE);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == SETTINGS_CODE) {
            filter = (QueryFilter) data.getExtras().getSerializable("queryFilter");
            this.fetchNewQuery();
        }
    }
}
