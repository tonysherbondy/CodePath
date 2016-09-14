package com.anthonysherbondy.flixster.adapters;

import android.content.Context;
import android.content.res.Configuration;
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

    private static class ViewHolder {
        TextView tvTitle;
        TextView tvOverview;
        ImageView ivMovieImage;
    }

    private boolean isPopular(Movie movie) {
        return movie.getVoteAverage() > 4.5;
    }

    public MovieArrayAdapter(Context context, List<Movie> movies) {
        super(context, android.R.layout.simple_list_item_1, movies);
    }

    @Override
    public int getViewTypeCount() {
        int orientation = getContext().getResources().getConfiguration().orientation;
        if (orientation == Configuration.ORIENTATION_PORTRAIT) {
            return 2;
        }
        return 1;
    }

    @Override
    public int getItemViewType(int position) {
        Movie movie = getItem(position);
        if (getViewTypeCount() > 1 && isPopular(movie)) {
            return 1;
        }
        return 0;
    }

    private View getInflatedLayoutForType(int type) {
        if (type == 0) {
            // Unpopular
            LayoutInflater inflater = LayoutInflater.from(getContext());
            return inflater.inflate(R.layout.item_movie, null, false);
        } else {
            // popular
            LayoutInflater inflater = LayoutInflater.from(getContext());
            return inflater.inflate(R.layout.item_popular_movie, null, false);
        }
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        // get data for position
        Movie movie = getItem(position);

        // check the existing view being reused
        ViewHolder viewHolder;
        int itemType = getItemViewType(position);
        if (convertView == null) {
            viewHolder = new ViewHolder();
            convertView = getInflatedLayoutForType(itemType);

            // find views
            viewHolder.tvTitle = (TextView) convertView.findViewById(R.id.tvTitle);
            viewHolder.tvOverview = (TextView) convertView.findViewById(R.id.tvOverview);
            viewHolder.ivMovieImage = (ImageView) convertView.findViewById(R.id.ivMovieImage);
            convertView.setTag(viewHolder);
        } else {
            viewHolder = (ViewHolder) convertView.getTag();
        }

        // clear image from last time
        viewHolder.ivMovieImage.setImageResource(0);
        // populate text
        if (viewHolder.tvTitle != null) {
            viewHolder.tvTitle.setText(movie.getOriginalTitle());
        }
        if (viewHolder.tvOverview != null) {
            viewHolder.tvOverview.setText(movie.getOverview());
        }

        // get image path depending on orientation
        String imagePath;
        int orientation = getContext().getResources().getConfiguration().orientation;
        if (orientation == Configuration.ORIENTATION_LANDSCAPE || movie.getVoteAverage() > 4.5) {
            imagePath = movie.getBackdropPath();
        } else {
            imagePath = movie.getPosterPath();
        }
        // populate image
        Picasso.with(getContext()).load(imagePath).into(viewHolder.ivMovieImage);

        // return view
        return convertView;
    }
}
