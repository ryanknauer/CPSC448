// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var GET_URL = 'http://10.159.23.70:8877/api/action/'


// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
  console.log('Turning ' + tab.url + ' red!');
  chrome.tabs.executeScript({
    code: 'document.body.style.backgroundColor="red"'
  });
});


chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  
    console.log('Turning ' + tab.url + ' red!');
    chrome.tabs.executeScript({
      code: 'document.body.style.backgroundColor="blue"'
    });

  
})


function sendRequest(emotion){
  fetch(GET_URL + String(emotion)).then(r => r.text()).then(result => {
      console.log(result)
  })
}
chrome.runtime.onMessage.addListener(
  (request, sender, senderResponse) => {
    switch (request.message) {
      case 'emotion_message': {
        sendRequest(request.emotion);
        break;
      }
      default:
    }
  }
);