# CPSC448

## Project Proposal
https://docs.google.com/document/d/1puxoi1hOgQyhx2ozLxz7JmSdaY13pf-dHCr5eZlqh5Q/edit?usp=sharing

## Description

I am currently taking CPSC 491 working on a project with CDM to build an interactive toy robot to help children with Autism. For this directed studies course, I will be taking on an extension to this project, building on concepts covered in CPSC 340 and CPSC 425. This project extension would be to implement a Chrome Extension that processes face emotions in youtube videos being watched in real time. This feature will be integrated with the toy robot we are building in the project in order to highlight emotions in the video. The goal is for this to be used as an aid to help teach emotion interpretation and engagement at a young age, and in a very inexpensive and accessible way. This is partially inspired from the [Autism Glass Project](http://autismglass.stanford.edu/), hopefully providing another aid for emotion interpretation development in an environment that is both comfortable and engaging for the children. For this directed studies course, I will solely be focusing on the Facial and Emotion Recognition portion of this application as this portion is out of the scope of my teams 491 project.  

## Learning Goals

* Understand the high + mid level intuition behind the emotion recognition models that would be used in this application
* Gain hands on application experience using open source models for facial recognition and emotion recognition 
* Learn to fine tune and improve available tools to solve a specific, real world problem
* Gain experience using tensorflow
* Understand workings behind more advanced models used in industry such as Long Short Term Memory 
* Understand intuition behind implementation of models used for emotion and facial recognition 
* Explore potential options for improvement for this application


## Table of Contents/Breakdown

This course was broken down into two main parts in order to maintain a balance of both implementation and reading/learning. The first part stems from the 491 course, implementing and improving the chrome extension outlined above. Here I was able to apply and build upon skills covered in CPSC322 + CPSC 422 to integrate spatial locality into the emotion recognition system using Markov Models. The second was to dive deeper into reading papers to get a better idea for how the open source ML tools used are actually working. This allowed me to strengthen my knowledge of Neural Networks and CNNs covered briefly in CPSC340 and 425. Because the readings and papers have a lot of overlap in terms of material and learning goals I have provided references to these overlaps throughout both sections. For high level layout purposes I have chosen to keep them seperated. 

### Youtube Chrome Extension
* [Demo](https://github.com/ryanknauer/CPSC448/tree/master/YoutubeExtension#demo)
* [Outline of Implementation](https://github.com/ryanknauer/CPSC448/tree/master/YoutubeExtension#progress)
  * [Setting Up Chrome Extension](https://github.com/ryanknauer/CPSC448/tree/master/YoutubeExtension#1-setting-up-chrome-extension)
  * [Capturing Frames](https://github.com/ryanknauer/CPSC448/tree/master/YoutubeExtension#2-capturing-frames)
  * [Face Recognition](https://github.com/ryanknauer/CPSC448/tree/master/YoutubeExtension#3-face-recognition)
  * [Emotion Recognition](https://github.com/ryanknauer/CPSC448/tree/master/YoutubeExtension#4-emotion-recognition)
* [Improving Emotion Recognition Using Markov Models](https://github.com/ryanknauer/CPSC448/blob/master/YoutubeExtension/Markov.md)
  * [First Attempt Markov Model](https://github.com/ryanknauer/CPSC448/blob/master/YoutubeExtension/Markov.md#first-attempt)
    * [Results](https://github.com/ryanknauer/CPSC448/blob/master/YoutubeExtension/Markov.md#results)
    * [Next Steps](https://github.com/ryanknauer/CPSC448/blob/master/YoutubeExtension/Markov.md#next-steps)
  * [Hidden Markov Models](https://github.com/ryanknauer/CPSC448/blob/master/YoutubeExtension/Markov.md#hidden-markov-models)
    * [Transition Model](https://github.com/ryanknauer/CPSC448/blob/master/YoutubeExtension/Markov.md#transition-model)
    * [Observation Model](https://github.com/ryanknauer/CPSC448/blob/master/YoutubeExtension/Markov.md#observation-model)
    * [Single Value Observation](https://github.com/ryanknauer/CPSC448/blob/master/YoutubeExtension/Markov.md#single-valued-observation)
    * [Vectorized Observations](https://github.com/ryanknauer/CPSC448/blob/master/HMM.ipynb)
    * [Results](https://github.com/ryanknauer/CPSC448/blob/master/YoutubeExtension/Markov.md#results-1)
  * [Resources](https://www.youtube.com/watch?v=9yl4XGp5OEg)
    * [CPSC 322 + 422
](https://github.com/ryanknauer/CPSC448/blob/master/YoutubeExtension/Markov.md#cpsc-322--422)
    * [Bert Huang - Virginia Tech HMM lecture
](https://github.com/ryanknauer/CPSC448/blob/master/YoutubeExtension/Markov.md#bert-huang---virginia-tech-hmm-lecture)

### Paper Readings

 * [Reading #1 - A Brief Review of Facial Emotion Recognition Based on Visual Information](https://github.com/ryanknauer/CPSC448/blob/master/Readings1.md)

 * [Reading #2 - Neural Networks, Convolutional Neural Networks, ImageNet](https://github.com/ryanknauer/CPSC448/blob/master/Reading2.md)

 * [Reading #3 - Recurrent Neural Networks, Long Short Term Memory](https://github.com/ryanknauer/CPSC448/blob/master/Readings3.md)


### Future Learning
* [Further Implementations](https://github.com/ryanknauer/CPSC448/blob/master/NextSteps.md#implementation-of-emotion-recognition)
* [Loose Ends](https://github.com/ryanknauer/CPSC448/blob/master/NextSteps.md#loose-ends)
* [Further Explorations](https://github.com/ryanknauer/CPSC448/blob/master/NextSteps.md#explorations)


## Project Impact

Tying back into the overarching CPSC491 project, the successes and failures of this directed studies helped shape the end result of our product. Originally, we had planned to fake the machine learning aspect of the project by manually hardcoding predictions. Having a actual working prototype of the emotion recognition system helped us identify the potential long term abilities and limitations of this type of system. For example, one of the largest benefits of th


## Deliverable Breakdown

* 6 readings summaries - We  adjusted this to 3 reading summaries to provide more of a balance between implementations and research/readings. 
* System for grabbing youtube video data (either in real time or by downloading and postprocessing) - Completed in [Capturing Frames](https://github.com/ryanknauer/CPSC448/tree/master/YoutubeExtension#2-capturing-frames)
* Facial recognition on a single paused frame using open source frameworks - Completed in [Face Recognition](https://github.com/ryanknauer/CPSC448/tree/master/YoutubeExtension#3-face-recognition)
* Overlay outlines of faces on a single paused frame 
* Emotion recognition on a single pause frame using open source frameworks - 
* A  written outline/documentation describing the steps I would take to implement my own models for facial recognition and emotion recognition. Including but not limited to:
   * Tools I would use and why
   * The model(s) I would implement and the pros/cons of each
   * What hyperparameters I would need to set
   * Ideas on best way to set these hyperparameters
   * Ideal data I would want to gather for training
   * Steps I would take for training + validating
