package com.anthonysherbondy.flixster;

import android.databinding.DataBindingUtil;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;

import com.anthonysherbondy.flixster.databinding.ActivityDetailsBinding;
import com.anthonysherbondy.flixster.models.Movie;
import com.squareup.picasso.Picasso;

import jp.wasabeef.picasso.transformations.RoundedCornersTransformation;

public class DetailsActivity extends AppCompatActivity {
    private ActivityDetailsBinding binding;

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
    }
}
