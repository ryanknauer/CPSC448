# Reading #1

My first reading was ["A Brief Review of Facial Emotion Recognition Based on Visual Information'](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5856145/pdf/sensors-18-00401.pdf), which provides an overview of the different high level steps involved in Emotion Recognition. 

The article outlines two main methods for Facial Emotion Recognition(FER). The original method was broken down into many steps: 

1. Face detection - locating a face in an image allowing for only important data to be used in following steps
2. Landmark Detection - locating potential features (e.g. SIFT) not yet specific to facial features; used for #1 as well
3. Feature Extraction - locating features such as noses, eyes by clustering Landmarks from step #2
4. Facial Expression Classification - Making a Facial Expression Classification based on features from #3


The second and newer method utilizes Deep Learning and Neural Networks with very effective results. This method allows for less dependence on "face-physics based models", which I believe indicates identifying a relationship between emotions and the movement of the significant high level facial structures. This highlights one of the high level benefits of deep learning, which can capture these high level abstractions(s.a. facial structures) automatically. 



### Sequencing

This paper also classifies two seperate FER problems split between static and video input. This indicates methods that would be useful for interpreting based not just on a current frame, but previous frames as well - a method that would be very useful to explore for the Youtube Recognition Project.  

The paper outlines a number of different attempts for using both of LSTMs and RNNs(discussed further in reading #3), all of which seemed to have favorable results. The majority of these actually used a CNN in conjunction with the sequencing models in order to first gather higher level observations from the image, which were then used as inputs to the RNN/LSTM. One of these studies also discovered the impact that a bidirectional sequencing model had over a unidirectional one(e.g. looking at frames both before and after the current one). This would be trickier in real time as we would need to constantly buffer ahead in the video, however it is an interesting route to observe in the future especially if a preprocessing method was implemented over real-time. 

### Video Feature Extraction

For training on video sequences, the paper outlines a method of feature extraction using displacement between matching features in sequential frames as an additional dynamic feature. The issue that this method would present in the Youtube Extension Project is that the frame rate being captured is very limited and unpredictable depending on the local computer's specs. These sequential video models would be trained with a specific(and very high)  framerate in mind, likely causing all sorts of problems attempting to make predictions with inconsistent, and much larger gaps between frames. This leads me to believe that continuing on the path of smoothing over static image models, e.g. using [Markov Models](https://github.com/ryanknauer/CPSC448/blob/master/YoutubeExtension/Markov.md), may be the most effective approach for this project unless a preprocessing/buffering system is implemented as discussed in [Further Explorations](https://github.com/ryanknauer/CPSC448/blob/master/NextSteps.md#explorations). 




