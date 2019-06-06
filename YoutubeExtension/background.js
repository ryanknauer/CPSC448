// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var config = {
  apiKey: "AIzaSyDHSWyjRYhpsdfSDHWXkEjvFrT3G8ITbvc",
  databaseURL: "https://meego-241107.firebaseio.com"
};
firebase.initializeApp(config);


var GET_URL = 'http://10.159.23.70:8877/api/action/'



function sendRequest(emotion){
  fetch(GET_URL + String(emotion)).then(r => r.text()).then(result => {
      console.log(result)
  })
}

function getTimeStamps(id, senderResponse){
  return firebase.database().ref('/videos/' + id).once('value').then(function(snapshot) {
    var val = snapshot.val();
    senderResponse(val);
    console.log('time stamps:');
    console.log(val);
  });
}

chrome.runtime.onMessage.addListener(
  (request, sender, senderResponse) => {
    switch (request.message) {
      case 'emotion_message': {
        sendRequest(request.emotion);
        break;
      }
      case 'video_id': {
        getTimeStamps(request.id, senderResponse);
        return true;
      }
      default:
    }
  }
);