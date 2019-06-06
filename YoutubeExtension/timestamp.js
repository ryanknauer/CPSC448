var timestamps = []
var tsIndex = 0
var timeWindow = 3



function storeTimeStamps(ts){
    console.log('timestamps recieved');
    console.log(ts)
    timestamps = ts
}


function setupTimestamps(video){
    video.addEventListener('timeupdate', (event) => {
        videoUpdate(video)
    });
} 

function videoUpdate(video){
    if (tsIndex >= timestamps.length){
        return
    }
    while (timestamps[tsIndex].time + timeWindow < video.currentTime){
        tsIndex++
    }
    currTS = timestamps[tsIndex]
    if (currTS.time < video.currentTime){
        console.log('sending emotion:' + currTS.emotion)
        sendEmotionRequest(currTS.emotion)
        tsIndex++
    }
}

