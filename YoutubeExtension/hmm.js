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

var dp = [null,null,null,null,null,null,null]
function hmm(x_t, obs){
    if (dp[x_t] == null){
        dp[x_t] = 0.142 * observation[x_t][obs]
        return dp[x_t]
    }
    let result = 0
    for (var i = 0; i < transition.length; i++){
        result += dp[i] * transition[i][x_t] * observation[x_t][obs]
    }
    dp[x_t] = result
    return dp[x_t]
}


function hmm_predict_states(obs){
    var ret = []
    for (var i = 0; i < transition.length; i++) {
        ret.push(hmm(i, obs))
    }
    return ret
}

