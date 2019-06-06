

function setupFirebase() {
    const id = getYoutubeId()
    if (id == -1) {
        return
    }
    sendFirebaseRequest(id)
}


function getYoutubeId(){
    var video_id = window.location.search.split('v=')[1];
    if(video_id) {
        return video_id
    }
    return -1
}


