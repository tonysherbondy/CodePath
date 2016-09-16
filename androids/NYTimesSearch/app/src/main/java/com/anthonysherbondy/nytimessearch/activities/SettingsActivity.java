package com.anthonysherbondy.nytimessearch.activities;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.Toast;

import com.anthonysherbondy.nytimessearch.R;
import com.anthonysherbondy.nytimessearch.models.QueryFilter;

import java.util.Date;

public class SettingsActivity extends AppCompatActivity {

    EditText etBeginDate;
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

        etBeginDate = (EditText) findViewById(R.id.etBeginDate);
        etBeginDate.setEnabled(false);
        Date beginDate = filter.getBeginDate();
        if (beginDate != null) {
            etBeginDate.setText(beginDate.toString());
        }
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
        Toast.makeText(this, "Date picker", Toast.LENGTH_SHORT).show();
    }

    public void onSave(View view) {
        // Get date
        // Get sortOrder
        int sortOrder = spSortOrder.getSelectedItemPosition();
        Intent data = new Intent();
        // Pass relevant data back as a result
        QueryFilter queryFilter = new QueryFilter(sortOrder, null, cbArts.isChecked(), cbFashion.isChecked(), cbSports.isChecked());
        data.putExtra("queryFilter", queryFilter);
        // Activity finished ok, return the data
        setResult(RESULT_OK, data);
        finish();
    }
}
