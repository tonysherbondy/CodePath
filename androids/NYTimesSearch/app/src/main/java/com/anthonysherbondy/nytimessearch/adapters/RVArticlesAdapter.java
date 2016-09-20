package com.anthonysherbondy.nytimessearch.adapters;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.text.TextUtils;
import android.util.Log;
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
public class RVArticlesAdapter extends RecyclerView.Adapter<RecyclerView.ViewHolder> {

    private List<Article> mArticles;
    private Context mContext;
    private final int NORMAL = 0, TEXT_ONLY = 1;

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

    public static class ViewHolderTextOnly extends RecyclerView.ViewHolder {
        public TextView tvTitle;
        public ViewHolderTextOnly(View view) {
            super(view);
            tvTitle = (TextView) view.findViewById(R.id.tvTitle);
        }

    }

    @Override
    public int getItemViewType(int position) {
        Article article = mArticles.get(position);
        if (TextUtils.isEmpty(article.getThumbnail())) {
            return TEXT_ONLY;
        }
        return NORMAL;
    }

    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        Context context = parent.getContext();
        LayoutInflater inflater = LayoutInflater.from(context);

        RecyclerView.ViewHolder viewHolder;
        View articleView;
        switch (viewType) {
            case NORMAL:
                articleView = inflater.inflate(R.layout.item_article_result, parent, false);
                viewHolder = new ViewHolder(articleView);
                break;
            case TEXT_ONLY:
                articleView = inflater.inflate(R.layout.item_article_result_textonly, parent, false);
                viewHolder = new ViewHolderTextOnly(articleView);
                break;
            default:
                articleView = inflater.inflate(R.layout.item_article_result_textonly, parent, false);
                viewHolder = new ViewHolderTextOnly(articleView);
                Log.d("DEBUG", "Unknown type");
                break;
        }
        return viewHolder;
    }

    @Override
    public void onBindViewHolder(RecyclerView.ViewHolder holder, int position) {
        Article article = mArticles.get(position);
        switch (getItemViewType(position)) {
            case NORMAL:
                ViewHolder viewHolder = (ViewHolder) holder;
                viewHolder.tvTitle.setText(article.getHeadline());
                viewHolder.ivThumbnail.setImageResource(0);
                if (!TextUtils.isEmpty(article.getThumbnail())) {
                    Picasso.with(getContext())
                            .load(article.getThumbnail())
                            .into(viewHolder.ivThumbnail);
                }
                break;
            case TEXT_ONLY:
                ViewHolderTextOnly viewHolderTextOnly = (ViewHolderTextOnly) holder;
                viewHolderTextOnly.tvTitle.setText(article.getHeadline());
                break;
            default:
                Log.d("DEBUG", "Can't bind unknown type");
                break;
        }
    }

    @Override
    public int getItemCount() {
        return mArticles.size();
    }
}
