
function sendEmotionRequest(emotion){
    chrome.runtime.sendMessage({ message: 'emotion_message', emotion });
}

function sendGameEmotionRequest(emotion, isCorrect){
    chrome.runtime.sendMessage({ message: 'game_message', emotion: emotion, isCorrect: isCorrect });
}

function sendFirebaseRequest(id){
    chrome.runtime.sendMessage({ message: 'video_id', id }, storeTimeStamps);
}

