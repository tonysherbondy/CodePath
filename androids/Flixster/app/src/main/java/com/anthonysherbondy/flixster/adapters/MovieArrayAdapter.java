package com.anthonysherbondy.flixster.adapters;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import com.anthonysherbondy.flixster.R;
import com.anthonysherbondy.flixster.models.Movie;
import com.squareup.picasso.Picasso;

import java.util.List;

/**
 * Created by anthonysherbondy on 9/12/16.
 */
public class MovieArrayAdapter extends ArrayAdapter<Movie> {
    public MovieArrayAdapter(Context context, List<Movie> movies) {
        super(context, android.R.layout.simple_list_item_1, movies);
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        // get data for position
        Movie movie = getItem(position);

        // check the existing view being reused
        if (convertView == null) {
            LayoutInflater inflater = LayoutInflater.from(getContext());
            convertView = inflater.inflate(R.layout.item_movie, parent, false);
        }

        // find the image view
        ImageView ivMovieImage = (ImageView) convertView.findViewById(R.id.ivMovieImage);
        // clear image from last time
        ivMovieImage.setImageResource(0);

        // find text views
        TextView tvTitle = (TextView) convertView.findViewById(R.id.tvTitle);
        TextView tvOverview = (TextView) convertView.findViewById(R.id.tvOverview);

        // populate text
        tvTitle.setText(movie.getOriginalTitle());
        tvOverview.setText(movie.getOverview());

        // populate image
        Picasso.with(getContext()).load(movie.getPosterPath()).into(ivMovieImage);

        // return view
        return convertView;
    }
}
