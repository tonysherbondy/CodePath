package com.anthonysherbondy.flixster;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.ImageView;
import android.widget.RatingBar;
import android.widget.TextView;

import com.anthonysherbondy.flixster.models.Movie;
import com.squareup.picasso.Picasso;

import jp.wasabeef.picasso.transformations.RoundedCornersTransformation;

public class DetailsActivity extends AppCompatActivity {

    TextView tvTitle;
    TextView tvSynopsis;
    RatingBar rbVotes;
    ImageView ivMovieImage;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_details);

        tvTitle = (TextView) findViewById(R.id.tvTitle);
        tvSynopsis = (TextView) findViewById(R.id.tvSynopsis);
        rbVotes = (RatingBar) findViewById(R.id.rbVote);

        Movie movie = (Movie) getIntent().getSerializableExtra("movie");
        tvTitle.setText(movie.getOriginalTitle());
        tvSynopsis.setText(movie.getOverview());

//        int numStars = (int) Math.round(movie.getVoteAverage());
//        Log.d("DEBUG", String.format("stars %d", numStars));
        rbVotes.setRating((float) movie.getVoteAverage());

        ivMovieImage = (ImageView) findViewById(R.id.ivMovieImage);
        Picasso.with(this).load(movie.getBackdropPath())
                .transform(new RoundedCornersTransformation(10, 3))
                .placeholder(R.drawable.ic_camera_black_24dp)
                .into(ivMovieImage);
    }
}
