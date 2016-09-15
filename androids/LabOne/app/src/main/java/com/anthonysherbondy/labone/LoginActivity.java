package com.anthonysherbondy.labone;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Toast;

public class LoginActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
    }

    public void onCancel(View view) {
        Toast.makeText(this, getResources().getString(R.string.cancel_text), Toast.LENGTH_SHORT).show();
    }

    public void onLogin(View view) {
        Toast.makeText(this, getResources().getString(R.string.login_text), Toast.LENGTH_SHORT).show();
    }

    public void onForgot(View view) {
        Toast.makeText(this, getResources().getString(R.string.forgot_password), Toast.LENGTH_SHORT).show();
    }
}
