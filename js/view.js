// Class for rendering views of the game.

// This is the main view. Only put rendering/updating code in here that will
// persist throughout the entire experience.
class View {
    constructor() {
        this.name = "View";
    }

    renderAll(context) {}
}

class LevelClearScreen extends View {
    constructor() {
        super();
        this.name = "LevelClearScreen";
    }

    renderAll(context) {
        super.renderAll(context);
        this.renderBackground(context);
        this.renderText(context);
    }

    renderBackground(context) {

    }

    renderText(context) {

    }
}

class NextLevelView extends View {
    constructor() {
        super();
        this.name = "NextLevelView";
    }

    renderAll(context) {
        super.renderAll(context);
        this.renderBackground(context);
        // TO DO: Uncomment once antagonist asset is supplied:
        // this.renderAntagonist(context);
        this.renderText(context);
        this.renderScript(context);
        this.renderNextLevelText(context);
    }

    renderBackground(context) {
        // Image credit: https://www.freepik.com/vectors/slum
        var bgImage = new Image();
        bgImage.src = 'assets/village_bg.jpg';
        let bgWidth = document.documentElement.clientWidth;
        let bgHeight = document.documentElement.clientHeight;
        context.drawImage(bgImage, 0, 0, bgWidth, bgHeight);

        context.save();
        context.fillStyle = 'rgba(0, 0, 0, 0.3)';
        context.fillRect(0, 0, bgWidth, bgHeight);
        context.restore();

    }

    renderAntagonist(context) {
        let x = document.documentElement.clientWidth / 4;
        let y = document.documentElement.clientHeight / 2 - (antagonist.h / 2);
        antagonist.draw(x, y, context);
    }

    renderText(context) {
        context.save();
        let text = gameText.congrats_text_next_level;
        var textWidth = context.measureText(text).width;
        context.font = "24px Helvetica bold";
        context.fillStyle = 'rgba(255, 255, 255, 1)';
        context.textAlign = 'center';
        context.fillText(text, document.documentElement.clientWidth / 2, 
                         document.documentElement.clientHeight * 0.35);
        context.restore();
    }

    renderScript(context) {
        let scriptText = gameText.villian_scripts[level - 1];
        let partitionedScript = partitionScript(scriptText, context);
        if (partitionedScript != undefined && partitionedScript.lines.length > 0) {
            context.font = "12px Helvetica bold";
            context.fillStyle = 'rgba(255, 255, 255, 1)';
            let x = document.documentElement.clientWidth / 2 - 
                    context.measureText(partitionedScript.lines[0]).width / 2;
            let y = document.documentElement.clientHeight * 0.45;
            let margin = 5;
            for (let i = 0; i < partitionedScript.lines.length; i++) {
                context.fillText(partitionedScript.lines[i], x, y)
                y += partitionedScript.height + margin;
            }
        }
    }

    renderNextLevelText(context) {
        let text = gameText.next_level_text;
        var textWidth = context.measureText(text).width;
        context.font = "12px Helvetica";
        context.fillStyle = 'rgba(255, 255, 255, 1)';
        context.fillText(text, document.documentElement.clientWidth / 2 - textWidth / 2, 
                         document.documentElement.clientHeight * 0.75);
    }
}

class StartScreenView extends View { // subclass of View
    constructor() {
        super();
        this.name = "StartScreenView";
        this.buttons = [];
        let margin = 14;
        let w = document.documentElement.clientWidth * 0.075;
        let h = document.documentElement.clientHeight * 0.03;
        let fontName = "Helvetica";
        let fontSize = 12;
        let buttonColor = "rgba(255, 255, 255, 1)";
        let textColor = "rgba(0, 0, 0, 1)";

        for (let i = 0; i < supportedLanguages.length; i++) {
            let x = document.documentElement.clientWidth * 0.8;
            let y = document.documentElement.clientHeight * 0.1 + (h * i) + (margin * i);
            let text = languageMap[supportedLanguages[i]];
            this.buttons.push(new Button(x, y, w, h, buttonColor, textColor, 
                fontName, fontSize, text, true, () => {
                    setGameLanguageAndReload(supportedLanguages[i]);
                }));
        }
    }

    renderAll(context) {
        super.renderAll(context);
        this.renderBackground(context);
        this.renderTitle(context);
        this.renderInstructions(context);
        this.renderLanguageOptions(context);
    }

    renderInstructions(context) {
        context.save();
        let text = gameText.press_to_play_text;
        let margin = 15;
        context.shadowColor = "#000";
        context.shadowBlur = 5;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 1;
        context.font = "12px Helvetica";
        context.fillStyle = 'rgba(255, 255, 255, 1)';
        context.textAlign = 'center';
        context.fillText(text, document.documentElement.clientWidth / 2, 
                         document.documentElement.clientHeight * 0.6);
        
        for (let i = 0; i < gameText.instructions.length; i++) {
            text = gameText.instructions[i];
            context.fillText(text, document.documentElement.clientWidth / 2, 
                         document.documentElement.clientHeight * 0.6 + (margin * (i + 1)));
        }
        context.restore();
    }

    renderBackground(context) {
        var bgImage = new Image();
        bgImage.src = 'assets/bg.png';
        let bgWidth = document.documentElement.clientWidth;
        let bgHeight = document.documentElement.clientHeight;
        context.drawImage(bgImage, 0, 0, bgWidth, bgHeight);
    }

    renderTitle(context) {
        context.save();
        context.shadowColor = "#000";
        context.shadowBlur = 4;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 3;
        context.font = "600 64px Anek\ Malayalam";
        context.fillStyle = "rgba(255, 255, 255, 1)";
        context.textAlign = 'center';
        context.fillText(gameText.title, 
                         document.documentElement.clientWidth / 2, 
                         document.documentElement.clientHeight / 2.5);
        context.restore();
    }

    renderLanguageOptions(context) {
        for (let i = 0; i < this.buttons.length; i++) {
            let button = this.buttons[i];
            button.draw(context);
        }
    }

    renderPlayButton(context) {
        
    }

    create() {
        return new StartScreenView();
    }
}

class GameOverView extends View {
    constructor() {
        super();
        this.name = "GameOverView";
        let text = gameText.play_again_text;
        let x = document.documentElement.clientWidth * 0.5;
        let y = document.documentElement.clientHeight * 0.7;
        let w = 80;
        let h = 25;
        let fontSize = 12;
        let fontName = "Helvetica";
        let buttonColor = "rgba(255, 255, 255, 1)";
        let textColor = "rgba(0, 0, 0, 1)";
        this.buttons = [new Button(x, y, w, h, buttonColor, textColor, fontName,
                                   fontSize, text, true)];
        this.gameWon = mainCharacter.health > 0 ? true : false;
    }

    renderAll(context) {
        super.renderAll(context);
        this.renderBackground(context);
        this.gameWon ? 
            this.renderCongratsText(context) :
            this.renderTryAgainText(context);
        this.renderRestartGameButton(context);
        this.renderScore(context);
        this.renderLeaderboard(context);
    }

    renderTryAgainText(context) {
        context.fillStyle = 'rgba(0, 0, 0, 1)';
        let text = gameText.try_again_text;
        let x = document.documentElement.clientWidth / 2;
        let y = document.documentElement.clientHeight * 0.3;
        let metrics = context.measureText(text);
        let textWidth = metrics.width;
        let textHeight = metrics.actualBoundingBoxAscent + 
                         metrics.actualBoundingBoxDescent;

        context.fillText(text, x - textWidth / 2, y + textHeight / 2);
    }

    renderCongratsText(context) {
        context.fillStyle = 'rgba(0, 0, 0, 1)';
        let text = gameText.congrats_text;
        let x = document.documentElement.clientWidth / 2;
        let y = document.documentElement.clientHeight * 0.3;
        let metrics = context.measureText(text);
        let textWidth = metrics.width;
        let textHeight = metrics.actualBoundingBoxAscent + 
                         metrics.actualBoundingBoxDescent;

        context.fillText(text, x - textWidth / 2, y + textHeight / 2);
    }

    renderBackground(context) {
        if (this.gameWon) {
            context.fillStyle = '#98BF64';
        } else {
            context.fillStyle = '#909090';
        }
        context.fillRect(0, 0, document.documentElement.clientWidth,
            document.documentElement.clientHeight);
    }

    renderRestartGameButton(context) {
        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].draw(context);
        }
    }

    renderScore(context) {
        let text = gameText.final_score_text + ": " + mainCharacter.score;
        let x = document.documentElement.clientWidth * 0.5;
        let y = document.documentElement.clientHeight * 0.5;

        context.font = "32px Helvetica";
        context.fillStyle = "rgba(0, 0, 0, 1)";
        let metrics = context.measureText(text);
        let textWidth = metrics.width;
        let textHeight = metrics.actualBoundingBoxAscent + 
                         metrics.actualBoundingBoxDescent;
        context.fillText(text, x - textWidth / 2, y + textHeight / 2);
    }

    // TODO: Render some sort of leaderboard. 
    renderLeaderboard(context) {}

}

class GameView extends View {
    constructor() {
        super();
        this.name = "GameView";
        
        let x = document.documentElement.clientWidth * 0.75;
        let y = document.documentElement.clientHeight * 0.75;
        let w = 15;
        let h = 15;
        let fontName = "Helvetica";
        let fontSize = 10;
        let buttonColor = "rgba(255, 255, 255, 1)";
        let textColor = "rgba(0, 0, 0, 1)";
        
        let upButton = new Button(x, y, w, h, buttonColor, textColor, fontName,
            fontSize, "Up", true, () => {
                mainCharacter.moveCharacterUp()
            });

        let downButton = new Button(x, y + 50, w, h, buttonColor, textColor,
            fontName, fontSize, "Down", true, () => {
                mainCharacter.moveCharacterDown();
            });
        
        let shootButton = new Button (x + w + 40, y + 25, 2 * w, h + 25, 
            buttonColor, textColor, fontName, fontSize, "Shoot", true, () => {
                shootBullet();
            });
        
        x = document.documentElement.clientWidth * 0.82;
        y = 55;
        w = 50;
        h = 15;
    
        let pauseButton = new Button (x, y, w, h, buttonColor, textColor, 
            fontName, fontSize, "Pause", true, () => {
                stateStack.push(new PauseView());
            });
        
        this.buttons = [upButton, downButton, shootButton, pauseButton];
    }

    renderAll(context) {
        super.renderAll(context);
        this.renderBackground(context);
        this.renderBullets(context);
        this.renderSources(context);
        this.renderHazards(context);
        this.renderCharacter(context);
        this.renderScore(context);
        this.renderHealth(context);
        this.renderLevel(context);
        this.renderButtons(context);
    }

    renderBackground(context) {
        var bgImage = new Image();
        bgImage.src = 'assets/bg.png';
        let bgWidth = document.documentElement.clientWidth;
        let bgHeight = document.documentElement.clientHeight;
        context.drawImage(bgImage, 0, 0, bgWidth, bgHeight);
    }
    
    renderCharacter(context) {
        mainCharacter.draw(context);
    }
    
    renderBullets(context) {
        for (let i = 0; i < bullets.length; i++) {
            let bullet = bullets[i];
            bullet.draw(context);
        }
    }
    
    renderHazards(context) {
        for (let i = 0; i < hazards.length; i++) {
            let hazard = hazards[i];
            hazard.draw(context);
        }
    }

    renderLevel(context) {
        let text = gameText.level_text + ": " + level;
        context.font = "16px Times\ New\ Roman";
        context.fillStyle = 'rgba(0, 0, 255, 1)';
        context.fillText(text, 0.1 * document.documentElement.clientWidth, 35)
    }

    // TODO: Make into health bar.
    renderHealth(context) {
        // Draw health:
        let text = gameText.health_text + ": " + mainCharacter.health;
        context.font = "16px Times\ New\ Roman";
        context.fillStyle = 'rgba(0, 0, 255, 1)';
        context.fillText(text, 0.1 * document.documentElement.clientWidth, 75);
    }
    
    renderScore(context) {        
        let text = gameText.score_text + ": " + mainCharacter.score + 
                   '/' + levelInfo.maxPoints;
        context.font = "16px Times\ New\ Roman";
        context.fillStyle = 'rgba(0, 0, 255, 1)';
        context.fillText(text, 0.1 * document.documentElement.clientWidth, 55);
    }
    
    renderSources(context) {
        for (let i = 0; i < sources.length; i++) {
            let source = sources[i];
            source.draw(context);
        }
    }

    renderButtons(context) {
        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].draw(context);
        }
    }

}

class PauseView extends GameView {
    constructor() {
        super();
        this.name = "PauseView";
        // Restart
        let x = document.documentElement.clientWidth / 2;
        let y = document.documentElement.clientHeight / 2;
        let w = 40;
        let h = 15;
        let buttonColor = "rgba(255, 255, 255, 1)";
        let textColor = "rgba(0, 0, 0, 1)";
        let fontName = "Helvetica";
        let fontSize = 12;
        let text = gameText.restart_text;

        // Don't let buttons work while paused:
        for (var button of this.buttons) {
            button.fn = null;
        }
        this.buttons.push(new Button(x, y, w, h, buttonColor, textColor, 
            fontName, fontSize, text, true, () => {
                stateStack.pop();
                stateStack.pop(); // Pop twice to get to the main screen.
                // Restart any data
                resetGame();    
            }));

        // Resume
        y += 40;
        text = gameText.resume_text;
        this.buttons.push(new Button(x, y, w, h, buttonColor, textColor, 
            fontName, fontSize, text, true, () => { stateStack.pop(); }));
    }

    renderAll(context) {
        super.renderAll(context);
        // First render buttons related to the game. Then apply the blur, and
        // lastly render the pause view buttons:
        this.renderGameButtons(context);
        this.renderBackgroundBlur(context);
        this.renderButtons(context);
    }

    renderGameButtons(context) {
        for (let i = 0; i < this.buttons.length; i++) {
            // Game buttons have no functionality, i.e. no function:
            if (this.buttons[i].fn === null) {
                this.buttons[i].draw(context);
            }
        }
    }

    renderBackgroundBlur(context) {
        context.fillStyle = 'rgba(0, 0, 0, .5)';
        context.fillRect(0, 0, document.documentElement.clientWidth, 
            document.documentElement.clientHeight);
    }

    renderButtons(context) {
        for (let i = 0; i < this.buttons.length; i++) {
            if (this.buttons[i].fn !== null) {
                this.buttons[i].draw(context);
            }  
        }
    }
}

function partitionScript(script, context) {
    context.save();
    if (typeof script === 'undefined') {
        console.error("Error found: script text is undefined.");
        return;
    }

    let maxWidth = document.documentElement.clientWidth / 2;
    var words = script.split(" ");
    var allLines = [];
    var currentLine = words[0];
    context.font = '20px Helvetica';

    for (var i = 1; i < words.length; i++) {
        var word = words[i];
        var width = context.measureText(currentLine + " " + word).width;
        if (width < maxWidth) {
            currentLine += " " + word;
        } else {
            allLines.push(currentLine);
            currentLine = word;
        }
    }
    allLines.push(currentLine);
    context.restore();

    // height of the first line, but they should all be the same
    let textMetrics = context.measureText(currentLine[0]);
    let h = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;
    return {lines: allLines, height: h}
}

class PortraitView extends View {
    constructor() {
        super();
        this.name = "PortraitView"
    }

    renderAll(context) {
        super.renderAll(context);
        this.renderBackground(context);
        this.renderMessage(context);
    }

    renderBackground(context) {
        var bgImage = new Image();
        bgImage.src = 'assets/bg.png';
        let bgWidth = document.documentElement.clientWidth;
        let bgHeight = document.documentElement.clientHeight;
        context.drawImage(bgImage, 0, 0, bgHeight, bgHeight);
    }

    renderMessage(context) {
        let script = partitionScript(gameText.rotate_phone_text, context);
        context.save();
        context.shadowColor = "#000";
        context.shadowBlur = 3;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 1;
        if (script != undefined && script.lines.length > 0) {
            context.font = "20px Helvetica bold";
            context.fillStyle = 'rgba(255, 255, 255, 1)';
            context.textAlign = 'center';
            let x = document.documentElement.clientWidth / 2;
            let y = document.documentElement.clientHeight*0.5;
            let margin = 15;
            for (let i = 0; i < script.lines.length; i++) {
                context.fillText(script.lines[i], x, y);
                y += script.height + margin;
            }
        }        
        context.restore();

    }
}

// To create buttons, create an instance of this Button class. It contains
// helpful methods such as drawing and a 'wasClicked' method.
// fn is a function that represents the function to be executed when the
// button is clicked.
class Button {
    constructor(x, y, w, h, buttonColor, textColor, fontName, fontSize, text, hasShadow, fn) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.buttonColor = buttonColor;
        this.textColor = textColor;
        this.font = fontSize + "px " + fontName;
        this.text = text;
        this.hasShadow = hasShadow;
        this.fn = (typeof fn == "undefined") ? null : fn;
    }

    draw(context) {
        context.fillStyle = this.buttonColor;
        if (this.hasShadow) {
            context.save();
            context.shadowColor = "#000";
            context.shadowBlur = 3;
            context.shadowOffsetX = 0;
            context.shadowOffsetY = 1;
        }
        context.fillRect(this.x - this.w, this.y - this.h,
                         this.w * 2, this.h * 2);

        if (this.hasShadow) context.restore();
        
        context.font = this.font;
        context.fillStyle = this.textColor;

        // Citation: https://stackoverflow.com/questions/1134586/how-can-you-find-the-height-of-text-on-an-html-canvas
        let metrics = context.measureText(this.text);
        let textWidth = metrics.width;
        
        let textHeight = metrics.actualBoundingBoxAscent + 
                         metrics.actualBoundingBoxDescent;
        context.fillText(this.text, this.x - textWidth / 2, this.y + textHeight / 2);
    }

    wasClicked(x, y) {
        let buttonX0 = this.x - this.w;
        let buttonY0 = this.y - this.h;
        let buttonX1 = buttonX0 + 2 * this.w;
        let buttonY1 = buttonY0 + 2 * this.h;

        if (x > buttonX0 && x < buttonX1 && y > buttonY0 && y < buttonY1) {
            if (this.fn !== null) {
                this.fn();
            }
            return true;
        }

        return false;
    }
}