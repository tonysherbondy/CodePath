package com.anthonysherbondy.flixster;

import android.content.Intent;
import android.databinding.DataBindingUtil;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;

import com.anthonysherbondy.flixster.databinding.ActivityDetailsBinding;
import com.anthonysherbondy.flixster.models.Movie;
import com.loopj.android.http.AsyncHttpClient;
import com.loopj.android.http.JsonHttpResponseHandler;
import com.squareup.picasso.Picasso;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import cz.msebera.android.httpclient.Header;
import jp.wasabeef.picasso.transformations.RoundedCornersTransformation;

public class DetailsActivity extends AppCompatActivity {
    private ActivityDetailsBinding binding;
    String ytTrailerId;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = DataBindingUtil.setContentView(this, R.layout.activity_details);

        Movie movie = (Movie) getIntent().getSerializableExtra("movie");
        binding.setMovie(movie);

        Picasso.with(this).load(movie.getBackdropPath())
                .transform(new RoundedCornersTransformation(10, 3))
                .placeholder(R.drawable.ic_camera_black_24dp)
                .into(binding.ivMovieImage);

        binding.ivMovieImage.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(DetailsActivity.this, YouTubeActivity.class);
                intent.putExtra("ytTrailerId", ytTrailerId);
                startActivity(intent);
            }
        });

        fetchTrailersAsync(movie.getId());
    }

    private void fetchTrailersAsync(String movieId) {
        String baseUrl = "https://api.themoviedb.org/3/movie";
        String apiKey = "a07e22bc18f5cb106bfe4cc1f83ad8ed";
        String url = String.format("%s/%s/trailers?api_key=%s", baseUrl, movieId, apiKey);

        Log.d("DEBUG", url);
        AsyncHttpClient client = new AsyncHttpClient();
        client.get(url, new JsonHttpResponseHandler(){
            @Override
            public void onSuccess(int statusCode, Header[] headers, JSONObject response) {
                JSONArray ytResults = null;
                try {
                    ytResults = response.getJSONArray("youtube");
                    if (ytResults.length() > 0) {
                        ytTrailerId = ytResults.getJSONObject(0).getString("source");
                        Log.d("DEBUG", ytResults.toString());
                    }
                } catch(JSONException e) {
                    e.printStackTrace();
                }
            }

            @Override
            public void onFailure(int statusCode, Header[] headers, String responseString, Throwable throwable) {

                super.onFailure(statusCode, headers, responseString, throwable);
            }
        });
    }
}
