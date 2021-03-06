package com.anthonysherbondy.nytimessearch.activities;

import android.content.Context;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Bundle;
import android.support.v4.app.FragmentManager;
import android.support.v4.view.MenuItemCompat;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.SearchView;
import android.support.v7.widget.StaggeredGridLayoutManager;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.inputmethod.InputMethodManager;

import com.anthonysherbondy.nytimessearch.ItemClickSupport;
import com.anthonysherbondy.nytimessearch.R;
import com.anthonysherbondy.nytimessearch.adapters.RVArticlesAdapter;
import com.anthonysherbondy.nytimessearch.fragments.SettingsFragment;
import com.anthonysherbondy.nytimessearch.listeners.EndlessRecyclerViewScrollListener;
import com.anthonysherbondy.nytimessearch.models.Article;
import com.anthonysherbondy.nytimessearch.models.QueryFilter;
import com.loopj.android.http.AsyncHttpClient;
import com.loopj.android.http.JsonHttpResponseHandler;
import com.loopj.android.http.RequestParams;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.ArrayList;

import cz.msebera.android.httpclient.Header;

public class SearchActivity extends AppCompatActivity implements SettingsFragment.OnSettingsSaveListener {

    String apiKey = "f886fb17fa1d44a280f905ea197e6f66";
    ArrayList<Article> articles;
    RecyclerView rvResults;
    RVArticlesAdapter rvArticlesAdapter;
    QueryFilter filter;
    // Total number of articles we can scroll
    int totalPossibleArticles = 0;
    String currentQuery;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_search);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        filter = new QueryFilter();
        setupViews();
        fetchNewQuery();

        Log.d("DEBUG", String.format("Network is %s", isOnline() ? "online" : "offline"));
    }

    public void setupViews() {
        rvResults = (RecyclerView) findViewById(R.id.rvResults);
        articles = new ArrayList<>();
        rvArticlesAdapter = new RVArticlesAdapter(this, articles);
        rvResults.setAdapter(rvArticlesAdapter);
        StaggeredGridLayoutManager layoutManager = new StaggeredGridLayoutManager(3, StaggeredGridLayoutManager.VERTICAL);
        rvResults.setLayoutManager(layoutManager);

        ItemClickSupport.addTo(rvResults).setOnItemClickListener(
                new ItemClickSupport.OnItemClickListener() {
                    @Override
                    public void onItemClicked(RecyclerView recyclerView, int position, View v) {
                        Article article = articles.get(position);
                        Intent intent = new Intent(SearchActivity.this, ArticleActivity.class);
                        intent.putExtra("url", article.getWebUrl());
                        startActivity(intent);
                    }
                }
        );

        rvResults.addOnScrollListener(new EndlessRecyclerViewScrollListener(layoutManager) {
            @Override
            public void onLoadMore(int page, int totalItemsCount) {
                if (totalPossibleArticles > totalItemsCount) {
                    fetchPage(page);
                }
            }
        });

    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_search, menu);
        MenuItem searchItem = menu.findItem(R.id.action_search);
        final SearchView searchView = (SearchView) MenuItemCompat.getActionView(searchItem);
        searchView.setOnQueryTextListener(new SearchView.OnQueryTextListener() {
            @Override
            public boolean onQueryTextSubmit(String query) {
                // perform query
                currentQuery = query;
                fetchNewQuery();
                return true;
            }

            @Override
            public boolean onQueryTextChange(String newText) {
                return false;
            }
        });
        return super.onCreateOptionsMenu(menu);
    }

    private void fetchNewQuery() {
        // Clear keyboard
        hideSoftKeyboard();
        // remove previous articles
        articles.clear();
        totalPossibleArticles = 0;
        // fetch the first page
        fetchPage(0);
    }

    private void fetchPage(int page) {
        String url = "http://api.nytimes.com/svc/search/v2/articlesearch.json";
        RequestParams params = new RequestParams();
        params.put("api-key", apiKey);
        params.put("q", currentQuery);
        params.put("page", page);
        filter.addParamsToRequest(params);
        Log.d("DEBUG", String.format("Query for: %s?%s", url, params.toString()));
        Log.d("DEBUG", String.format("Fetching page %d", page));
        AsyncHttpClient client = new AsyncHttpClient();
        client.get(url, params, new JsonHttpResponseHandler() {
            @Override
            public void onSuccess(int statusCode, Header[] headers, JSONObject response) {
                JSONArray articleJsonResults = null;

                try {
                    totalPossibleArticles = response.getJSONObject("response").getJSONObject("meta").getInt("hits");
                    articleJsonResults = response.getJSONObject("response").getJSONArray("docs");
                    articles.addAll(Article.fromJSONArray(articleJsonResults));
                    rvArticlesAdapter.notifyDataSetChanged();
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
//        Intent i = new Intent(this, SettingsActivity.class);
//        i.putExtra("queryFilter", filter);
//        startActivityForResult(i, SETTINGS_CODE);
        // TODO - Move to dialog fragment
        showSettingsDialog();
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == SETTINGS_CODE) {
            filter = (QueryFilter) data.getExtras().getSerializable("queryFilter");
            this.fetchNewQuery();
        }
    }

    private void showSettingsDialog() {
        FragmentManager fm = getSupportFragmentManager();
        SettingsFragment settingsFragment = SettingsFragment.newInstance(filter);
        settingsFragment.show(fm, "settingsEditor");
    }

    private Boolean isNetworkAvailable() {
        ConnectivityManager connectivityManager
                = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo activeNetworkInfo = connectivityManager.getActiveNetworkInfo();
        return activeNetworkInfo != null && activeNetworkInfo.isConnectedOrConnecting();
    }

    public boolean isOnline() {
        Runtime runtime = Runtime.getRuntime();
        try {
            Process ipProcess = runtime.exec("/system/bin/ping -c 1 8.8.8.8");
            int     exitValue = ipProcess.waitFor();
            return (exitValue == 0);
        } catch (IOException e)          { e.printStackTrace(); }
        catch (InterruptedException e) { e.printStackTrace(); }
        return false;
    }

    @Override
    public void onSettingsSave(QueryFilter filter) {
        this.filter = filter;
        this.fetchNewQuery();
    }
}
