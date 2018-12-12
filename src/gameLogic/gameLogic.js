import Settings from '../ui/settings';
import GameField from '../ui/field';
import EndGameScreen from '../ui/endGameScreen';
import { createXCanvas } from '../ui/figures';
import { createOCanvas } from '../ui/figures';

export default class GameLogic {

    constructor() {

        this.settings = {
            fieldSize: 3,
        };

        this.fieldState = [];
        this.fieldRemover = undefined;

        this.changeSettings = this.changeSettings.bind(this);
        this.fieldCreatedCallback = this.fieldCreatedCallback.bind(this);

        this.createSetting();
    };

    // adjusting field size
    createSetting() {
        new Settings(this.changeSettings, this.settings);
    };

    changeSettings(newFieldSize) {
        this.settings.fieldSize = newFieldSize;
        this.createGameField();
    };

    // generating field + saving ability to delete it 
    createGameField() {
        const gameField = new GameField(this.fieldCreatedCallback, this.settings.fieldSize);
        this.fieldRemover = gameField.deleteField.bind(gameField);
    };

    fieldCreatedCallback(fieldState) {
        this.fieldState = fieldState;
        this.startGame();
    };

    // adding event listeners to field
    startGame() {
        const fieldState = this.fieldState;
        const fieldSize = this.settings.fieldSize;

        let playerTurn = "x";
        let turnsPassed = 0;

        // when user click on tile game fires "game end" check and pass turn to other player
        // if "turn count = tile count", game considers it as draw
        const handler = function (tileHtml, row, tile) {

            if (playerTurn === "x") {
                tileHtml.appendChild(createXCanvas(row, tile));
                tileHtml.classList.remove("hoveredTile");
                fieldState[tile][row] = "x";
                this.checkForWin(playerTurn);
                playerTurn = "o";
                turnsPassed++;
            }
            else {
                tileHtml.appendChild(createOCanvas(row, tile));
                tileHtml.classList.toggle("hoveredTile");
                fieldState[tile][row] = "o";
                this.checkForWin(playerTurn);
                playerTurn = "x";
                turnsPassed++;
            };

            if (turnsPassed === fieldSize * fieldSize) {
                this.createEndGame("draw");
            };
        };
            
        for (let row in fieldState) {
            for (let tile in fieldState[row]) {
                let tileHtml = document.querySelector(`#tile-${row}-${tile}`);
                tileHtml.addEventListener("click", handler.bind(this, tileHtml, row, tile), { once: true });
            };
        };
    };

    checkForWin(playerTurn) {

        const fieldState = this.fieldState;
        const fieldSize = this.settings.fieldSize;

        //left-top -> right-bottom diagonal check
        let isWin = true;        
        for (let i = 0; i < fieldSize - 1; i++) {
            if (fieldState[i][i] !== fieldState[i + 1][i + 1] || fieldState[i][i] === "empty") {
                isWin = false;
                break;
            };
        };
        if (isWin) {
            this.createEndGame(playerTurn);
            return;
        };

        //right-top -> left-bottom diagonal check
        isWin = true;
        for (let i = 0; i < fieldSize - 1; i++) {
            if (fieldState[i][(fieldSize - 1) - i] !== fieldState[i + 1][(fieldSize - 2) - i] || fieldState[i][(fieldSize - 1) - i] === "empty") {
                isWin = false;
                break;
            };
        };
        if (isWin) {
            this.createEndGame(playerTurn);
            return;
        };

        //rows check
        isWin = false;
        for (let i = 0; i < fieldSize; i++) {
            let isColumnWinned = true;
            for (let j = 0; j < fieldSize - 1; j++) {
                if (fieldState[i][j] !== fieldState[i][j + 1] || fieldState[i][j] === "empty") {
                    isColumnWinned = false;
                    break;
                };
            }
            if (isColumnWinned) {
                isWin = true;
                break;
            };
        };
        if (isWin) {
            this.createEndGame(playerTurn);
            return;
        };

        //columns check
        isWin = false;
        for (let i = 0; i < fieldSize; i++) {
            let isRowWinned = true;
            for (let j = 0; j < fieldSize - 1; j++) {
                if (fieldState[j][i] !== fieldState[j + 1][i] || (fieldState[j][i] === "empty")) {
                    isRowWinned = false;
                    break;
                };
            }
            if (isRowWinned) {
                isWin = true;
                break;
            };
        };
        if (isWin) {
            this.createEndGame(playerTurn);
            return;
        };
    };

    // if game ends, than field removes and "end game screen" appears with ability to start game loop again
    createEndGame(result) {
        new EndGameScreen(this.createSetting.bind(this), result, this.fieldRemover);
    };
}