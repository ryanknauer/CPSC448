// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when the user clicks on the browser action.


var emotion_labels = ["😠", "💩", "😨", "😀", "😢", "😮", "neutral"];
var emotion_colors = ["#ff0000", "#00a800", "#ff4fc1", "#ffe100", "#306eff", "#ff9d00", "#7c7c7c"];
var EmotionModel
var offset_x = 27;
var offset_y = 20;
var most_recent_emotion = 6


var checkControls = function(){
    var $ = window.jQuery
    var html = "<button id='meego-ytp-button' class='ytp-subtitles-button ytp-button' aria-label='Watch With Meego' style='    /*  float: right; */' aria-pressed='false' title='Watch With Meego'><svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='146px' height='123px' viewBox='0 0 146 123' version='1.1' style='    background: black;    width: 26;    height: 36;    margin: auto;  margin-top: -1px; margin-right: 2px;  float: right;    background: none;'>    <!-- Generator: Sketch 54.1 (76490) - https://sketchapp.com -->    <title>Group</title>    <desc>Created with Sketch.</desc>    <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'>        <g id='Artboard' transform='translate(-81.000000, -151.000000)'>            <g id='Group' transform='translate(81.000000, 156.000000)'>                <rect id='Rectangle' stroke='#FFFFFF' stroke-width='15' x='7.5' y='26.5' width='131' height='84' rx='42'></rect>                <path d='M52.5,79 C46.7010101,79 42,74.2989899 42,68.5 C42,62.7010101 46.7010101,58 52.5,58 C58.2989899,58 63,62.7010101 63,68.5 C63,74.2989899 58.2989899,79 52.5,79 Z M94.5,79 C88.7010101,79 84,74.2989899 84,68.5 C84,62.7010101 88.7010101,58 94.5,58 C100.29899,58 105,62.7010101 105,68.5 C105,74.2989899 100.29899,79 94.5,79 Z' id='Combined-Shape' fill='#FFFFFF'></path>                <path d='M63,0 C66.7101291,5.33333333 70.2180432,8 73.5237424,8 C76.8294416,8 80.3215274,5.33333333 84,0' id='Line' stroke='#FFFFFF' stroke-width='10' stroke-linecap='round' stroke-linejoin='round' transform='translate(73.500000, 4.000000) scale(1, -1) translate(-73.500000, -4.000000) '></path>            </g>        </g>    </g></svg></button>"
    if ($('.ytp-right-controls').length && $('#meego-ytp-button').length == 0){
        el = $.parseHTML(html)
        $('.ytp-right-controls').prepend(el)
    }
}
// (function() {
//     // Load the script
//     var script = document.createElement("SCRIPT");
//     script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
//     script.type = 'text/javascript';
//     script.onload = function() {
//         var $ = window.jQuery;
//         checkControls()
//     };
//     document.getElementsByTagName("head")[0].appendChild(script);
// })();


jQuery(document).ready(function($){

    //you can now use $ as your jQuery object.
    checkControls()
    setupCanvas()
    //load()
    //runfun()
    $('#meego-ytp-button').click(function() {
        runfun()
    })
});

jQuery(window).load(function(){
    checkControls()
  });



function setupCanvas(){
    var container = document.getElementsByClassName("html5-video-container")[0]
    var canv = document.createElement('canvas');
    canv.id = 'face-api-canvas';
    var underlay = document.createElement('canvas');
    underlay.id = 'face-api-underlay';

    const input = document.getElementsByClassName('html5-main-video')[0]
    canv.style.zIndex = input.style.zIndex + 1
    canv.style.width = input.style.width
    canv.style.height = input.style.height
    canv.style.position = 'absolute'
    document.body.appendChild(canv); 
    container.appendChild(canv)


    underlay.style.zIndex = input.style.zIndex - 1
    underlay.style.width = input.style.width
    underlay.style.height = input.style.height
    underlay.style.position = 'absolute'
    document.body.appendChild(underlay); 
    container.appendChild(underlay)


    input.onpause = function() {
        sendRequest(most_recent_emotion);
    };
}

async function load(){
    console.log('hi')
}

var loadedModels = false
async function runfun() {
    if (!loadedModels){
        const MODEL_URL = chrome.extension.getURL('/weights')
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL)
        EmotionModel = await createModel(chrome.extension.getURL('/models/mobilenetv1_models/model.json'))
        loadedModels = true
    }
    const input = document.getElementsByClassName('html5-main-video')[0]
    // resize the overlay canvas to the input dimensions
    
    const results =  await faceapi.detectSingleFace(input, new faceapi.TinyFaceDetectorOptions())
    if (results){
        const canv = document.getElementById('face-api-canvas')
        const dims = faceapi.matchDimensions(canv, input, true)
        faceapi.draw.drawDetections(canv, faceapi.resizeResults(results, dims))
        getEmotions(results,canv,input)
    } else{
        const canv = document.getElementById('face-api-canvas')
        canv.getContext('2d').clearRect(0, 0, canv.width, canv.height);
    }
    setTimeout(() => runfun())
}



async function getEmotions(results, canvas, input) {
    const res = [results]
    const context = canvas.getContext('2d')
    context.font = '84px serif'
    context.fillStyle = "#ffffff";
    const underlay =  document.getElementById('face-api-underlay')
    faceapi.matchDimensions(underlay, canvas, true)
    const underlay_context = underlay.getContext('2d')
    underlay_context.drawImage(input, 0, 0, underlay.width, underlay.height)
    for (var i = 0; i < res.length; i++) {
        var item = res[i].box;
        let s_x = Math.floor(item._x+offset_x);
        if (item.y<offset_y){
            var s_y = Math.floor(item._y);
        }
        else{
            var s_y = Math.floor(item._y-offset_y);
        }
        let s_w = Math.floor(item._width-offset_x);
        let s_h = Math.floor(item._height);
        let face_im = underlay_context.getImageData(s_x, s_y, s_w, s_h);
        face_im = preprocess(face_im);
        
        z = EmotionModel.predict(face_im)
        let top = z.argMax(1).dataSync()[0]
        let indexes = tf.topk(z, 2)['indices']
        indexes = indexes.dataSync()
        let index = indexes[0] == 6 ? indexes[1]  : indexes[0]
        const threshold = 0.1
        zsync = z.dataSync()
        if (z.dataSync()[index] > threshold){
            //sendRequest(index)
            most_recent_emotion = index
            context.fillText(emotion_labels[index], 10, 84);
        }
    }
}


function preprocess(imgData) {
    return tf.tidy(() => {
        let tensor = tf.browser.fromPixels(imgData).toFloat();
        tensor = tensor.resizeBilinear([100, 100])
        tensor = tf.cast(tensor, 'float32')
        const offset = tf.scalar(255.0);
        // Normalize the image 
        const normalized = tensor.div(offset);
        //We add a dimension to get a batch shape 
        const batched = normalized.expandDims(0)
        return batched
    })
}

async function createModel(path) {
    let model = await tf.loadLayersModel(path)
    return model
}


function sendRequest(emotion){
    chrome.runtime.sendMessage({ message: 'emotion_message', emotion });

}