import GameRules from './gameRules';

export default class Settings {

    constructor(changeSettings, initialSettings) {

        this.settingsBox = document.createElement("div");
        this.settingsBox.classList.add("settingsBox");
        this.BODY_TAG = document.querySelector("body");

        this.changeSettings = changeSettings;

        this.fieldSize = initialSettings.fieldSize;
        this.fieldSizeMinSize = 3;
        this.fieldSizeMaxSize = 7;
        this.isRulesOpened = false;

        this.rules = undefined;

        this.createSettingsWindow();
    };

    createSettingsWindow() {
        this.createHtml();
        this.addListeners();
    };

    createHtml() {
        this.settingsBox.innerHTML =
        `<h1>Settings</h1>
         <div>
            <div class="sizeHeader">
                <h3>Field size:&nbsp;</h3>
                <h3 id="sizeValue"></h3>
            </div>
            <input id="sizeSlider" type="range" min="${this.fieldSizeMinSize}" max="${this.fieldSizeMaxSize}" value="${this.fieldSize}" class="slider" id="myRange">            
         </div>
         <div class="settingsButtons">
            <button type="button" class="btn btn-info" id="showRules">Show rules</button>
            <button type="button" class="btn btn-success" id="startButton">START</button>
         </div>
        `;
        this.BODY_TAG.appendChild(this.settingsBox);
    };

    addListeners() {
        //field size slider
        const sizeValue = this.settingsBox.querySelector("#sizeValue");
        const sizeSlider = this.settingsBox.querySelector("#sizeSlider");

        sizeValue.innerHTML = sizeSlider.value;
        sizeSlider.oninput = () => {
            sizeValue.innerHTML = sizeSlider.value;
            this.fieldSize = +sizeSlider.value;
        };

        //start button + close rules if opened
        const startButton = this.settingsBox.querySelector("#startButton");
        startButton.addEventListener("click", () => {
            this.changeSettings(this.fieldSize);
            this.BODY_TAG.removeChild(this.settingsBox);
            if (this.isRulesOpened) {
                this.rules.removeRules();
            };
        });

        //rules button
        const showRules = this.settingsBox.querySelector("#showRules");
        showRules.addEventListener("click", () => {
            if (!this.isRulesOpened) {
                this.rules = new GameRules(this.closeRulesCallBack.bind(this));
                this.isRulesOpened = true;
            };
        });
    };

    closeRulesCallBack() {
        this.isRulesOpened = false;
    };
};