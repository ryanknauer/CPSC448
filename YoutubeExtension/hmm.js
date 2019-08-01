let prevHiddenState = null
let transition = 
[
    [0.142,0.142,0.142,0.142,0.142,0.142,0.142],
    [0.142,0.142,0.142,0.142,0.142,0.142,0.142],
    [0.142,0.142,0.142,0.142,0.142,0.142,0.142],
    [0.142,0.142,0.142,0.142,0.142,0.142,0.142],
    [0.142,0.142,0.142,0.142,0.142,0.142,0.142],
    [0.142,0.142,0.142,0.142,0.142,0.142,0.142],
    [0.142,0.142,0.142,0.142,0.142,0.142,0.142],
]

let observation =
[
    [0.88,0.02,0.02,0.02,0.02,0.02,0.02],
    [0.02,0.88,0.02,0.02,0.02,0.02,0.02],
    [0.02,0.02,0.88,0.02,0.02,0.02,0.02],
    [0.02,0.02,0.02,0.88,0.02,0.02,0.02],
    [0.02,0.02,0.02,0.02,0.88,0.02,0.02],
    [0.02,0.02,0.02,0.02,0.02,0.88,0.02],
    [0.02,0.02,0.02,0.02,0.02,0.02,0.88],
]
for (var i = 0; i < transition.length; i++){
    for (var j = 0; j < transition.length; j++){
        if (i == j){
            observation[i][j] = 0.5
            transition[i][j] = 0.5
        }else{
            observation[i][j] = 0.083
            transition[i][j] = 0.083
        }
    }
}

var dp = [null,null,null,null,null,null,null]
function hmm(x_t, obs){
    if (dp[x_t] == null){
        dp[x_t] = 0.142 * getObservation(x_t, obs)
        return dp[x_t]
    }
    let result = 0
    for (var i = 0; i < transition.length; i++){
        result += dp[i] * transition[i][x_t] * getObservation(x_t, obs)
    }
    dp[x_t] = result
    return dp[x_t]
}


function getObservation(x_t, obs){
    var ret = 0
    for (var i = 0; i < emotion_labels.length; i++){
        ret += obs[i]*observation[x_t][i]
    }
    return ret
}


function hmm_predict_states(obs){
    var ret = []
    for (var i = 0; i < transition.length; i++) {
        ret.push(hmm(i, obs))
    }
    dp = normalize(dp)
    return ret
}

