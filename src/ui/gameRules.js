export default class GameRules {

    constructor(closeRulesCallBack) {

        this.BODY_TAG = document.querySelector("body");
        this.gameRuleBox = document.createElement("div");
        this.BODY_TAG.appendChild(this.gameRuleBox);

        this.closeRulesCallBack = closeRulesCallBack;

        this.createGameRulesWindow();
    };


    createGameRulesWindow() {
        this.createHtml();
        this.closeButton();
    };

    createHtml() {
        this.gameRuleBox.innerHTML =
        `<div class="gameRuleBox">
            <h1>Rules:</h1>
            <p>
            The object of Tic Tac Toe is to get three (or more) in a row. You play on a three by three (or more) game board.</br>
            One player is known as X's and the other is O's. 
            Players alternate placing their X's and O's on the game board until either opponent has three in a row or all nine squares are filled.</br>
            X's always go first, and in the event that no one has three in a row, the stalemate is called a cat game.
            </p>
            <button type="button" class="btn btn-success" id="closeButton">GOT IT!</button>
        </div>`
    };

    closeButton() {
        const closeButton = this.gameRuleBox.querySelector("#closeButton");
        closeButton.addEventListener("click", () => {
            this.closeRulesCallBack();
            this.removeRules();
        });
    };

    removeRules() {
        this.BODY_TAG.removeChild(this.gameRuleBox);
    };
};