# CPSC448

## Project Proposal
https://docs.google.com/document/d/1puxoi1hOgQyhx2ozLxz7JmSdaY13pf-dHCr5eZlqh5Q/edit?usp=sharing

## Description

I am currently taking CPSC 491 working on a project with CDM to build an interactive toy robot to help children with Autism. For this directed studies course, I will be taking on an extension to this project, building on concepts covered in CPSC 340 and CPSC 425. This project extension would be to implement a Chrome Extension that processes face emotions in youtube videos being watched in real time. This feature will be integrated with the toy robot we are building in the project in order to highlight emotions in the video. The goal is for this to be used as an aid to help teach emotion interpretation and engagement at a young age, and in a very inexpensive and accessible way. This is partially inspired from the [Autism Glass Project](http://autismglass.stanford.edu/), hopefully providing another aid for emotion interpretation development in an environment that is both comfortable and engaging for the children.


## Breakdown

This course was broken down into two main parts in order to maintain a balance of both implementation and reading/learning. The first part stems from the 491 course, implementing and improving the chrome extension outlined above. The second was to dive deeper into reading papers to get a better idea for how the open source ML tools used are actually working. 

### Youtube Chrome Extension
* [Demo](https://github.com/ryanknauer/CPSC448/tree/master/YoutubeExtension#demo)
* [Outline of Implementation](https://github.com/ryanknauer/CPSC448/tree/master/YoutubeExtension)
* [Improving Emotion Recognition Using Markov Models](https://github.com/ryanknauer/CPSC448/blob/master/YoutubeExtension/Markov.md)
  * [Hidden Markov Models](https://github.com/ryanknauer/CPSC448/blob/master/YoutubeExtension/Markov.md)

#### Paper Readings

 * [Reading #1 - 'A Brief Review of Facial Emotion Recognition Based on Visual Information'](https://github.com/ryanknauer/CPSC448/blob/master/Readings1.md)

 * [Reading #2 - 'ImageNet Classification with Deep Convolutional Neural Networks'](https://github.com/ryanknauer/CPSC448/blob/master/Reading2.md)

## Minimum Deliverable Set
* 6 readings summaries
* System for grabbing youtube video data (either in real time or by downloading and postprocessing)
* Facial recognition on a single paused frame using open source frameworks
* Overlay outlines of faces on a single paused frame
* Emotion recognition on a single pause frame using open source frameworks
* A written outline/documentation describing the steps I would take to implement my own models for facial recognition and emotion recognition. Including but not limited to:
  * Tools I would use and why
  * The model(s) I would implement and the pros/cons of each
  * What hyperparameters I would need to set
  * Ideas on best way to set these hyperparameters
  * Ideal data I would want to gather for training
  * Steps I would take for training + validating




!!! Explain why this is seperate form CDM Project

!!! Markov Chains for smoothing emotions
