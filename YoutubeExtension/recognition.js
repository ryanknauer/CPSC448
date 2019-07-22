
var emotion_labels = ["😠", "💩", "😨", "😀", "😢", "😮", "😐"];
var emotion_colors = ["#ff0000", "#00a800", "#ff4fc1", "#ffe100", "#306eff", "#ff9d00", "#7c7c7c"];
var EmotionModel
var offset_x = 27;
var offset_y = 20;
var most_recent_emotion = 6
var most_recent_emotions = tf.ones([7], tf.int32)



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
        sendEmotionRequest(most_recent_emotion);
    };
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
        
        if (useMarkov == 1){
            z = applyMarkovWeights(z)
        }else if(useMarkov == 2){
            z_arr = hmm_predict_states(z.argMax(1).dataSync()[0])
            z = tf.tensor([z_arr])
        }
        let top = z.argMax(1).dataSync()[0]
        let indexes = tf.topk(z, 2)['indices']
        indexes = indexes.dataSync()
        
        //let index = indexes[0] == 6 ? indexes[1]  : indexes[0]
        let index = indexes[0]
        const threshold = 0
        zsync = z.dataSync()
        if (z.dataSync()[index] >= threshold){
            //sendEmotionRequest(index)
            most_recent_emotions = z.clone()
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