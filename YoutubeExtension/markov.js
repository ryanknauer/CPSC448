
let prevState = null
let useMarkov = getUrlParameter('useMarkov') ? parseInt(getUrlParameter('useMarkov')) : true
let markovWeight = getUrlParameter('markovWeight') ? parseInt(getUrlParameter('markovWeight')) : 1.5

function applyMarkovWeights(z){
    let transition = [1,1,1,1,1,1,1]
    transition[most_recent_emotion] = markovWeight
    return z.mul(transition)
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