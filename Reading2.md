
# Readings 2


### Overview

This reading was aimed to strengthen my technical knowledge gaps that presented themselves in my first reading by strengthing my understanding of Neural Networks and CNN's 


### Materials + Overview

First, I went through [3Blue1Brown's mini-course on Neural Networks](https://www.youtube.com/watch?v=aircAruvnKk&list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi). These videos give an extraordinary overview of the intuition behind how and why Neural Networks actually work. 

Next, as the core of emotion recognition would be built on CNNs, I went through [Deep Lizard's Series on CNNs](https://www.youtube.com/watch?v=YRhxdVk_sIs&list=PLZbbT5o_s2xq7LwI2y8_QtvuXZedL6tQU&index=21). 

Finally, looking into Emotion Recognition tutorials lead me to read the paper: [ImageNet Classification with Deep Convolutional
Neural Networks](https://papers.nips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks.pdf), which outlines an extremely successful image recogntion CNN model that is often used as a starting point for FER models. Going into this paper, one of my biggest points of confusion was how the hyperparameters Nueral Networks are decided upon. Nueral Nets come with a large amount of variability in this area, and while the high level workings are explained very well, there seems to be little intuition on how to actually choose these parameters. While part of the answer seems to be that there really is no 'right way' or concrete intuition behind setting up a CNN/NN, this paper did provide alot more understanding behind the actually process.


### Questions/Key Findings

3B1B's video gives an example of a NN recognizing a number from an image. Originally I believed CNN's were reducing the input of an image to a NN. Now I understand the structure differences behind both, but why are CNN's more useful than pure NN's? 
Answer: 
  * A NN with each pixel being one input node loses any spatial locality between pixels. This means that if you rearrange the pixels in your training and test set, it would have the same result. A CNN using convolution filters as each node in a hidden layer includes spatial context up to the size of the filter. 
  * This comes with the added benefit of reducing the input space significantly
References: [quora post](https://www.quora.com/Why-are-convolutional-neural-networks-better-than-other-neural-networks-in-processing-data-such-as-images-and-video),  3B1B videos, and DeepLizard videos


What are some of the design choices used when building a CNN? 
* First, one of the main answers to this question is "nobody really knows" - there is currently no right way to design/build a CNN just ways that seem to work the best. Imagenet is an example of this, and one of the most widely used examples of this for image classification. Imagenet is commonly used as a baseline model for solving similar problems and [fine tuned](https://www.youtube.com/watch?v=5T-iXNNiwIs) to the specific problem scope. 
* GPU limitations seem to be the next biggest impact of design choices, as current GPU's are only able to train complex models with large amounts of optimizations implemented to speed training up. For example with the ImageNet paper, the majority of the paper outlines optimizations such as:
  * Using Relu Activation functions over sigmoid/tanh functions as ReLu results in significantly more 0 or "inactive" responses saving computation time on backpropagation(outlined in [3B1B video here](https://www.youtube.com/watch?v=aircAruvnKk&t=460s))
  * Dropout - ensambling(combining multiple models) is a very effective tool to reduce overfitting, however with complex models like Imagenet ensambling would take far too long. Dropout sets a probability of setting any neuron to 0, again saving time on backpropagation due to increased sparsity as with Relu. This works effectively with ensambling only increasing training time by a factor of 2. 
  


