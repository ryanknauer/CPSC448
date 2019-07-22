
let prevState = null
let useMarkov = getUrlParameter('useMarkov') ? parseInt(getUrlParameter('useMarkov')) : 0
let markovWeight = getUrlParameter('markovWeight') ? parseInt(getUrlParameter('markovWeight')) : 1.5

function applyMarkovWeights(z){
    let transition = [1,1,1,1,1,1,1]
    transition[most_recent_emotion] = markovWeight
    return z.mul(transition)
}

let transitions = Array(7).fill(1).map(()=>Array(7).fill(1))
for(var i=0; i<transitions.length; i++) {
    transitions[i][6] = 0.2
    transitions[i][i] = markovWeight
    

    transitions[i] = normalize(transitions[i])
}

function applyHiddenMarkovWeights(z){
    let res = tf.zeros([7], tf.int32)
    console.log('starting res:')
    res.print()
    console.log('most recent:')
    most_recent_emotions.print()
    console.log('z:')
    z.print()
    for(var i=0; i<transitions.length; i++) {
        let transitioned = z.mul(transitions[i])
        let multiplied = transitioned.mul(most_recent_emotions.dataSync()[i])
        res = res.add(multiplied)

        console.log('transitioned')
        transitioned.print()
        console.log('multiplied')
        multiplied.print()
        console.log('res:')
        res.print()
    }


    return res.add(0.001).div(res.sum())
}


function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

function normalize(arr){
    var ret 
    var ratio = arr.reduce((a,b) => a + b, 0)
    for ( var j = 0; j < arr.length; j++ ) {
        ret.append( arr[j] / ratio)
    }
    return ret
}