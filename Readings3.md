# Readings 3

## Materials
[Brandon Rohrer - "Recurrent Neural Networks (RNN) and Long Short-Term Memory (LSTM)"](https://www.youtube.com/watch?v=WCUNPb-5EYI&t=713s)
This video gives a high level overview of both RNNs and LSTMs. I felt this did a great job of covering the intuition behind why RNN and LSTMs are useful which I find to be a large learning barrier with many of this more dense conceptual models. 

## Recurrent Nueral Networks
Interestingly enough, the application phase of this project using [Markov Models](https://github.com/ryanknauer/CPSC448/blob/master/YoutubeExtension/Markov.md) really helped my transition into understanding the high level behind RNN and LSTM as these solve the same problem we were trying to solve using Markov Models. A RNN is a Nueral Network that feeds in the prediction of the previous state as inputs into the Nueral Network. This is similar to our use of HMM using a transition probability from a previous state to the next one. The weakness of this, is that the context does not maintain predictions more than one step back. This becomes a problem in something like language translation, where words can be heavily reliant on one another even if they are spaced multiple words apart. 


## Long Short Term Memory


## Application to Miigo
For our application, RNNs might actually be a better fit than LSTM models as the biggest challenge we face is smoothing over jumps in emotions. Generally, emotions will not have very complex patterns over time like that of speach or writing. After further researching these models, I also believe that our implementation (or at least direction of implementation) of Markov Models was a very viable solution for the problem we faced. One of the biggest reasons for this is the unpredictablitiy of computing time leading to dropped frames. Since we are running the predictions in real time, we often drop dozens of frames based on computing power. Since an RNN would be trained based off a linear sequence of constant time intervals, these dropped frames would add an additional layer of complexity. With that said, it seems that RNN would still be able to handle this by recursively predicting each of the dropped frames before predicting the current one. Unfortunately this would then likely add an even larger time burder. 

