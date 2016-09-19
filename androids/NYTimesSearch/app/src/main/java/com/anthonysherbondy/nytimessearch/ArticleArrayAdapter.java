package com.anthonysherbondy.nytimessearch;

import android.content.Context;
import android.text.TextUtils;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import com.anthonysherbondy.nytimessearch.models.Article;
import com.squareup.picasso.Picasso;

import java.util.ArrayList;

/**
 * Created by anthonysherbondy on 9/15/16.
 */
public class ArticleArrayAdapter extends ArrayAdapter<Article> {

    ArrayList<Article> articles;
    ImageView ivThumbnail;
    TextView tvTitle;

    public ArticleArrayAdapter(Context context, ArrayList<Article> articles) {
        super(context, android.R.layout.simple_list_item_1, articles);
        this.articles = articles;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        // Get data for position
        Article article = articles.get(position);

        // Get recycled view OR inflate new view
        if (convertView == null) {
            LayoutInflater layoutInflater = LayoutInflater.from(getContext());
            convertView = layoutInflater.inflate(R.layout.item_article_result, parent, false);
        }

        // Set text
        tvTitle = (TextView) convertView.findViewById(R.id.tvTitle);
        tvTitle.setText(article.getHeadline());


        // Get image reference
        ivThumbnail = (ImageView) convertView.findViewById(R.id.ivThumbnail);
        ivThumbnail.setImageResource(0);

        // Set image to new data
        if (!TextUtils.isEmpty(article.getThumbnail())) {
            Picasso.with(getContext()).load(article.getThumbnail())
                    .into(ivThumbnail);
        }

        return convertView;
    }
}
