

class Game {
    constructor() {
        this.score = 0
        this.currentEmotion = null
        this.gameDiv = this.setupGameDiv()
        this.emotionLabels = ["😢","😀","😠"]
        for (let i = 0; i < this.emotionLabels.length; i++){
            this.getEmotionButton(i).addEventListener("click", () =>{this.guessEmotion(i)})
        }
        this.emotionButtons = []
        for (let i = 0; i < this.emotionLabels.length; i++){
            this.emotionButtons.push(this.getEmotionButton(i))
        }
    }

    setupGameDiv() {
        const container = document.getElementById("movie_player");
        const gameHTML = "<div id='game-overlay''style=' display: none;   z-index: 1000;    position: absolute;    background: none;    border: none;'>    <span style='    color: white;    font-size: 30px;'> Choose the expression!</span><div>    <button id='face-api-button-0' style='z-index: 1000; background: none;border:none;font-size: 72px;'>😢</button>    <button id='face-api-button-1' style='z-index: 1000; background: none;border:none;font-size: 72px;'>😀</button>     <button id='face-api-button-2' style='z-index: 1000;background: none;border:none;font-size: 72px;'>😠</button></div>    </div>"
        let gameDiv = document.createElement('div')
        gameDiv.innerHTML = gameHTML
        gameDiv = gameDiv.firstChild
        gameDiv.style.zIndex = 1000
        gameDiv.style.position = 'absolute'
        gameDiv.style.display = 'none'
        document.body.appendChild(gameDiv)
        container.appendChild(gameDiv)
        return gameDiv
    }


    newGuess(emotion) {
        VideoPlayer.pause()
        this.toggleGameView()
        this.currentEmotion = emotion
    }

    // Adding a method to the constructor
    guessEmotion(emotion) {
        if (!this.guessInProgress){return}
        const btn = this.getEmotionButton(emotion)
        if (this.isCorrectGuess(emotion)) {
            this.score++
            this.showCorrect(btn)
            setTimeout(() => {
                this.endGuess().bind(this)
            }, 1000);
        }else{
            this.showIncorrect(btn)
        }
        sendGameEmotionRequest(emotion, this.isCorrectGuess(emotion))
    }

    guessEmotionOneOff(emotion) {
        if (!this.guessInProgress){return}
        const btn = this.getEmotionButton(emotion)
        if (this.isCorrectGuess(emotion)) {
            this.score++
        }
        sendGameEmotionRequest(emotion, this.isCorrectGuess(emotion))
        this.emotionButtons.forEach((btn, i) => {
            if (this.isCorrectGuess(i)){
                this.showCorrect(btn)
            }else{
                this.showIncorrect(btn)
            }
        })
        setTimeout(() => {
            this.endGuess()
        }, 1000);
    }

    isCorrectGuess(emotion){
        return this.currentEmotion == emotion
    }

    getEmotionButton(emotion){
        return document.getElementById('face-api-button-' + emotion.toString())
    }
    

    showCorrect(btn){
        btn.innerHTML = "✅"
    }

    showIncorrect(btn){
        btn.innerHTML = "🚫"
    }

    endGuess(){
        if (!this.guessInProgress){return}
        this.currentEmotion = null
        VideoPlayer.play()
        this.toggleGameView()
        this.resetButtons()
    }

    guessInProgress(){
        return this.currentEmotion != null
    }


    toggleGameView() {
        this.gameDiv.style.display = this.gameDiv.style.display == "none" ? "block" : "none";
    }

    resetButtons() {
        for (let i = 0; i < this.emotionLabels.length; i++){
            this.getEmotionButton(i).innerHTML = this.emotionLabels[i]
        }
    }
}
