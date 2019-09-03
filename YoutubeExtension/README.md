# Chrome Extension Using Open Source Frameworks:

For the first portion of this project, I created a demo Chrome Extension that recognizes a face in a Youtube video and overlays an emoji indicating the emotion of the face. This iteration utilizes two open source frameworks for Facial and Emotion recognition, [Face-API.js](https://github.com/justadudewhohacks/face-api.js?files=1) and [FrontEnd-EmotionDetection](https://github.com/kevinisbest/FrontEnd-EmotionDetection) respectively. A video demo can be seen [here](https://github.com/ryanknauer/CPSC448/blob/master/Images/Emotion%20Recognition%20Demo.mov) and instructions for downloading the extension are [here](https://github.com/ryanknauer/CPSC448#chrome-extension-demo).

## Demo

1. Download or Fork this repo. 
2. Go to [chrome://extensions](chrome://extensions) in chrome.
3. Turn on developer mode in the top right corner.
4. Click "load unpacked" 
5. Open the "YoutubeExtension" file from this repo
6. Go to any Youtube Video and click the 'Watch With Me' button in the bottom right of the video player.
Note: You may need to refresh the page once for the button to appear


## Progress

### 1. Setting Up Chrome Extension

The first task was setting up the Chrome Extension to allow for content script injections. This allows the extension to interact with the web page anytime a Youtube Video is loaded. From here I injected a button into the Youtube Player that would indicate when to start looking for emotions in the video as seen below:

![](https://github.com/ryanknauer/CPSC448/blob/master/Images/Screen%20Shot%202019-05-14%20at%2010.53.27%20AM.png)


### 2. Capturing Frames

The next step was to explore frame grabbing from a Youtube video. At first I thought this would need to be done using an api such as [TabCapture](https://developers.chrome.com/extensions/tabCapture), which was proving to be slow and require a low rate of frames to be processed. After some more research, I discovered that the frames could be captured directly from the HTML Video element by drawing each frame onto a seperate canvas element. 


### 3. Face Recognition

With access to the video frames, the next step is to locate a Face in each frame. As there are many open source packages available in Python, I first looked into [NativeMessaging](https://developer.chrome.com/apps/nativeMessaging) which would allow the chrome extension to commmunicate directly with a local python application doing the image processing. The downside of this would be an additional required app to be downloaded by the end user. In the end, I was able to find [FaceApi.js](https://github.com/justadudewhohacks/face-api.js?files=1) which ended up being a fairly thorough implementation that didn't require too much implementation overhead. One substational problem I noticed right off the bat was the low frame rate of many of the models available, with only one that seemed to work well enough for real-time video recognition called [TinyFaceDetector](https://github.com/justadudewhohacks/face-api.js?files=1#tiny-face-detector). This effeciency is one area I would like to explore further as I start to research the recongition models more. 


### 4. Emotion Recognition

With the face detection giving a bounding box for the face itself, I was able to grab the image of the face alone in order to perform an [Emotion Recognition function](https://github.com/ryanknauer/CPSC448/blob/6d8590f970eb55345c6eb4c7e3eb5426009df0e5/YoutubeExtension/recognition.js#L66) . While there was much less sources for Emotion Recognition, I found another open source project called [FrontEnd-EmotionDetection](https://github.com/kevinisbest/FrontEnd-EmotionDetection) with a pre-trained model for TensorFlow.js. Once the emotion detection was working, I then added an overlay of an emoji in the top left corner indicating the emotion of the recognized face as seen below:

![](https://github.com/ryanknauer/CPSC448/blob/master/Images/Screen%20Shot%202019-05-27%20at%205.26.56%20PM.png)

One of the limitations of the Chrome Extension system is that all application files are stored in a seperate context than that of the actual web page. This is a problem because every time a page our extension is run on a youtube video, it needs to pull the FER model from the application context into the actual webpage. A potential solution for this would be to send the image to the app context to apply the emotion recognition weights, then send the returned prediction back to the webpage. 

### 5. Tuning

Tuning will be an ongoing process for this project and one that I will look to explore in my readings. One very big issue with the inital implementation was the model jumping between emotions on non-discernible faces, which is very common in a normal youtube video. As an initial step to help lower the overwhelming nuber of false negatives I implemented a fairly simple [thresholding method](https://github.com/ryanknauer/CPSC448/blob/6d8590f970eb55345c6eb4c7e3eb5426009df0e5/YoutubeExtension/recognition.js#L93). Because the model returns percentages for each possible emotion, I created a minimum threshold for any non-nuetral emotion. This causes only strong deviations from nuetral to be picked up, which helped slightly with the staggering predictions on nuetral faces. 

The next large portion of the project involves further tuning this model by integrating Markov Models. To keep clutter down I have seperated that to a seperate markdown file [here](https://github.com/ryanknauer/CPSC448/blob/master/YoutubeExtension/Markov.md#markov-chains-for-video-smoothing). 
