
# Readings 2


### Overview

In my first reading I hit a wall when the paper got deeper into the use of Nueral Networks and CNNs, so for my second set of readings I wanted to further my understanding of CNN's. 

### Materials + Overview

First, I went through [3Blue1Brown's mini-course on Nueral Networks](https://www.youtube.com/watch?v=aircAruvnKk&list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi). These videos give an extrodinairy overview of the intuition behind how and why Nueral Networks actually work. 

Next, as the core of emotion recognition would be built on CNNs, I went through [Deep Lizard's Series on CNNs](https://www.youtube.com/watch?v=YRhxdVk_sIs&list=PLZbbT5o_s2xq7LwI2y8_QtvuXZedL6tQU&index=21). 

Finally, looking into Emotion Recognition tutorials lead me to read the paper: [ImageNet Classification with Deep Convolutional
Neural Networks](https://papers.nips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks.pdf), which outlines an extremely successful image recogntion CNN model that is often used as a starting point for FER models. Going into this paper, one of my biggest points of confusion was how the hyperparameters Nueral Networks are decided upon. Nueral Nets come with a large amount of variability in this area, and while the high level workings are explained very well, there seems to be little intuition on how to actually choose these parameters. While part of the answer seems to be that there really is no 'right way' or concrete intuition behind setting up a CNN/NN, this paper did provide alot more understanding behind the actually process.


### Questions/Key Findings

3B1B's video gives an example of a NN recognizing a number from an image. Originally I believed CNN's were reducing the input of an image to a NN. Now I understand the structure differences behind both, but why are CNN's more useful than pure NN's? 
Answer: 
  * A NN with each pixel being one input node loses any spacial locality between pixels. This means that if you rearranged the pixels in your training and test set, it would have the same result. A CNN using convultion filters as each node in a hidden layer includes spacial context up to the size of the filter. 
  * This comes with the added benefit of reducing the input space significantly
References: [quora post](https://www.quora.com/Why-are-convolutional-neural-networks-better-than-other-neural-networks-in-processing-data-such-as-images-and-video),  3B1B videos, and DeepLizard videos



