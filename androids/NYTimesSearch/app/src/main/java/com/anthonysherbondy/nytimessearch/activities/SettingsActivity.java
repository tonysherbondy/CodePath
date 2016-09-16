package com.anthonysherbondy.nytimessearch.activities;

import android.app.DatePickerDialog;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.CheckBox;
import android.widget.DatePicker;
import android.widget.Spinner;
import android.widget.TextView;

import com.anthonysherbondy.nytimessearch.R;
import com.anthonysherbondy.nytimessearch.models.QueryFilter;

import java.util.Calendar;

public class SettingsActivity extends AppCompatActivity implements DatePickerDialog.OnDateSetListener {

    TextView tvBeginDate;
    Spinner spSortOrder;
    CheckBox cbArts;
    CheckBox cbFashion;
    CheckBox cbSports;
    QueryFilter filter;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_settings);
        filter = (QueryFilter) getIntent().getExtras().getSerializable("queryFilter");

        tvBeginDate = (TextView) findViewById(R.id.tvBeginDate);
        tvBeginDate.setText(filter.getBeginDateString());
        cbArts = (CheckBox) findViewById(R.id.cbArts);
        cbArts.setChecked(filter.getNdArts());
        cbFashion = (CheckBox) findViewById(R.id.cbFashion);
        cbFashion.setChecked(filter.getNdFashion());
        cbSports = (CheckBox) findViewById(R.id.cbSports);
        cbSports.setChecked(filter.getNdSports());
        spSortOrder = (Spinner) findViewById(R.id.spSortOrder);
        spSortOrder.setSelection(filter.getSortOrder());
    }

    public void onEditBeginDate(View view) {
        DatePickerFragment newFragment = new DatePickerFragment();
        newFragment.setCalendar(filter.getBeginDate());
        newFragment.show(getSupportFragmentManager(), "datePicker");
    }

    public void onSave(View view) {
        // Get sortOrder
        int sortOrder = spSortOrder.getSelectedItemPosition();
        Intent data = new Intent();
        // Pass relevant data back as a result
        QueryFilter queryFilter = new QueryFilter(sortOrder, filter.getBeginDate(), cbArts.isChecked(), cbFashion.isChecked(), cbSports.isChecked());
        data.putExtra("queryFilter", queryFilter);
        // Activity finished ok, return the data
        setResult(RESULT_OK, data);
        finish();
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
