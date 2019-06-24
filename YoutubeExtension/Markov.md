# Markov Chains for Video Smoothing

One large issue identified with the first iteration of the recognition application was the choppiness of false-positive in a video. This is because we were checking each still image seperately with no context for the previous frames. This would result in constant flashings of incorrect emotions which would be fairly detrimental to the experience for an end user. As a quicker fix without diving into more complex recogition models such as LSTM's, I first will try using a Markov Chain in conjunction with the individual image recognitions. 


## First Attempt

For the first attempt, I want to try using a binary transition model, which only indicates if the emotion stays the same or not. While their are likely different probabilities of moving from say happy -> nuetral vs happy -> sad, these should be very small relative to staying in the same state(e.g. happy -> happy) from frame to frame. To do this I created a transition array with each index correlating to an emotion, and each value indicating a weight. I then set the value of the previous emotion state to a pre-selected weight. Finally, performing an element-wise array multiplication with the predicted emotion values of the current frame(held in a tensor 'z'):  

```
let transition = [1,1,1,1,1,1,1]
transition[most_recent_emotion] = markovWeight
return z.mul(transition)
```

In order to easily compare and test different weighting values, I also implemented a URL-paramater grabber to allow for these values to be set without reloading the extension. These can be set via url parameters such as:

```https://www.youtube.com/watch?v=qTLrjhReNtg&markovWeight=9&useMarkov=1```

## Results

