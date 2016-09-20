package com.anthonysherbondy.nytimessearch.fragments;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.DialogFragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.Spinner;
import android.widget.TextView;

import com.anthonysherbondy.nytimessearch.R;
import com.anthonysherbondy.nytimessearch.models.QueryFilter;

/**
 * Created by anthonysherbondy on 9/19/16.
 */
public class SettingsFragment extends DialogFragment {
    private QueryFilter filter;
    private TextView tvBeginDate;
    private Spinner spSortOrder;
    private CheckBox cbArts;
    private CheckBox cbFashion;
    private CheckBox cbSports;

    public SettingsFragment() {
    }

    public static SettingsFragment newInstance(QueryFilter filter) {
        SettingsFragment fragment = new SettingsFragment();
        Bundle args = new Bundle();
        args.putSerializable("filter", filter);
        fragment.setArguments(args);
        return fragment;
    }

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_settings, container);
    }

    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        filter = (QueryFilter) getArguments().getSerializable("filter");

        tvBeginDate = (TextView) view.findViewById(R.id.tvBeginDate);
        tvBeginDate.setText(filter.getBeginDateString());
        cbArts = (CheckBox) view.findViewById(R.id.cbArts);
        cbArts.setChecked(filter.getNdArts());
        cbFashion = (CheckBox) view.findViewById(R.id.cbFashion);
        cbFashion.setChecked(filter.getNdFashion());
        cbSports = (CheckBox) view.findViewById(R.id.cbSports);
        cbSports.setChecked(filter.getNdSports());
        spSortOrder = (Spinner) view.findViewById(R.id.spSortOrder);
        spSortOrder.setSelection(filter.getSortOrder());

        Button btn = (Button) view.findViewById(R.id.btnSave);
        btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Log.d("DEBUG", "onClick: hello");
            }
        });
    }
}
