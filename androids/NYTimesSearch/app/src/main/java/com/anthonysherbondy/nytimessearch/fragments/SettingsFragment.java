package com.anthonysherbondy.nytimessearch.fragments;

import android.app.DatePickerDialog;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.DialogFragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.DatePicker;
import android.widget.Spinner;
import android.widget.TextView;

import com.anthonysherbondy.nytimessearch.R;
import com.anthonysherbondy.nytimessearch.activities.DatePickerFragment;
import com.anthonysherbondy.nytimessearch.models.QueryFilter;

import java.util.Calendar;

public class SettingsFragment extends DialogFragment implements DatePickerDialog.OnDateSetListener {

    public interface OnSettingsSaveListener {
        void onSettingsSave(QueryFilter filter);

    }
    private QueryFilter filter;
    private TextView tvBeginDate;
    Spinner spSortOrder;
    CheckBox cbArts;
    CheckBox cbFashion;
    CheckBox cbSports;

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
        if (filter != null) {
            tvBeginDate = (TextView) view.findViewById(R.id.tvBeginDate);
            tvBeginDate.setText(filter.getBeginDateString());
            tvBeginDate.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    DatePickerFragment newFragment = new DatePickerFragment();
                    newFragment.setTargetFragment(SettingsFragment.this, 300);
                    newFragment.setCalendar(filter.getBeginDate());
                    newFragment.show(getFragmentManager(), "datePicker");
                }
            });
            cbArts = (CheckBox) view.findViewById(R.id.cbArts);
            cbArts.setChecked(filter.getNdArts());
            cbFashion = (CheckBox) view.findViewById(R.id.cbFashion);
            cbFashion.setChecked(filter.getNdFashion());
            cbSports = (CheckBox) view.findViewById(R.id.cbSports);
            cbSports.setChecked(filter.getNdSports());
            spSortOrder = (Spinner) view.findViewById(R.id.spSortOrder);
            spSortOrder.setSelection(filter.getSortOrder());
        }

        Button btn = (Button) view.findViewById(R.id.btnSave);
        btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                int sortOrder = spSortOrder.getSelectedItemPosition();
                QueryFilter newFilter = new QueryFilter(sortOrder, filter.getBeginDate(), cbArts.isChecked(), cbFashion.isChecked(), cbSports.isChecked());
                OnSettingsSaveListener listener = (OnSettingsSaveListener) getActivity();
                listener.onSettingsSave(newFilter);
                dismiss();
            }
        });
    }

    @Override
    public void onDateSet(DatePicker datePicker, int year, int monthOfYear, int dayOfMonth) {
        // store the values selected into a Calendar instance
        Calendar c = Calendar.getInstance();
        c.set(Calendar.YEAR, year);
        c.set(Calendar.MONTH, monthOfYear);
        c.set(Calendar.DAY_OF_MONTH, dayOfMonth);
        filter.setBeginDate(c);
        tvBeginDate.setText(filter.getBeginDateString());
    }
}
