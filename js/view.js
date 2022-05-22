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
        this.renderText(context);
        this.renderScript(context);
        this.renderNextLevelText(context);
    }

    renderText(context) {
        let text = "Congrats!!";
        var textWidth = context.measureText(text).width;
        context.font = "64px Helvetica";
        context.fillStyle = 'rgba(0, 0, 0, 1)';
        context.fillText(text, document.documentElement.clientWidth / 2 - textWidth / 2, 
                         document.documentElement.clientHeight * 0.35);
    }

    renderScript(context) {
        let scriptText = villanScripts[level - 1];
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
        let text = "Press Space to go to next level.";
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
    }

    renderAll(context) {
        this.renderBackground(context);
        this.renderButtons(context);
    }

    renderBackground(context) {
        context.fillStyle = "rgba(80, 80, 80, 1)";
        context.fillRect(0, 0, document.documentElement.clientWidth, 
            document.documentElement.clientHeight);
    }

    renderButtons(context) {
        // Restart
        let x = document.documentElement.clientWidth / 2;
        let y = document.documentElement.clientHeight / 2;
        this.renderButton(context, x, y, "Restart");

        // Resume
        y += 75;
        this.renderButton(context, x, y, "Resume");
    }

    renderButton(context, x, y, text) {
        context.fillStyle = "rgba(255, 255, 255, 1)";
        let buttonWidth = 100;
        let buttonHeight = 30;
        context.fillRect(x - buttonWidth, y - buttonHeight,
                         buttonWidth * 2, buttonHeight * 2);
        
        context.font = "25px Helvetica";
        context.fillStyle = "rgba(0, 0, 0, 1)";

        // https://stackoverflow.com/questions/1134586/how-can-you-find-the-height-of-text-on-an-html-canvas
        let metrics = context.measureText(text);
        let textWidth = metrics.width;
        
        let textHeight = metrics.actualBoundingBoxAscent + 
                         metrics.actualBoundingBoxDescent;
        context.fillText(text, x - textWidth / 2, y + textHeight / 2);
    }
}

class StartScreenView extends View { // subclass of View
    constructor() {
        super();
        this.name = "StartScreenView";
    }

    renderAll(context) {
        // super(context);
        // Write render code here.
        this.renderBackground(context);
        this.renderTitle(context);
        this.renderInstructions(context);
    }

    renderInstructions(context) {
        let text = "↓ Press Space to play! ↓";
        var textWidth = context.measureText(text).width;
        context.font = "30px Helvetica";
        context.fillStyle = 'rgba(255, 255, 255, 1)';
        context.fillText(text, document.documentElement.clientWidth / 2 - textWidth/2, 
                         document.documentElement.clientHeight*0.6);
    }

    renderBackground(context) {
        var bgImage = new Image();
        bgImage.src = 'assets/mainBG.jpg';
        let bgWidth = document.documentElement.clientWidth
        let bgHeight = document.documentElement.clientHeight
        context.drawImage(bgImage, 0, 0, bgWidth, bgHeight)

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
}

class LevelView extends View {
    constructor() {
        super();
        this.name = "LevelView";
    }

    renderAll(context) {
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

class GameView extends View {
    constructor() {
        super();
        this.name = "GameView";
    }

    renderAll(context) {
        // super(context);
        // Call all render functions. Remember that every call will overlap on
        // top of each other, so order matters. Adjust order as needed.
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
        let text = "Health: " + mainCharacter.health;
        context.font = "30px Times\ New\ Roman";
        context.fillStyle = 'rgba(0, 0, 255, 1)';
        context.fillText(text, 0.82 * document.documentElement.clientWidth, 70);
    }
    
    renderScore(context) {
        // Create background box:
        context.fillStyle = 'rgba(255, 255, 255, 1)';
        context.fillRect(0.8 * document.documentElement.clientWidth, 0,
                         0.2 * document.documentElement.clientWidth,  
                         0.05 * document.documentElement.clientHeight);
        
        // Draw score:
        let text = "Score: " + mainCharacter.score;
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
