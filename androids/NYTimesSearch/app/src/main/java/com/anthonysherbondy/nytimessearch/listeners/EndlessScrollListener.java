package com.anthonysherbondy.nytimessearch.listeners;

import android.widget.AbsListView;

/**
 * Created by anthonysherbondy on 9/17/16.
 */
public abstract class EndlessScrollListener implements AbsListView.OnScrollListener {
    // Number of visible items before we fetch more
    private int visibleThreshold = 5;
    // Offset index for data api that we have already loaded
    private int currentPage = 0;
    // Total number of items after the last load
    private int previousTotalItemCount = 0;
    // True if we are still waiting for the last data fetch to load
    private boolean loading = false;
    private int startingPageIndex = 0;

    public EndlessScrollListener() {
    }

    public EndlessScrollListener(int visibleThreshold) {
        this.visibleThreshold = visibleThreshold;
    }

    public EndlessScrollListener(int visibleThreshold, int startPage) {
        this.visibleThreshold = visibleThreshold;
        this.startingPageIndex = startPage;
        this.currentPage = startPage;
    }

    // Returns true if more data is being loaded; returns false if there is no more data to load.
    public abstract boolean onLoadMore(int page, int totalItemsCount);

    @Override
    public void onScroll(AbsListView view, int firstVisibleItem, int visibleItemCount, int totalItemCount) {
        // If the total item count is zero and the previous isn't, assume the
        // list is invalidated and should be reset back to initial state
        if (totalItemCount < previousTotalItemCount) {
            currentPage = startingPageIndex;
            previousTotalItemCount = totalItemCount;
            if (totalItemCount == 0) { loading = true; }
        }
        // If it's still loading, we check to see if the dataset count has
        // changed, if so we conclude it has finished loading and update the current page
        // number and total item count.
        if (loading && (previousTotalItemCount < totalItemCount)) {
            loading = false;
            previousTotalItemCount = totalItemCount;
            currentPage++;
        }

        // If we are not currently loading and visible threshold passed, fetch more
        if (!loading && (firstVisibleItem + visibleItemCount + visibleThreshold >= totalItemCount)) {
            loading = onLoadMore(currentPage + 1, totalItemCount);
        }
    }

    @Override
    public void onScrollStateChanged(AbsListView absListView, int i) {
        // Nothing to do here
    }
}
