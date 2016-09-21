## Notes
* The ```ArticleItem``` has a known width and unknown height, therefore cannot set ```Image``` component to
grow proportional to the image size in order to display the image, without inspecting the image data to see
what the pixel ratio is.
* Need to use ```elevation``` property for shadows on Android.
