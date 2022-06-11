// Class for rendering views of the game.

// This is the main view. Only put rendering/updating code in here that will
// persist throughout the entire experience.
class View {
    constructor() {
        this.name = "View";
    }

    renderAll(context) {}
}

class NextLevelView extends View {
    constructor() {
        super();
        this.name = "NextLevelView";
    }

    renderAll(context) {
        super.renderAll(context);
        this.renderText(context);
        this.renderScript(context);
        this.renderNextLevelText(context);
    }

    renderText(context) {
        let text = gameText.congrats_text_next_level;
        var textWidth = context.measureText(text).width;
        context.font = "64px Helvetica";
        context.fillStyle = 'rgba(0, 0, 0, 1)';
        context.fillText(text, document.documentElement.clientWidth / 2 - textWidth / 2, 
                         document.documentElement.clientHeight * 0.35);
    }

    renderScript(context) {
        let scriptText = gameText.villian_scripts[level - 1];
        let partitionedScript = partitionScript(scriptText, context);
        if (partitionedScript != undefined && partitionedScript.lines.length > 0) {
            context.font = "36px Helvetica";
            context.fillStyle = 'rgba(0, 0, 0, 1)';
            let x = document.documentElement.clientWidth / 2 - 
                    context.measureText(partitionedScript.lines[0]).width / 2;
            let y = document.documentElement.clientHeight * 0.45;
            let margin = 10; // 10px margin
            for (let i = 0; i < partitionedScript.lines.length; i++) {
                context.fillText(partitionedScript.lines[i], x, y)
                y += partitionedScript.height + margin;
            }
        }
    }

    renderNextLevelText(context) {
        let text = gameText.next_level_text;
        var textWidth = context.measureText(text).width;
        context.font = "36px Helvetica";
        context.fillStyle = 'rgba(0, 0, 0, 1)';
        context.fillText(text, document.documentElement.clientWidth / 2 - textWidth / 2, 
                         document.documentElement.clientHeight * 0.65);
    }
}

class PauseView extends View {
    constructor() {
        super();
        this.name = "PauseView";
        // Restart
        let x = document.documentElement.clientWidth / 2;
        let y = document.documentElement.clientHeight / 2;
        let w = 100;
        let h = 30;
        let fontName = "Helvetica";
        let fontSize = 24;
        let text = gameText.pause_text;
        this.buttons = [new Button(x, y, w, h, fontName, fontSize, text)];

        // Resume
        y += 75;
        text = gameText.resume_text;
        this.buttons.push(new Button(x, y, w, h, fontName, fontSize, text));
    }

    renderAll(context) {
        super.renderAll(context);
        this.renderBackground(context);
        this.renderButtons(context);
    }

    renderBackground(context) {
        context.fillStyle = "rgba(80, 80, 80, 1)";
        context.fillRect(0, 0, document.documentElement.clientWidth, 
            document.documentElement.clientHeight);
    }

    renderButtons(context) {
        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].draw(context);
        }
    }
}

class StartScreenView extends View { // subclass of View
    constructor() {
        super();
        this.name = "StartScreenView";
        this.buttons = [];
        let margin = 20;
        let w = document.documentElement.clientWidth * 0.02;
        let h = document.documentElement.clientHeight * 0.02;
        let fontName = "Helvetica";
        let fontSize = 20;

        for (let i = 0; i < supportedLanguages.length; i++) {
            let x = document.documentElement.clientWidth * 0.8;
            let y = document.documentElement.clientHeight * 0.1 + (h * i) + (margin * i);
            let text = languageMap[supportedLanguages[i]];
            this.buttons.push(new Button(x, y, w, h, fontName, fontSize, text, () => {
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
        var textWidth = context.measureText(text).width;
        let margin = 50;
        context.font = "30px Helvetica";
        context.fillStyle = 'rgba(255, 255, 255, 1)';
        context.textAlign = 'center';
        context.fillText(text, document.documentElement.clientWidth / 2 - textWidth/2, 
                         document.documentElement.clientHeight*0.6);
        
        for (let i = 0; i < gameText.instructions.length; i++) {
            text = gameText.instructions[i];
            context.fillText(text, document.documentElement.clientWidth / 2 - textWidth / 2, 
                         document.documentElement.clientHeight * 0.6 + (margin * (i + 1)));
        }
        context.restore();
    }

    renderBackground(context) {
        var bgImage = new Image();
        bgImage.src = 'assets/mainBG.jpg';
        let bgWidth = document.documentElement.clientWidth;
        let bgHeight = document.documentElement.clientHeight;
        context.drawImage(bgImage, 0, 0, bgWidth, bgHeight);

    }

    renderTitle(context) {
        var titleImage = new Image();
        titleImage.src = 'assets/title.webp';
        let titleWidth = document.documentElement.clientWidth / 4
        let titleHeight = document.documentElement.clientHeight / 4 
        let x0 = document.documentElement.clientWidth / 2 - titleWidth / 2
        let y0 = document.documentElement.clientHeight * 0.3
        context.drawImage(titleImage, x0, y0, titleWidth, titleHeight)
    }

    renderLanguageOptions(context) {
        for (let i = 0; i < this.buttons.length; i++) {
            let button = this.buttons[i];
            button.draw(context);
        }
    }
}

class LevelView extends View {
    constructor() {
        super();
        this.name = "LevelView";
    }

    renderAll(context) {
        super.renderAll(context);
        this.renderBackground(context);
        this.renderLv1(context);

    }

    renderBackground(context) {
        context.fillStyle = 'rgba(0, 0, 0, 0.4)';
        context.fillRect(0, 0, document.documentElement.clientWidth, 
            document.documentElement.clientHeight);
    }

    renderLv1(context) {
        context.fillStyle = 'rgba(255, 255, 255, 1)'
        let imgWidth = document.documentElement.clientWidth / 10
        let imgHeight = document.documentElement.clientHeight / 6 
        let x0 = document.documentElement.clientWidth *1 / 7 - imgWidth*1 / 7
        let y0 = document.documentElement.clientHeight * 0.1
        context.fillRect(x0, y0, imgWidth, imgHeight)
        context.fillStyle = 'rgba(0, 0, 0, 1)'
        context.fillText('1', x0, y0)
    }
}

class GameOverView extends View {
    constructor() {
        super();
        this.name = "GameOverView";
        let text = gameText.play_again_text;
        let x = document.documentElement.clientWidth * 0.5;
        let y = document.documentElement.clientHeight * 0.66;
        let w = 100;
        let h = 30;
        let fontSize = 25;
        let fontName = "Helvetica";
        this.buttons = [new Button(x, y, w, h, fontName, fontSize, text)];
        this.gameWon = mainCharacter.health > 0 ? true : false;
    }

    renderAll(context) {
        super.renderAll(context);
        this.renderBackground(context);
        this.gameWon ? this.renderCongratsText : this.renderTryAgainText;
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
        context.fillStyle = 'rgba(225, 225, 225, 1)';
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
    }

    renderBackground(context) {
        context.fillStyle = 'rgba(0, 0, 0, 0.4)';
        context.fillRect(0, 0, document.documentElement.clientWidth, 
            document.documentElement.clientHeight);
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

    renderHealth(context) {
        // Draw health:
        let text = gameText.health_text + ": " + mainCharacter.health;
        context.font = "30px Times\ New\ Roman";
        context.fillStyle = 'rgba(0, 0, 255, 1)';
        context.fillText(text, 0.82 * document.documentElement.clientWidth, 70);
    }
    
    renderScore(context) {        
        let text = gameText.score_text + ": " + mainCharacter.score;
        context.font = "30px Times\ New\ Roman";
        context.fillStyle = 'rgba(0, 0, 255, 1)';
        context.fillText(text, 0.82 * document.documentElement.clientWidth, 35);
    }
    
    renderSources(context) {
        for (let i = 0; i < sources.length; i++) {
            let source = sources[i];
            source.draw(context);
        }
    }

    renderLevel(context) {
        let scoreText = "Level: " + level;
        context.font = "30px Times\ New\ Roman";
        context.fillStyle = 'rgba(0, 0, 255, 1)';
        context.fillText(scoreText, 0.1 * document.documentElement.clientWidth, 35);
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

// To create buttons, create an instance of this Button class. It contains
// helpful methods such as drawing and a 'wasClicked' method.
class Button {
    constructor(x, y, w, h, fontName, fontSize, text, fn) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.font = fontSize + "px " + fontName;
        this.text = text;
        this.fn = (typeof fn === "undefined") ? null : fn;
    }

    draw(context) {
        context.fillStyle = "rgba(255, 255, 255, 1)";
        context.fillRect(this.x - this.w, this.y - this.h,
                         this.w * 2, this.h * 2);
        
        context.font = this.font;
        context.fillStyle = "rgba(0, 0, 0, 1)";

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