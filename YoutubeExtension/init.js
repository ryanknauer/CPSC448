// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when the user clicks on the browser action.

const UseTimeStamps = false

var checkControls = function(){
    var $ = window.jQuery
    var html = "<button id='meego-ytp-button' class='ytp-subtitles-button ytp-button' aria-label='Watch With Meego' style='    /*  float: right; */' aria-pressed='false' title='Watch With Meego'><svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='146px' height='123px' viewBox='0 0 146 123' version='1.1' style='    background: black;    width: 26;    height: 36;    margin: auto;  margin-top: -1px; margin-right: 2px;  float: right;    background: none;'>    <!-- Generator: Sketch 54.1 (76490) - https://sketchapp.com -->    <title>Group</title>    <desc>Created with Sketch.</desc>    <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'>        <g id='Artboard' transform='translate(-81.000000, -151.000000)'>            <g id='Group' transform='translate(81.000000, 156.000000)'>                <rect id='Rectangle' stroke='#FFFFFF' stroke-width='15' x='7.5' y='26.5' width='131' height='84' rx='42'></rect>                <path d='M52.5,79 C46.7010101,79 42,74.2989899 42,68.5 C42,62.7010101 46.7010101,58 52.5,58 C58.2989899,58 63,62.7010101 63,68.5 C63,74.2989899 58.2989899,79 52.5,79 Z M94.5,79 C88.7010101,79 84,74.2989899 84,68.5 C84,62.7010101 88.7010101,58 94.5,58 C100.29899,58 105,62.7010101 105,68.5 C105,74.2989899 100.29899,79 94.5,79 Z' id='Combined-Shape' fill='#FFFFFF'></path>                <path d='M63,0 C66.7101291,5.33333333 70.2180432,8 73.5237424,8 C76.8294416,8 80.3215274,5.33333333 84,0' id='Line' stroke='#FFFFFF' stroke-width='10' stroke-linecap='round' stroke-linejoin='round' transform='translate(73.500000, 4.000000) scale(1, -1) translate(-73.500000, -4.000000) '></path>            </g>        </g>    </g></svg></button>"
    if ($('.ytp-right-controls').length && $('#meego-ytp-button').length == 0){
        el = $.parseHTML(html)
        $('.ytp-right-controls').prepend(el)
    }
}

jQuery(document).ready(function($){

    //you can now use $ as your jQuery object.
    checkControls()
    
    if (UseTimeStamps){
        setupFirebase()
        //prob just wanna make this video global 
        setupTimestamps(document.getElementsByClassName('html5-main-video')[0])
    }else{
        setupCanvas()
        $('#meego-ytp-button').click(function() {
            runfun()
        })
    }
});

jQuery(window).load(function(){
    checkControls()
});


