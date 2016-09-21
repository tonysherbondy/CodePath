## Notes
* The ```ArticleItem``` has a known width and unknown height, therefore cannot set ```Image``` component to
grow proportional to the image size in order to display the image, without inspecting the image data to see
what the pixel ratio is.
* Need to use ```elevation``` property for shadows on Android.
* To make a grid layout from our ```ListView``` we need to do some math on the ```onLayout``` handler, doesn't seem like there is a standard bearer third party component yet.
