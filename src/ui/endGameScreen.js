export default class EndGameScreen {

    constructor(startNewCameCallBack, result, fieldRemover) {

        // remove game field when game is over
        fieldRemover(); 

        this.BODY_TAG = document.querySelector("body");
        this.endGameBox = document.createElement("div");
        this.BODY_TAG.appendChild(this.endGameBox);

        this.result = result;
        this.startNewCameCallBack = startNewCameCallBack;

        this.createEndGameScreen();
    };


    createEndGameScreen() {
        this.createHtml();
        this.restartGameButton();
    };

    createHtml() {
        this.endGameBox.innerHTML =
        `<div class="endGameBox">
            <h1>Result:</h1>
            <h2>
                ${
                (this.result === "draw")
                ?
                "DRAW"
                :
                `Vinner is ${this.result}`
                }
            </h2>
            <button type="button" class="btn btn-success startAgain" id="restartButton">START AGAIN</button>
        </div>`
    };

    restartGameButton() {
        const restartButton = this.endGameBox.querySelector("#restartButton");
        restartButton.addEventListener("click", () => {
            this.startNewCameCallBack();
            this.BODY_TAG.removeChild(this.endGameBox);
        });
    };
};