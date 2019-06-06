
function sendEmotionRequest(emotion){
    chrome.runtime.sendMessage({ message: 'emotion_message', emotion });
}

function sendFirebaseRequest(id){
    chrome.runtime.sendMessage({ message: 'video_id', id }, storeTimeStamps);
}

