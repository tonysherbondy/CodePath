## Notes
* The ```ArticleItem``` has a known width and unknown height, therefore cannot set ```Image``` component to
grow proportional to the image size in order to display the image, without inspecting the image data to see
what the pixel ratio is.
* Need to use ```elevation``` property for shadows on Android.
* To make a grid layout from our ```ListView``` we need to do some math on the ```onLayout``` handler, doesn't seem like there is a standard bearer third party component yet.
* Seems like the recommended way (*only way*) to set certain styles, e.g., toolbar action text color, is to use static XML properties for android.
* When designing UX for cross-platform, seems like a decision needs to be made to support one transition flow between scenes. For example, iOS might be more common to slide from right a transition to article, where as in Android seems like more common is the slide from bottom activity replacement. This choice also controls where the toolbar lives. Live in the slide right example you probably want the toolbar to stay fixed in place and just animate property differences, whereas, with the Android slide from bottom, the new toolbar usually comes with the new activity screen.
