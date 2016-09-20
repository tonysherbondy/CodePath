## Notes
* Setting ```width``` and ```height``` explicitly to ```null``` to force the ```Image``` component to grow with flex. I believe this is a bug that has already been merged to master and should deploy with 0.34.
* Using ```colorControlNormal``` in android theme file in order to control EditText view parameters. Seems non-ideal as we have style values placed in android xml files as well as our js ecosystem.
* Used theme files for StatusBar coloring rather than StatusBar component, although maybe that should change to match iOS.
* Need to use ```elevation``` property for shadows on Android.
* TextInput for iOS needs ```height``` set.
