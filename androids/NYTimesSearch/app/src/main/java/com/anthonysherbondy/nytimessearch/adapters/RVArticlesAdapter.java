package com.anthonysherbondy.nytimessearch.adapters;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.text.TextUtils;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.anthonysherbondy.nytimessearch.R;
import com.anthonysherbondy.nytimessearch.models.Article;
import com.squareup.picasso.Picasso;

import java.util.List;

/**
 * Created by anthonysherbondy on 9/19/16.
 */
public class RVArticlesAdapter extends RecyclerView.Adapter<RVArticlesAdapter.ViewHolder> {

    private List<Article> mArticles;
    private Context mContext;

    public RVArticlesAdapter(Context context, List<Article> articles) {
        mArticles = articles;
        mContext = context;
    }

    private Context getContext() {
        return mContext;
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {
        public TextView tvTitle;
        public ImageView ivThumbnail;
        public ViewHolder(View view) {
            super(view);
            tvTitle = (TextView) view.findViewById(R.id.tvTitle);
            ivThumbnail = (ImageView) view.findViewById(R.id.ivThumbnail);
        }

    }

    @Override
    public RVArticlesAdapter.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        Context context = parent.getContext();
        LayoutInflater inflater = LayoutInflater.from(context);

        // Inflate the custom layout
        View articleView = inflater.inflate(R.layout.item_article_result, parent, false);

        // Return a new holder instance
        ViewHolder viewHolder = new ViewHolder(articleView);
        return viewHolder;
    }

    @Override
    public void onBindViewHolder(ViewHolder holder, int position) {
        Article article = mArticles.get(position);
        holder.tvTitle.setText(article.getHeadline());
        holder.ivThumbnail.setImageResource(0);
        if (!TextUtils.isEmpty(article.getThumbnail())) {
            Picasso.with(getContext()).load(article.getThumbnail())
                    .into(holder.ivThumbnail);
        }

    }

    @Override
    public int getItemCount() {
        return mArticles.size();
    }
}
