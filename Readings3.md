# Readings 3


## Materials
[Brandon Rohrer - "Recurrent Neural Networks (RNN) and Long Short-Term Memory (LSTM)"](https://www.youtube.com/watch?v=WCUNPb-5EYI&t=713s)
This video gives a high level overview of both RNNs and LSTMs. I felt this did a great job of covering the intuition behind why RNN and LSTMs are useful which I find to be a large learning barrier with many of this more dense conceptual models.

[Understanding LSTM Networks](https://colah.github.io/posts/2015-08-Understanding-LSTMs/)
This write up on LSTMs contains the best examples and visuals I have found and really helped me solidfy the understanding of each gate. Additionally, it did a great job outline the transition from RNNs to LSTMs. 

[Illustrated Guide to LSTM’s and GRU’s: A step by step explanation](https://towardsdatascience.com/illustrated-guide-to-lstms-and-gru-s-a-step-by-step-explanation-44e9eb85bf21)
This walkthrough covered similar topics as the above two, however I found it very useful in understanding the input fields for each gate in an LSTM due to the animated graphics showing the information flow of an LSTM. Additionally, this walked along each step referencing a real world example which I find to be very helpful for conceptualizing the process. 

## Recurrent Nueral Networks
Interestingly enough, the application phase of this project using [Markov Models](https://github.com/ryanknauer/CPSC448/blob/master/YoutubeExtension/Markov.md) really helped my transition into understanding the high level behind RNN and LSTM as these solve the same problem we were trying to solve using Markov Models. A RNN is a Nueral Network that feeds in the prediction of the previous state as inputs into the Nueral Network. This is similar to our use of HMM using a transition probability from a previous state to the next one. The weakness of this, is that the context does not maintain predictions more than one step back. This becomes a problem in something like language translation, where words can be heavily reliant on one another even if they are spaced multiple words apart. This is perfctly outlined from [Understanding LSTM Networks](https://colah.github.io/posts/2015-08-Understanding-LSTMs/) using the sentence "I grew up in France… I speak fluent ____." The ability to predict the blank word is highly dependent on the word "France" used in the previous sentence. 


## Long Short Term Memory
As discussed above, the weakness of RNN's is that they only preserve the prediction of the previous state. A LSTM provides a NN(actually a collection of NNs) architecture that allows for memory of previous predictions to be stored, decides how long to store the predictions, and which predictions to ignore at certain states. These different tasks are implemented through gates, each powered by it's on Nueral Network and regulate the flow of information throught the model. This control of information is vital as the complexity of the network would grow exponentially for every prediction that is stored into memory if the model was not concurrently filtering out the most 'useful' pieces of information. The most common layout of theses gates consists of:
* Cell State - This isn't actually a gate, but it is the core pathway for information within LSTMs. The cell state carries information throughout the sequence of states, the rest of the actual gates then decide when to add and remove information to/from the cell state
* Forget Gate - This gate decides which Cell State values to forget based on the current sequence state inputs and the previous state predictions. This outputs a vector passed through a activation function(sigmoid) indicating the weight of importance for keeping or forgetting. 
* Input Gate - This gate decides what new information to add to the Cell state using both a tan + sigmoid function to create a update vector to apply to the existing cells state. This takes the same inputs as the Forget State: current sequence state inputs and the previous state predictions. 
* Output Gate - The last gate instead also takes the cell state and creates a filtered version based on our two other inputs(current state + previous predictions). 


## Application to Miigo

*Note: My intuition on LSTM effectiveness below is likely incorrect after revisiting [Reading 1](). LSTMs actually have been used quite successfully in this context when combined with CNNs for deeper feature extraction.*

For our application, RNNs might actually be a better fit than LSTM models as the biggest challenge we face is smoothing over jumps in emotions. Generally, emotions will not have very complex patterns over time like that of speach or writing. After further researching these models, I also believe that our implementation (or at least direction of implementation) of Markov Models was a very viable solution for the problem we faced. One of the biggest reasons for this is the unpredictablitiy of computing time leading to dropped frames. Since we are running the predictions in real time, we often drop dozens of frames based on computing power. Since an RNN would be trained based off a linear sequence of constant time intervals, these dropped frames would add an additional layer of complexity. With that said, it seems that RNN would still be able to handle this by recursively predicting each of the dropped frames before predicting the current one. Unfortunately this would then likely add an even larger time burder. 

