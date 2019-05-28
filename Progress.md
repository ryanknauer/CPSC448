# Weeks 1-3:

Through weeks 1-3 I created a demo Chrome Extension that recognizes a face in a Youtube video and overlays an emoji indicating the emotion of the face. This iteration utilizes two open source frameworks for Facial and Emotion recognition, [Face-API.js](https://github.com/justadudewhohacks/face-api.js?files=1) and [FrontEnd-EmotionDetection](https://github.com/kevinisbest/FrontEnd-EmotionDetection) respectively. 

## Setting Up Chrome Extension

The first week consisted namely of setting up the Chrome Extension to allow for content script injections. This allows the extension to interact with the web page anytime a Youtube Video is loaded. From here I injected a button into the Youtube Player that would indicate whent to start looking for emotions in the video as seen below:

![](https://github.com/ryanknauer/CPSC448/blob/master/Images/Screen%20Shot%202019-05-14%20at%2010.53.27%20AM.png)


## Capturing Frames

The next step was to explore frame grabbing from a Youtube video. At first I thought this would need to be done using an api such as [TabCapture](https://developers.chrome.com/extensions/tabCapture), which was proving to be slow and require a low rate of frames to be processed. After some more research, I discovered that the frames could be captured directly from the HTML Video element by drawing each frame onto a seperate canvas element. 


## Face Recognition

With access to the video frames, the next step is to locate a Face in each frame. As there are many open source packages available in Python, I first looked into [NativeMessaging](https://developer.chrome.com/apps/nativeMessaging) which would allow the chrome extension to commmunicate directly with a local python application doing the image processing. The downside of this would be an additional required app to be downloaded by the end user. In the end, I was able to find [FaceApi.js](https://github.com/justadudewhohacks/face-api.js?files=1) which ended up being a fairly thorough implementation that didn't require too much implementation overhead. One substational problem I noticed right off the bat was the low frame rate of many of the models available, with only one that seemed to work well enough for video recognition called [TinyFaceDetector](https://github.com/justadudewhohacks/face-api.js?files=1#tiny-face-detector). 
