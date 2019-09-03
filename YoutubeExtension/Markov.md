# Markov Chains for Video Smoothing

One large issue identified with the first iteration of the recognition application was the choppiness of false-positive in a video. This is because we were checking each still image seperately with no context for the previous frames. This would result in constant flashings of incorrect emotions which would be fairly detrimental to the experience for an end user. To solve this, we want to incorperate information from previous frames into our emotion prediction model. For example, if we see 10 frames heavily predicted to be a sad face followed by a single frame predicted to be happy, we most likely don't want our model to be predicting happy until we have seen more consistent happy predictions in a row. One idea mentioned in my [first reading](https://github.com/ryanknauer/CPSC448/blob/master/Readings1.md) is the use of RNNs and LSTMs, which I explore in more depth during my [third reading](https://github.com/ryanknauer/CPSC448/blob/master/Readings3.md). These models can be extremely complexand would require a large overhead both in knowledge and development. A great idea Steve came up with was to utilize markov models and incorperate them with our CNN acting as an observation sensor as I will outline in this document. Markov Models have a much lower overhead while still encompassing the same ideas of RNN + LSTMs on a much smaller scale.  

## Moarkov Model Diagram

Below is an example diagram of a simple markov model consisting of 3 emotional states. Each arrow would represent a corresponding weight providing the probability of transitioning from that state to the next one. 

![](https://github.com/ryanknauer/CPSC448/blob/master/Images/Markov_Model_1.png?raw=true)


## First Attempt

For the first attempt, I want to try using a binary transition model, which only indicates if the emotion stays the same or not. While their are likely different probabilities of moving from say happy -> nuetral vs happy -> sad, these should be very small relative to staying in the same state(e.g. happy -> happy) from frame to frame. To do this I created a transition array with each index correlating to an emotion, and each value indicating a weight. I then set the value of the previous emotion state to a preselected weight. Finally, performing an element-wise array multiplication with the predicted emotion values of the current frame(held in a tensor 'z'):  

```
let transition = [1,1,1,1,1,1,1]
transition[most_recent_emotion] = markovWeight
return z.mul(transition)
```

In order to easily compare and test different weighting values, I also implemented a URL-parameter grabber to allow for these values to be set without reloading the extension. These can be set via url parameters such as:

```https://www.youtube.com/watch?v=qTLrjhReNtg&markovWeight=9&useMarkov=1```

## Results

#### Original w/o markov chain
![](https://github.com/ryanknauer/CPSC448/blob/master/Images/without_markov.gif)
#### Using markov chain w/ markovWeight 9 (normalized to 0.6 for same state and 0.066 for all other transitions)
![](https://github.com/ryanknauer/CPSC448/blob/master/Images/with_markov.gif)

As you can see above, this did a successful job smoothing over quick jumps in emotions, however this comes with a bad tradeoff seen below. 


#### Original w/o markov chain
![](https://github.com/ryanknauer/CPSC448/blob/master/Images/suprise_wo_markov.gif)
#### Using markov chain w/ markovWeight 9 (normalized to 0.6 for same state and 0.066 for all other transitions)
![](https://github.com/ryanknauer/CPSC448/blob/master/Images/suprise_w_markov.gif)

I've found it very difficult testing different weights for 2 reasons. 

1. The neutral expression is very overpowering. This would likely need to be treated with a different set of rules compared to other emotions.
2. Due to performance issues not every frame is being captured. This will provide vastly different results depending on the computer and video. 

#### Next Steps
My next step will be to try using a hidden Markov Model, as our previous state is actually a set of probabilities not just a single correct emotion. This will help when our previous state is not 'certain' on the best emotion and overinfluencing the following states. 


## Hidden Markov Models
In order to utilize more than just the previous frame using a Hidden Markov Model would likely be much more effective. We can model our our hidden state as seen below where Emotional State is the actual emotional state shown in the video, our Observation is the representing the value observed for that frame, and each t represents and individual frame. 

![](https://github.com/ryanknauer/CPSC448/blob/master/Images/HMM_Diagram_1.png?raw=true)

#### Transition Model

Our transition Model will represent the probability of transitioning from one state to another(including staying in the same state). This can be modeled as a Square Matrix where an index i,j represents the probability of moving from state i to state j. Because the initial goal is to smooth over sporadic jumps between emotional states I will start with an abritrarily high weight for each diagnoal representing remaining in the same state. 


#### Observation Model


The observation model describes that if we know the current state of an individual frame, what is the probability of the CNN model to predict each state. Again this can be represented as Square Matrix with a value X at index i,j that in the given state i, state j has an X probability of being observed. 

#### Single Valued Observation

Most common HMM assume a single valued observation representing the exact state observed. So, even though our CNN observation provides a probabilistic observation for each state, we will start by providing only the highest probable state as the single observed state. Of course this looses any differentiation between more or less confident guesses by the CNN observation model.  

#### Vectorized Observation

LaTeX Doesn't Display In Markdown so this is in a seperate file [here](https://github.com/ryanknauer/CPSC448/blob/master/HMM.ipynb)


#### Results

Below I have added a side by side comparison between our original CNN model(Right) and the updated HMM model using vectorized observations(right):

![](https://github.com/ryanknauer/CPSC448/blob/master/Images/grant_side_by_side.gif)

As you can see, the original model flashes between many different emotional states very quickly due to weaknesses in the observation model and a lack of context from previous frames. By adding in a HMM that preserves information from previous frames we get a much smoother transition between emotional states. 


### Resources

#### CPSC 322 + 422
CPSC 422 helped lay the groundwork for understanding these models and algorithms, especially when dealing with filtering HMMs. While it had been a long time since taking these courses, and I needed to refresh my understanding using tools listed below - the deeper underlying concepts came back to me much quicker this time around. When taking 422 one of the biggest challenges I faced was mapping the model's usecases to real world problems. This project did a fantastic job showing me exactly that.


#### Bert Huang - Virginia Tech HMM lecture
https://www.youtube.com/watch?v=9yl4XGp5OEg
While the more conceptual aspects of HMM's came back to me fairly quickly from 422, I definitely struggled more with the math side of implementing filtering. This lecture had the most concise explanation and visuals describing the math needed to implement filtering, which helped lead me to the end result. 



