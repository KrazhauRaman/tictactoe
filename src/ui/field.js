export default class GameField {

    constructor(fieldCreatedCallback, fieldSize) {

        this.BODY_TAG = document.querySelector("body");
        this.fieldBox = document.createElement("div");
        this.BODY_TAG.appendChild(this.fieldBox);

        this.fieldSize = fieldSize;
        this.fieldCreatedCallback = fieldCreatedCallback;

        this.fieldState = [];

        this.createField();
    };


    createField() {
        this.createHtml();
        this.fieldCreatedCallback(this.fieldState);
    };

    createHtml() {

        let fieldHtml = document.createElement("div");
        fieldHtml.classList.add("fieldHtml");

        for (let i = 0; i < this.fieldSize; i++) {
            let fieldRow = document.createElement("div");
            fieldRow.classList.add("fieldRow");
            this.fieldState[i] = [];
            for (let j = 0; j < this.fieldSize; j++) {
                const tile = document.createElement("div");
                tile.id = `tile-${i}-${j}`;
                tile.classList.add("tile");
                tile.classList.add("hoveredTile");
                fieldRow.appendChild(tile);
                this.fieldState[i][j] = "empty";
            };
            fieldHtml.appendChild(fieldRow);
        };
        this.fieldBox.appendChild(fieldHtml);
    };

    deleteField() {
       this.BODY_TAG.removeChild(this.fieldBox);
    };
};

