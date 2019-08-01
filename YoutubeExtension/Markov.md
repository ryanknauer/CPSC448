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

1. The nuetral expression is very overpowering. This would likely need to be treated with a different set of rules compared to other emotions.
2. Due to performance issues not every frame is being captured. This will provide vastly different results depending on the computer and video. 

#### Next Steps
My next step will be to try using a hidden Markov Model, as our previous state is actually a set of probabilities not just a single correct emotion. This will help when our previous state is not 'certain' on the best emotion and overinfluencing the following states. 


## Hidden Markov Models
In order to utilize more than just the previous frame using a Hidden Markov Model would likely be much more effective. We can model our our hidden state as seen below where Emotional State is the actual emotional state shown in the video, our Observation is the representing the value observed for that frame, and each t represents and individual frame. 

!!! Insert Image


#### Transition Model

Our transition Model will represent the probability of transitioning from one state to another(including staying in the same state). This can be modeled as a Square Matrix where an index i,j represents the probability of moving from state i to state j. Because the initial goal is to smooth over sporadic jumps between emotional states I will start with an abritrarily high weight for each diagnoal representing remaining in the same state. 


#### Observation Model


The observation model describes that if we know the current state of an individual frame, what is the probability of the CNN model to predict each state. Again this can be represented as Square Matrix with a value X at index i,j that in the given state i, state j has an X probability of being observed. 

#### Single Valued Observation

Most common HMM assume a single valued observation represting the exact state observed. So, even though our CNN observation provides a probablistic observation for each state, we will start by providing only the highest probable state as the single observed state. Of course this looses any differentiation between more or less confident guesses by the CNN observation model.  

#### Vectorized Observation

In order to incorperate the probabilstic observation returned by the CNN recognition model we need to tweak the update step to accomadate this change. 

Our update step consists of the following:  


$$
\sum_{x_t}a_t(x_t)p(x_{t+1}|x_t)p(z_{t+1}|x_{t+1})
$$
Where $$a_t(x_t)$$ = recursive step; $$p(x_{t+1}|x_t)$$ = transition step;  $$p(z_{t+1}|x_{t+1})$$ = observation step

For the observation step, with a single value $$z_{t+1}$$ this would normally just be an index into our observation model. 

For example if the observation model gives us : $$ P(Z_t=z | X_t = x)  = \begin{bmatrix} 
0.3 & 0.4 & 0.3 \\
0.2 & 0.3 & 0.5 \\
0.3 & 0.4 & 0.3 
\end{bmatrix}
\quad$$at index z,x



So if $$z_t = 1, x_t=2$$  $$ P(z_t=1| x_t = 2) = 0.5 $$ 

If instead $$z_t$$ is a multi-dimensional vector representing the observed probability of each emotional state. We could then represent  $$ P(z_t| x_t)  $$ as weighted combination of each possible state given by:
$$
\sum_z Z_{t,z}*P(Z_t=z | X_t = x)
$$
which is equivlent to taking the dot product of $$ Z_t$$ and  $$P(Z_t=z | X_t = x)$$

## HMM


#### Vectorizing Observations

    