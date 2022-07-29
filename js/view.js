// Class for rendering views of the game.

// This is the main view. Only put rendering/updating code in here that will
// persist throughout the entire experience.

CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    this.beginPath();
    this.moveTo(x+r, y);
    this.arcTo(x+w, y,   x+w, y+h, r);
    this.arcTo(x+w, y+h, x,   y+h, r);
    this.arcTo(x,   y+h, x,   y,   r);
    this.arcTo(x,   y,   x+w, y,   r);
    this.closePath();
    return this;
  }

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
        this.bgImage = new Image();
        // Image credit: https://www.freepik.com/vectors/slum
        this.bgImage.src = 'assets/village_bg.jpg';
    }

    renderAll(context) {
        super.renderAll(context);
        this.renderBackground(context);
        // TO DO: Uncomment once antagonist asset is supplied:
        this.renderAntagonist(context);
        this.renderNextLevelText(context);
        this.renderScript(context);
    }

    renderBackground(context) {
        let bgWidth = document.documentElement.clientWidth;
        let bgHeight = document.documentElement.clientHeight;
        context.drawImage(this.bgImage, 0, 0, bgWidth, bgHeight);

        context.save();
        context.fillStyle = 'rgba(0, 0, 0, 0.3)';
        context.fillRect(0, 0, bgWidth, bgHeight);
        context.restore();

    }

    renderAntagonist(context) {
        let x = document.documentElement.clientWidth / 5;
        let y = document.documentElement.clientHeight / 2 - (antagonist.h / 2);
        antagonist.draw(context, x, y);
    }

    renderScript(context) {
        if(mainCharacter.gender == true)
        {
        let scriptText = gameText.villian_scripts_male[level];
        }
        else
        {
        let scriptText = gameText.villian_scripts_female[level];
        }
        let partitionedScript = partitionScript(scriptText, context);
        if (partitionedScript != undefined && partitionedScript.lines.length > 0) {
            context.font = "600 20px 'Roboto', sans-serif";
            context.fillStyle = 'rgba(255, 255, 255, 1)';
            let x = document.documentElement.clientWidth * 0.64 - 
                    context.measureText(partitionedScript.lines[0]).width / 2;
            let y = document.documentElement.clientHeight * 0.45;
            let margin = 15;
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
        context.fillText(text, document.documentElement.clientWidth * 0.64 - textWidth / 2, 
                         document.documentElement.clientHeight * 0.75);
    }
}

class InstructionsView extends View {
    constructor() {
        super();
        this.name = "InstructionsView";

        let closeWidth;
        let closeHeight;
        let closeX;
        let closeY;
        let fontName;
        if(document.documentElement.clientWidth > 1000)
        {
            closeWidth = 80;
            closeHeight = 30;
            closeX = document.documentElement.clientWidth - closeWidth - 10;
            closeY = closeHeight + 10;
            fontName = "'Roboto', sans-serif;";
        }
        else
        {
            closeWidth = 40;
            closeHeight = 15;
            closeX = document.documentElement.clientWidth - closeWidth - 10;
            closeY = closeHeight + 10;
            fontName = "'Roboto', sans-serif;";
        }
        this.closeButton = new Button(closeX, closeY, closeWidth, closeHeight, '#FFF', '#000', fontName, 20, "Close", true, () => {
            stateStack.pop();
        });


        this.bgImage = new Image();
        this.bgImage.src = 'assets/village_bg.jpg';
    }

    renderAll(context) {
        super.renderAll(context);
        this.renderBackground(context);
        this.renderTitle(context);
        this.renderInstructions(context);
        this.renderButton(context);
        // this.renderLanguageOptions(context);
    }

    renderBackground(context) {
        let bgWidth = document.documentElement.clientWidth;
        let bgHeight = document.documentElement.clientHeight;
        context.drawImage(this.bgImage, 0, 0, bgWidth, bgHeight);
    }

    renderInstructions(context) {
        context.save();
        // let text = gameText.press_to_play_text;
        // let margin = 20;
        if(document.documentElement.clientWidth > 1000)
        {
            context.fillColor = 'rgba(0, 0, 0, 1)';
            context.globalAlpha = 0.8;
            /// get width of text
            var width = document.documentElement.clientWidth * 0.50;
            var height = document.documentElement.clientHeight * 0.50;
            context.roundRect((document.documentElement.clientWidth / 2) - width/2, 
            document.documentElement.clientHeight * 0.35, width, height, 20).fill();
            context.globalAlpha = 1;
            let food1 = new Image();
            let food2 = new Image();
            let food3 = new Image();
            food1.src = 'assets/food1.png';
            food2.src = 'assets/food2.png';
            food3.src = 'assets/food3.png';
            context.drawImage(food1, (document.documentElement.clientWidth / 2) - width/2 + 10, 
            document.documentElement.clientHeight * 0.35, 50, 50);
            context.drawImage(food2, (document.documentElement.clientWidth / 2) - width/2 + 60, 
            document.documentElement.clientHeight * 0.35, 50, 50);
            context.drawImage(food3, (document.documentElement.clientWidth / 2) - width/2 + 110, 
            document.documentElement.clientHeight * 0.35, 50, 50);

            context.font = "500 15px 'Roboto', sans-serif";
            context.fillStyle = '#FFF';
            context.textAlign = 'left';
            context.fillText(gameText.elements[1], (document.documentElement.clientWidth / 2) - width/2 + 170, 
            document.documentElement.clientHeight * 0.35 + 30);

            let rottenFood1 = new Image();
            let rottenFood2 = new Image();
            let rottenFood3 = new Image();
            rottenFood1.src = 'assets/food1-rotten.png';
            rottenFood2.src = 'assets/food2-rotten.png';
            rottenFood3.src = 'assets/food3-rotten.png';
            context.drawImage(rottenFood1, (document.documentElement.clientWidth / 2) - width/2 + 10, 
            document.documentElement.clientHeight * 0.35 + 60, 50, 50);
            context.drawImage(rottenFood2, (document.documentElement.clientWidth / 2) - width/2 + 60, 
            document.documentElement.clientHeight * 0.35 + 60, 50, 50);
            context.drawImage(rottenFood3, (document.documentElement.clientWidth / 2) - width/2 + 110, 
            document.documentElement.clientHeight * 0.35 + 60, 50, 50);

            context.font = "500 15px 'Roboto', sans-serif";
            context.fillStyle = '#FFF';
            context.fillText(gameText.elements[2], (document.documentElement.clientWidth / 2) - width/2 + 170, 
            document.documentElement.clientHeight * 0.35 + 80);
            context.fillText(gameText.elements[3], (document.documentElement.clientWidth / 2) - width/2 + 170, 
            document.documentElement.clientHeight * 0.35 + 100);

            let stove = new Image();
            let smoke = new Image();
            stove.src = 'assets/stove.png';
            smoke.src = 'assets/smoke.png';
            context.drawImage(stove, (document.documentElement.clientWidth / 2) - width/2 + 10, 
            document.documentElement.clientHeight * 0.35 + 120, 50, 50);
            context.drawImage(smoke, (document.documentElement.clientWidth / 2) - width/2 + 60, 
            document.documentElement.clientHeight * 0.35 + 120, 50, 50);

            context.fillText(gameText.elements[4], (document.documentElement.clientWidth / 2) - width/2 + 170, 
            document.documentElement.clientHeight * 0.35 + 150);
            context.fillText(gameText.elements[5], (document.documentElement.clientWidth / 2) - width/2 + 170, 
            document.documentElement.clientHeight * 0.35 + 170);

            let hand0 = new Image();
            let hand1 = new Image();
            let hand2 = new Image();
            let hand3 = new Image();
            hand0.src = "assets/hand0.png";
            hand1.src = "assets/hand1.png";
            hand2.src = "assets/hand2.png";
            hand3.src = "assets/hand3.png";
            context.drawImage(hand0, (document.documentElement.clientWidth / 2) - width/2 + 10, 
            document.documentElement.clientHeight * 0.35 + 180, 50, 50);            
            context.drawImage(hand1, (document.documentElement.clientWidth / 2) - width/2 + 60, 
            document.documentElement.clientHeight * 0.35 + 180, 50, 50);
            context.drawImage(hand2, (document.documentElement.clientWidth / 2) - width/2 + 110, 
            document.documentElement.clientHeight * 0.35 + 180, 50, 50);
            context.drawImage(hand3, (document.documentElement.clientWidth / 2) - width/2 + 160, 
            document.documentElement.clientHeight * 0.35 + 180, 50, 50);

            context.fillText(gameText.elements[6], (document.documentElement.clientWidth / 2) - width/2 + 230, 
            document.documentElement.clientHeight * 0.35 + 200);
            context.fillText(gameText.elements[7], (document.documentElement.clientWidth / 2) - width/2 + 230, 
            document.documentElement.clientHeight * 0.35 + 220);

            let germ1 = new Image();
            let germ2 = new Image();
            let germ3 = new Image();
            let germ4 = new Image();
            germ1.src = "assets/germ1.png";
            germ2.src = "assets/germ2.png";
            germ3.src = "assets/germ3.png";
            germ4.src = "assets/germ4.png";

            context.drawImage(germ1, (document.documentElement.clientWidth / 2) - width/2 + 10, 
            document.documentElement.clientHeight * 0.35 + 240, 50, 50);
            context.drawImage(germ2, (document.documentElement.clientWidth / 2) - width/2 + 60, 
            document.documentElement.clientHeight * 0.35 + 240, 50, 50);
            context.drawImage(germ3, (document.documentElement.clientWidth / 2) - width/2 + 110, 
            document.documentElement.clientHeight * 0.35 + 240, 50, 50);
            context.drawImage(germ4, (document.documentElement.clientWidth / 2) - width/2 + 160, 
            document.documentElement.clientHeight * 0.35 + 240, 50, 50);
            context.fillText(gameText.elements[8], (document.documentElement.clientWidth / 2) - width/2 + 230, 
            document.documentElement.clientHeight * 0.35 + 260);
            context.fillText(gameText.elements[9], (document.documentElement.clientWidth / 2) - width/2 + 230, 
            document.documentElement.clientHeight * 0.35 + 280);
                        
        }
        else
        {
            context.fillColor = 'rgba(0, 0, 0, 1)';
            context.globalAlpha = 0.8;
            /// get width of text
            var width = document.documentElement.clientWidth * 0.90;
            var height = document.documentElement.clientHeight * 0.80;
            context.roundRect((document.documentElement.clientWidth / 2) - width/2, 
            document.documentElement.clientHeight * 0.15, width, height, 20).fill();
            context.globalAlpha = 1;
            let food1 = new Image();
            let food2 = new Image();
            let food3 = new Image();
            food1.src = 'assets/food1.png';
            food2.src = 'assets/food2.png';
            food3.src = 'assets/food3.png';
            context.drawImage(food1, (document.documentElement.clientWidth / 2) - width/2 + 10, 
            document.documentElement.clientHeight * 0.15, 50, 50);
            context.drawImage(food2, (document.documentElement.clientWidth / 2) - width/2 + 60, 
            document.documentElement.clientHeight * 0.15, 50, 50);
            context.drawImage(food3, (document.documentElement.clientWidth / 2) - width/2 + 110, 
            document.documentElement.clientHeight * 0.15, 50, 50);
    
            context.font = "500 12px 'Roboto', sans-serif";
            context.fillStyle = '#FFF';
            context.textAlign = 'left';
            context.fillText(gameText.elements[1], (document.documentElement.clientWidth / 2) - width/2 + 170, 
            document.documentElement.clientHeight * 0.15 + 30);
    
            let rottenFood1 = new Image();
            let rottenFood2 = new Image();
            let rottenFood3 = new Image();
            rottenFood1.src = 'assets/food1-rotten.png';
            rottenFood2.src = 'assets/food2-rotten.png';
            rottenFood3.src = 'assets/food3-rotten.png';
            context.drawImage(rottenFood1, (document.documentElement.clientWidth / 2) - width/2 + 10, 
            document.documentElement.clientHeight * 0.15 + 60, 50, 50);
            context.drawImage(rottenFood2, (document.documentElement.clientWidth / 2) - width/2 + 60, 
            document.documentElement.clientHeight * 0.15 + 60, 50, 50);
            context.drawImage(rottenFood3, (document.documentElement.clientWidth / 2) - width/2 + 110, 
            document.documentElement.clientHeight * 0.15 + 60, 50, 50);
    
            context.font = "500 12px 'Roboto', sans-serif";
            context.fillStyle = '#FFF';
            context.fillText(gameText.elements[2], (document.documentElement.clientWidth / 2) - width/2 + 170, 
            document.documentElement.clientHeight * 0.15 + 80);
            context.fillText(gameText.elements[3], (document.documentElement.clientWidth / 2) - width/2 + 170, 
            document.documentElement.clientHeight * 0.15 + 100);
    
            let stove = new Image();
            let smoke = new Image();
            stove.src = 'assets/stove.png';
            smoke.src = 'assets/smoke.png';
            context.drawImage(stove, (document.documentElement.clientWidth / 2) - width/2 + 10, 
            document.documentElement.clientHeight * 0.15 + 120, 50, 50);
            context.drawImage(smoke, (document.documentElement.clientWidth / 2) - width/2 + 60, 
            document.documentElement.clientHeight * 0.15 + 120, 50, 50);
    
            context.fillText(gameText.elements[4], (document.documentElement.clientWidth / 2) - width/2 + 170, 
            document.documentElement.clientHeight * 0.15 + 150);
            context.fillText(gameText.elements[5], (document.documentElement.clientWidth / 2) - width/2 + 170, 
            document.documentElement.clientHeight * 0.15 + 170);
    
            let hand0 = new Image();
            let hand1 = new Image();
            let hand2 = new Image();
            let hand3 = new Image();
            hand0.src = "assets/hand0.png";
            hand1.src = "assets/hand1.png";
            hand2.src = "assets/hand2.png";
            hand3.src = "assets/hand3.png";
            context.drawImage(hand0, (document.documentElement.clientWidth / 2) - width/2 + 10, 
            document.documentElement.clientHeight * 0.15 + 180, 50, 50);
            context.drawImage(hand1, (document.documentElement.clientWidth / 2) - width/2 + 60, 
            document.documentElement.clientHeight * 0.15 + 180, 50, 50);
            context.drawImage(hand2, (document.documentElement.clientWidth / 2) - width/2 + 110, 
            document.documentElement.clientHeight * 0.15 + 180, 50, 50);
            context.drawImage(hand3, (document.documentElement.clientWidth / 2) - width/2 + 160, 
            document.documentElement.clientHeight * 0.15 + 180, 50, 50);            
    
            context.fillText(gameText.elements[6], (document.documentElement.clientWidth / 2) - width/2 + 230, 
            document.documentElement.clientHeight * 0.15 + 200);
            context.fillText(gameText.elements[7], (document.documentElement.clientWidth / 2) - width/2 + 230, 
            document.documentElement.clientHeight * 0.15 + 220);
    
            let germ1 = new Image();
            let germ2 = new Image();
            let germ3 = new Image();
            let germ4 = new Image();
            germ1.src = "assets/germ1.png";
            germ2.src = "assets/germ2.png";
            germ3.src = "assets/germ3.png";
            germ4.src = "assets/germ4.png";
    
            context.drawImage(germ1, (document.documentElement.clientWidth / 2) - width/2 + 10, 
            document.documentElement.clientHeight * 0.15 + 240, 50, 50);
            context.drawImage(germ2, (document.documentElement.clientWidth / 2) - width/2 + 60, 
            document.documentElement.clientHeight * 0.15 + 240, 50, 50);
            context.drawImage(germ3, (document.documentElement.clientWidth / 2) - width/2 + 110, 
            document.documentElement.clientHeight * 0.15 + 240, 50, 50);
            context.drawImage(germ4, (document.documentElement.clientWidth / 2) - width/2 + 160, 
            document.documentElement.clientHeight * 0.15 + 240, 50, 50);
            context.fillText(gameText.elements[8], (document.documentElement.clientWidth / 2) - width/2 + 230, 
            document.documentElement.clientHeight * 0.15 + 260);
            context.fillText(gameText.elements[9], (document.documentElement.clientWidth / 2) - width/2 + 230, 
            document.documentElement.clientHeight * 0.15 + 280);
        }
        // context.shadowColor = "#000";
        // context.shadowBlur = 5;
        // context.shadowOffsetX = 0;
        // context.shadowOffsetY = 1;
        // context.globalAlpha = 1;
        // context.font = "500 17px 'Roboto', sans-serif";
        // context.fillStyle = 'rgba(255, 255, 255, 1)';
        // context.textAlign = 'center';
        // context.fillText(text, document.documentElement.clientWidth / 2, 
        //                  document.documentElement.clientHeight * 0.35 + 30);
        
        // context.font = "500 13px 'Roboto', sans-serif";
        // for (let i = 0; i < gameText.instructions.length; i++) {
        //     text = gameText.instructions[i];
        //     context.fillText(text, document.documentElement.clientWidth / 2, 
        //                  document.documentElement.clientHeight * 0.35 + (margin * (i + 1) + 30));
        // }

        context.restore();
    }

    renderTitle(context) {
        context.save();
        if(document.documentElement.clientWidth > 1000)
        {
            context.shadowColor = "#000";
            context.shadowBlur = 4;
            context.shadowOffsetX = 0;
            context.shadowOffsetY = 3;
            context.font = "900 64px 'Roboto', sans-serif";
            context.fillStyle = "rgba(255, 255, 255, 1)";
            context.textAlign = 'center';
            context.fillText("Instructions", 
                             document.documentElement.clientWidth / 2, 
                             document.documentElement.clientHeight / 4);
        }
        else
        {
            context.shadowColor = "#000";
            context.shadowBlur = 4;
            context.shadowOffsetX = 0;
            context.shadowOffsetY = 3;
            context.font = "900 30px 'Roboto', sans-serif";
            context.fillStyle = "rgba(255, 255, 255, 1)";
            context.textAlign = 'center';
            context.fillText("Instructions", 
                             document.documentElement.clientWidth / 2, 
                             document.documentElement.clientHeight / 8);
        }

        context.restore();
    }

    renderButton(context) {
        context.save();

        context.font = "700 15px 'Roboto', sans-serif";
        context.textAlign = 'left';
        if (this.closeButton.fn !== null) {
            this.closeButton.draw(context);
        }  
        
        context.restore();
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
        let fontName = "'Roboto', sans-serif;";
        let fontSize = 12;
        let buttonColor = "rgba(255, 255, 255, 1)";
        let textColor = "rgba(0, 0, 0, 1)";

        let instructionsWidth;
        let instructionsHeight;
        let instructionsX;
        let instructionsY;
        if(document.documentElement.clientWidth > 1000)
        {
            instructionsWidth = 80;
            instructionsHeight = 30;
            instructionsX = document.documentElement.clientWidth - instructionsWidth - 10;
            instructionsY = instructionsHeight + 10;
            fontName = "'Roboto', sans-serif;";
        }
        else
        {
            instructionsWidth = 50;
            instructionsHeight = 15;
            instructionsX = document.documentElement.clientWidth - instructionsWidth - 10;
            instructionsY = instructionsHeight + 10;
            fontName = "'Roboto', sans-serif;";
        }
        this.instructionsButton = new Button(instructionsX, instructionsY, instructionsWidth, instructionsHeight, '#FFF', '#000', fontName, 20, gameText.elements[0], true, () => {
            stateStack.push(new InstructionsView());
        });
        
        for (let i = 0; i < supportedLanguages.length; i++) {
            let x = instructionsX - 200;
            let y = instructionsY + instructionsHeight * i + 40 * i;
            let text = languageMap[supportedLanguages[i]];
            this.buttons.push(new Button(x, y, instructionsWidth, instructionsHeight, buttonColor, textColor, 
                fontName, 20, text, true, () => {
                    setGameLanguageAndReload(supportedLanguages[i]);
                }));
        }

        this.bgImage = new Image();
        this.bgImage.src = 'assets/village_bg.jpg';
    }

    renderAll(context) {
        super.renderAll(context);
        this.renderBackground(context);
        this.renderTitle(context);
        this.renderInstructions(context);
        this.renderCharacter(context);
        this.renderLanguageOptions(context);
    }

    renderCharacter(context) {
        context.save();
        this.characterImage1 = new Image();
        this.characterImage2 = new Image();
        this.characterImage3 = new Image();
        this.characterImage4 = new Image();
        this.characterImage1.src = 'assets/character1.png';
        this.characterImage2.src = 'assets/character2.png';
        this.characterImage3.src = 'assets/character3.png';
        this.characterImage4.src = 'assets/character4.png';

        if(document.documentElement.clientWidth < 1000)
        {
            context.drawImage(this.characterImage1, 
                ((1 * this.characterImage1.width) / 5) + 200, 
                0, 
                this.characterImage1.width / 5, 
                this.characterImage1.height, 
                (document.documentElement.clientWidth / 2) - ((this.characterImage1.width / 4 / 10) * 2), 
                document.documentElement.clientHeight * 0.20 + (20 * (4 + 1) + 30), 
                this.characterImage1.width / 5 / 10, 
                this.characterImage1.height / 10)
            context.drawImage(this.characterImage2, 
                ((1 * this.characterImage2.width) / 5) + 200, 
                0, 
                this.characterImage1.width / 5, 
                this.characterImage1.height, 
                (document.documentElement.clientWidth / 2) - ((this.characterImage1.width / 4 / 10) * 1), 
                document.documentElement.clientHeight * 0.20 + (20 * (4 + 1) + 30), 
                this.characterImage1.width / 5 / 10, 
                this.characterImage1.height / 10)
            context.drawImage(this.characterImage3, 
                ((1 * this.characterImage3.width) / 5) + 250, 
                0, 
                this.characterImage1.width / 5, 
                this.characterImage1.height, 
                document.documentElement.clientWidth / 2, 
                document.documentElement.clientHeight * 0.20 + (20 * (4 + 1) + 30), 
                this.characterImage1.width / 5 / 10, 
                this.characterImage1.height / 10)
            context.drawImage(this.characterImage4, 
                ((1 * this.characterImage4.width) / 5) + 200, 
                0, 
                this.characterImage1.width / 5, 
                this.characterImage1.height, 
                (document.documentElement.clientWidth / 2) + ((this.characterImage1.width / 4 / 10) * 1), 
                document.documentElement.clientHeight * 0.20 + (20 * (4 + 1) + 30), 
                this.characterImage1.width / 5 / 10, 
                this.characterImage1.height / 10)
        }
        else
        {
            context.drawImage(this.characterImage1, 
                ((1 * this.characterImage1.width) / 5) + 200, 
                0, 
                this.characterImage1.width / 5, 
                this.characterImage1.height, 
                (document.documentElement.clientWidth / 2) - ((this.characterImage1.width / 4 / 10) * 2), 
                document.documentElement.clientHeight * 0.35 + (20 * (4 + 1) + 30), 
                this.characterImage1.width / 5 / 10, 
                this.characterImage1.height / 10)
            context.drawImage(this.characterImage2, 
                ((1 * this.characterImage2.width) / 5) + 200, 
                0, 
                this.characterImage1.width / 5, 
                this.characterImage1.height, 
                (document.documentElement.clientWidth / 2) - ((this.characterImage1.width / 4 / 10) * 1), 
                document.documentElement.clientHeight * 0.35 + (20 * (4 + 1) + 30), 
                this.characterImage1.width / 5 / 10, 
                this.characterImage1.height / 10)
            context.drawImage(this.characterImage3, 
                ((1 * this.characterImage3.width) / 5) + 250, 
                0, 
                this.characterImage1.width / 5, 
                this.characterImage1.height, 
                document.documentElement.clientWidth / 2, 
                document.documentElement.clientHeight * 0.35 + (20 * (4 + 1) + 30), 
                this.characterImage1.width / 5 / 10, 
                this.characterImage1.height / 10)
            context.drawImage(this.characterImage4, 
                ((1 * this.characterImage4.width) / 5) + 200, 
                0, 
                this.characterImage1.width / 5, 
                this.characterImage1.height, 
                (document.documentElement.clientWidth / 2) + ((this.characterImage1.width / 4 / 10) * 1), 
                document.documentElement.clientHeight * 0.35 + (20 * (4 + 1) + 30), 
                this.characterImage1.width / 5 / 10, 
                this.characterImage1.height / 10)
        }


        context.restore();
    }

    renderInstructions(context) {
        context.save();
        if(document.documentElement.clientWidth < 1000)
        {
            let text = gameText.press_to_play_text;
            let margin = 20;
            context.fillColor = 'rgba(0, 0, 0, 1)';
            context.globalAlpha = 0.8;
            /// get width of text
            var width = 400;
            context.fillStyle = 'rgba(0, 0, 0, 1)';
            context.roundRect((document.documentElement.clientWidth / 2) - width/2, 
            document.documentElement.clientHeight * 0.20, width, 230, 20).fill();
            // context.shadowColor = "#000";
            // context.shadowBlur = 5;
            // context.shadowOffsetX = 0;
            // context.shadowOffsetY = 1;
            context.globalAlpha = 1;
            context.font = "500 17px 'Roboto', sans-serif";
            context.fillStyle = 'rgba(255, 255, 255, 1)';
            context.textAlign = 'center';
            context.fillText(text, document.documentElement.clientWidth / 2, 
                             document.documentElement.clientHeight * 0.20 + 30);
            
            context.font = "500 13px 'Roboto', sans-serif";
            for (let i = 0; i < gameText.instructions.length; i++) {
                text = gameText.instructions[i];
                context.fillText(text, document.documentElement.clientWidth / 2, 
                             document.documentElement.clientHeight * 0.20 + (margin * (i + 1) + 30));
            }
    
    
            if(document.documentElement.clientWidth > 1000)
            {
                context.font = "700 15px 'Roboto', sans-serif";
            }
            else
            {
                context.font = "700 12px 'Roboto', sans-serif";
            }
            context.textAlign = 'left';
            if (this.instructionsButton.fn !== null) {
                this.instructionsButton.draw(context);
            }  
        }
        else
        {
            let text = gameText.press_to_play_text;
            let margin = 20;
            context.fillColor = 'rgba(0, 0, 0, 1)';
            context.globalAlpha = 0.8;
            /// get width of text
            var width = 400;
            context.fillStyle = 'rgba(0, 0, 0, 1)';
            context.roundRect((document.documentElement.clientWidth / 2) - width/2, 
            document.documentElement.clientHeight * 0.35, width, 230, 20).fill();
            // context.shadowColor = "#000";
            // context.shadowBlur = 5;
            // context.shadowOffsetX = 0;
            // context.shadowOffsetY = 1;
            context.globalAlpha = 1;
            context.font = "500 17px 'Roboto', sans-serif";
            context.fillStyle = 'rgba(255, 255, 255, 1)';
            context.textAlign = 'center';
            context.fillText(text, document.documentElement.clientWidth / 2, 
                             document.documentElement.clientHeight * 0.35 + 30);
            
            context.font = "500 13px 'Roboto', sans-serif";
            for (let i = 0; i < gameText.instructions.length; i++) {
                text = gameText.instructions[i];
                context.fillText(text, document.documentElement.clientWidth / 2, 
                             document.documentElement.clientHeight * 0.35 + (margin * (i + 1) + 30));
            }
    
    
            if(document.documentElement.clientWidth > 1000)
            {
                context.font = "700 15px 'Roboto', sans-serif";
            }
            else
            {
                context.font = "700 12px 'Roboto', sans-serif";
            }
            context.textAlign = 'left';
            if (this.instructionsButton.fn !== null) {
                this.instructionsButton.draw(context);
            }  
        }

        
        
        context.restore();
    }

    // renderInstructionsBackground(context) {
    //     context.save();
    //     context.fillRect(document.documentElement.clientWidth / 2, 
    //     document.documentElement.clientHeight * 0.6, 100,)
    // }

    renderBackground(context) {
        let bgWidth = document.documentElement.clientWidth;
        let bgHeight = document.documentElement.clientHeight;
        context.drawImage(this.bgImage, 0, 0, bgWidth, bgHeight);
    }

    renderTitle(context) {
        context.save();
        context.shadowColor = "#000";
        context.shadowBlur = 4;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 3;
        if(document.documentElement.clientWidth < 1000)
        {
            context.font = "900 40px 'Roboto', sans-serif";
            context.fillStyle = "rgba(255, 255, 255, 1)";
            context.textAlign = 'center';
            context.fillText(gameText.title, 
                            document.documentElement.clientWidth / 2, 
                            document.documentElement.clientHeight / 8);
        }
        else
        {
            context.font = "900 64px 'Roboto', sans-serif";
            context.fillStyle = "rgba(255, 255, 255, 1)";
            context.textAlign = 'center';
            context.fillText(gameText.title, 
                            document.documentElement.clientWidth / 2, 
                            document.documentElement.clientHeight / 4);
        }
        
        
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
        this.bgImage = new Image();
        this.bgImage.src = this.gameWon ? "assets/win.png" : "assets/gameover.png";

        let leaderboardWidth;
        let leaderboardHeight;
        let leaderboardX;
        let leaderboardY;
        if(document.documentElement.clientWidth > 1000)
        {
            leaderboardWidth = 80;
            leaderboardHeight = 30;
            leaderboardX = document.documentElement.clientWidth - leaderboardWidth - 10;
            leaderboardY = leaderboardHeight + 10;
            fontName = "'Roboto', sans-serif;";
        }
        else
        {
            leaderboardWidth = 50;
            leaderboardHeight = 15;
            leaderboardX = document.documentElement.clientWidth - leaderboardWidth - 10;
            leaderboardY = leaderboardHeight + 10;
            fontName = "'Roboto', sans-serif;";
        }
        $('#myModal').modal('toggle');
        this.leaderboardButton = new Button(leaderboardX, leaderboardY, leaderboardWidth, leaderboardHeight, '#FFF', '#000', fontName, 20, "Leaderboard", true, () => {
            const highScores = JSON.parse(localStorage.getItem('highscores')) ?? [];
            const highScoreList = document.getElementById('leaderboardBody');

            highScoreList.innerHTML = `<table class="table">` +
            `<thead>` +
            `<tr><th scope="col">#</th><th scope="col">Name</th><th score="col">Score</th>` +
            `<tbody>` +
            highScores.map((score, ind) => 
            `<tr><th scope="row">${ind + 1}</th><td>${score.name}</td><td>${score.score}</td></tr>`
            ).join("") +
            `</tbody>` +
            `</table>`;
            $('#leaderboardModal').modal('toggle');
        });
        
        audioManager.enableOrDisableMusic("bg");
    }
    
    renderAll(context) {
        super.renderAll(context);
        this.renderBackground(context);

        this.renderRestartGameButton(context);
        this.gameWon ? 
            this.renderCongratsText(context) :
            this.renderTryAgainText(context);
        this.renderScore(context);
        // this.renderAntagonist(context);
        this.renderLeaderboard(context);
    }

    renderTryAgainText(context) {
        context.save();
        context.shadowColor = "#000";
        context.shadowBlur = 4;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 3;
        context.fillStyle = '#FFF';
        context.textAlign = "center";
        context.font = "600 32px 'Roboto', sans-serif";
        let text = gameText.try_again_text;
        let x = document.documentElement.clientWidth / 2;
        let y = document.documentElement.clientHeight * 0.3;
        let metrics = context.measureText(text);
        let textWidth = metrics.width;
        let textHeight = metrics.actualBoundingBoxAscent + 
                         metrics.actualBoundingBoxDescent;

        context.fillText(text, x, y + textHeight / 2);
        context.restore();
    }

    renderCongratsText(context) {
        context.save();
        context.shadowColor = "#000";
        context.shadowBlur = 4;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 3;
        context.fillStyle = '#FFF';
        context.textAlign = "center";
        context.font = "600 32px 'Roboto', sans-serif";
        let text = gameText.congrats_text;
        let x = document.documentElement.clientWidth * 0.5;
        let y = document.documentElement.clientHeight * 0.35;
        let metrics = context.measureText(text);
        let textHeight = metrics.actualBoundingBoxAscent + 
                         metrics.actualBoundingBoxDescent;

        context.fillText(text, x, y + textHeight / 2);
        context.restore();
    }

    renderBackground(context) {
        let bgWidth = document.documentElement.clientWidth;
        let bgHeight = document.documentElement.clientHeight;
        context.drawImage(this.bgImage, 0, 0, bgWidth, bgHeight);
    }

    renderRestartGameButton(context) {
        context.save();
        context.shadowColor = "#000";
        context.shadowBlur = 0;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.textAlign = "left";
        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].draw(context);
        }

        context.textAlign = 'left';
        if (this.leaderboardButton.fn !== null) {
            this.leaderboardButton.draw(context);
        }  
        context.restore();
    }

    renderScore(context) {
        context.save();
        let text = gameText.final_score_text + ": " + mainCharacter.finalScore;
        let x = document.documentElement.clientWidth * 0.5;
        let y = document.documentElement.clientHeight * 0.5;
        context.shadowColor = "#000";
        context.shadowBlur = 4;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 3;
        context.font = "600 32px 'Roboto', sans-serif";
        context.fillStyle = "#FFF";
        context.textAlign = "center";
        let metrics = context.measureText(text);
        let textHeight = metrics.actualBoundingBoxAscent + 
                         metrics.actualBoundingBoxDescent;
        context.fillText(text, x, y + textHeight / 2);
        context.restore();
    }

    renderAntagonist(context) {
        let x = document.documentElement.clientWidth / 6;
        let y = document.documentElement.clientHeight / 2 - (antagonist.h / 2);
        antagonist.draw(context, x, y);
    }

    // TODO: Render some sort of leaderboard if needed. 
    renderLeaderboard(context) {}

}

class GameView extends View {
    constructor() {
        super();
        this.name = "GameView";
        
        let x = document.documentElement.clientWidth * 0.60;
        let y = document.documentElement.clientHeight * 0.80;
        let w = 30;
        let h = 20;
        let fontName = "'Roboto', sans-serif";
        let fontSize = 10;
        let buttonColor = "rgba(255, 255, 255, 1)";
        let textColor = "rgba(0, 0, 0, 1)";
        
        let upButton = new Button(x, y, w, h, buttonColor, textColor, fontName,
            fontSize, "Up", true, () => {
                mainCharacter.moveCharacterUp()
            });

        let downButton = new Button(x + 140, y , w, h, buttonColor, textColor,
            fontName, fontSize, "Down", true, () => {
                mainCharacter.moveCharacterDown();
            });
        
        let shootButton = new Button (x + 70, y, w, h + 20, 
            buttonColor, textColor, fontName, fontSize, "Shoot", true, () => {
                shootBullet();
            });
        
        x = document.documentElement.clientWidth * 0.82;
        y = 55;
        w = 50;
        h = 15;
    
        this.pauseButton = new Button (x, y, w, h, buttonColor, textColor, 
            fontName, fontSize, "Pause", true, () => {
                stateStack.push(new PauseView());
            });
        
        this.buttons = [upButton, downButton, shootButton];
        this.bgImage = new Image();
        if(level == 1)
        {
            this.bgImage.src = 'assets/background1.png';
        }
        else if(level == 2)
        {
            this.bgImage.src = 'assets/background3.png';
        }
        else
        {
            this.bgImage.src = 'assets/background2.png';
        }
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
        let bgWidth = document.documentElement.clientWidth;
        let bgHeight = document.documentElement.clientHeight;
        context.drawImage(this.bgImage, 0, 0, bgWidth, bgHeight);
    }
    
    renderCharacter(context) {
        if(timeElapsed.hitTime != 0) {
            if((timeElapsed.allTime - timeElapsed.hitTime) < 0.2) return;
            else if((timeElapsed.allTime - timeElapsed.hitTime) < 0.4);
            else if((timeElapsed.allTime - timeElapsed.hitTime) < 0.6) return;
            else;
        }
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
        context.save();
        context.font = "300 16px 'Roboto', sans-serif";
        context.shadowColor = "#000";
        context.shadowBlur = 3;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.fillStyle = 'rgba(255, 255, 255, 1)';
        context.fillText(text, 0.1 * document.documentElement.clientWidth, 35);
        context.restore();
    }

    renderHealth(context) {
        context.save();
        let text = gameText.health_text + ": ";
        context.font = "300 16px 'Roboto', sans-serif";
        let metrics = context.measureText(text);
        let textWidth = metrics.width;
        let textHeight = metrics.actualBoundingBoxAscent + 
                         metrics.actualBoundingBoxDescent;
        // Draw health bar:
        let x = 0.1 * document.documentElement.clientWidth + textWidth;
        let y = 65;
        let width = 75; 
        let height = textHeight;
        context.fillStyle = 'rgba(255, 255, 255, 1)';
        context.fillRect(x, y, width, height);

        context.fillStyle = 'rgba(255, 0, 0, 1)';
        context.fillRect(x, y, width * (mainCharacter.health / 100), height);

        // Draw health:
        context.shadowColor = "#000";
        context.shadowBlur = 3;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.fillStyle = 'rgba(255, 255, 255, 1)';
        context.fillText(text, 0.1 * document.documentElement.clientWidth, 75);
        context.restore();
    }
    
    renderScore(context) {        
        let text = gameText.score_text + ": " + mainCharacter.score + 
                   '/' + levelInfo.maxPoints;
        context.save();
        context.shadowColor = "#000";
        context.shadowBlur = 3;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.font = "300 16px 'Roboto', sans-serif";
        context.fillStyle = 'rgba(255, 255, 255, 1)';
        context.fillText(text, 0.1 * document.documentElement.clientWidth, 55);
        context.restore();
    }
    
    renderSources(context) {
        for (let i = 0; i < sources.length; i++) {
            let source = sources[i];
            source.draw(context);
        }
    }

    renderButtons(context) {
        if(document.documentElement.clientWidth < 1000)
        {
            for (let i = 0; i < this.buttons.length; i++) {
                this.buttons[i].draw(context);
            }
        }
        this.pauseButton.draw(context);
    }

    changeBackground(background) {
        this.bgImage.src = background;
    }

}

class PauseView extends GameView {
    constructor() {
        super();
        this.name = "PauseView";
        // Restart
        let x;
        let y;
        if(document.documentElement.clientWidth < 1000)
        {
            x = document.documentElement.clientWidth / 2;
            y = document.documentElement.clientHeight * 0.15 + 110;
        }
        else
        {
            x = document.documentElement.clientWidth / 2;
            y = document.documentElement.clientHeight * 0.35 + 110;
        }
        
        let w = 60;
        let h = 20;
        let buttonColor = "#3c4fff";
        let textColor = "#fff";
        let fontName = "'Roboto', sans-serif";
        let fontSize = 20;
        let text = gameText.restart_text;
        let confirm = false;

        // Don't let buttons work while paused:
        for (var button of this.buttons) {
            button.fn = null;
        }

        this.buttons.push(new Button(x, y, w, h, buttonColor, textColor, 
            fontName, fontSize, text, true, () => {
                this.buttons.pop();
                this.buttons.pop();
                this.buttons.push(new Button(x, y-60, w, h, buttonColor, textColor, 
                    fontName, fontSize, gameText.yes, true, () => {
                        stateStack.pop();
                        stateStack.pop(); // Pop twice to get to the main screen.
                        // Restart any data
                        resetGame();   
                    }));

                // Resume
                text = gameText.resume_text;
                this.buttons.push(new Button(x, y, w, h, buttonColor, textColor, 
                    fontName, fontSize, gameText.no, true, () => { stateStack.pop(); }));
            }));

        // Resume
        y += 60;
        text = gameText.resume_text;
        this.buttons.push(new Button(x, y, w, h, buttonColor, textColor, 
            fontName, fontSize, text, true, () => { stateStack.pop(); }));
    }

    renderAll(context) {
        super.renderAll(context);
        // First render buttons related to the game. Then apply the blur, and
        // lastly render the pause view buttons:
        this.renderBackgroundBlur(context);
        this.renderButtons(context);
    }

    renderBackgroundBlur(context) {
        context.save();
        context.fillStyle = 'rgba(0, 0, 0, .5)';
        context.fillRect(0, 0, document.documentElement.clientWidth, 
            document.documentElement.clientHeight);
        context.restore();
    }

    renderButtons(context) {
        context.save();
        if(document.documentElement.clientWidth < 1000)
        {
            context.fillStyle = 'rgba(255, 255, 255, 1)';
            context.globalAlpha = 1;
            /// get width of text
            var width = 400;
            context.roundRect((document.documentElement.clientWidth / 2) - width/2, 
            document.documentElement.clientHeight * 0.10, width, 230, 20).fill();
    
            for (let i = 0; i < this.buttons.length; i++) {
                if (this.buttons[i].fn !== null) {
                    this.buttons[i].draw(context);
                }  
            }
    
            context.font = "700 35px 'Roboto', sans-serif";
            context.fillStyle = 'rgba(0, 0, 0, 1)';
            context.textAlign = 'center';
            if (confirm == false) {
                context.fillText(gameText.paused, document.documentElement.clientWidth / 2, 
                     document.documentElement.clientHeight * 0.10 + 70);
            }
            else {
                context.fillText(gameText.restart_confirm, document.documentElement.clientWidth / 2, 
                     document.documentElement.clientHeight * 0.10 + 70);
            }
        }
        else
        {
            context.fillStyle = 'rgba(255, 255, 255, 1)';
            context.globalAlpha = 1;
            /// get width of text
            var width = 400;
            context.roundRect((document.documentElement.clientWidth / 2) - width/2, 
            document.documentElement.clientHeight * 0.35, width, 230, 20).fill();
    
            for (let i = 0; i < this.buttons.length; i++) {
                if (this.buttons[i].fn !== null) {
                    this.buttons[i].draw(context);
                }  
            }
    
            context.font = "700 35px 'Roboto', sans-serif";
            context.fillStyle = 'rgba(0, 0, 0, 1)';
            context.textAlign = 'center';
            if (confirm == false) {
                context.fillText(gameText.paused, document.documentElement.clientWidth / 2, 
                     document.documentElement.clientHeight * 0.35 + 70);
            }
            else {
                context.fillText(gameText.restart_confirm, document.documentElement.clientWidth / 2, 
                     document.documentElement.clientHeight * 0.35 + 70);
            }
        }

        context.restore();
    }
}

class PortraitView extends View {
    constructor() {
        super();
        this.name = "PortraitView";
        this.bgImage = new Image();
        this.bgImage.src = 'assets/village_bg.jpg';
    }

    renderAll(context) {
        super.renderAll(context);
        this.renderBackground(context);
        this.renderMessage(context);
    }

    renderBackground(context) {
        let bgWidth = document.documentElement.clientWidth;
        let bgHeight = document.documentElement.clientHeight;
        context.drawImage(this.bgImage, 0, 0, bgHeight, bgHeight);
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

class LevelClearView extends GameView {
    constructor() {
        super();
        this.name = "LevelClearView";
        // Don't let buttons work while paused:
        for (var button of this.buttons) {
            button.fn = null;
        }

        let x;
        let y;
        let w;
        let h;
        let fontSize;

        if(document.documentElement.clientWidth < 1000)
        {
            x = document.documentElement.clientWidth / 2;
            y = document.documentElement.clientHeight * 0.80;
            w = 150;
            h = 20;
            fontSize = 15;
        }
        else
        {
            x = document.documentElement.clientWidth / 2;
            y = document.documentElement.clientHeight * 0.70;
            w = 200;
            h = 30;
            fontSize = 20;
        }

        let buttonColor = "#3c4fff";
        let textColor = "#fff";
        let fontName = "'Roboto', sans-serif";
        let text = gameText.level_clear_press;

        var randomNum = Math.floor(Math.random() * gameText.info.length) + 1;
        this.infoText = gameText.info[randomNum].split("\n");

        this.nextLevelButton = new Button(x, y, w, h, buttonColor, textColor, 
            fontName, fontSize, text, true, () => {
                stateStack.pop();
                audioManager.enableOrDisableMusic("bg");
                if(level == 2)
                {
                    stateStack[stateStack.length - 1].changeBackground('assets/background3.png');
                }
                else if(level == 3)
                {
                    stateStack[stateStack.length - 1].changeBackground('assets/background2.png');
                }
            })
        audioManager.enableOrDisableMusic("bg");
    }
    
    renderAll(context) {
        super.renderAll(context);
        this.renderGameButtons(context);
        this.renderBackgroundBlur(context);
        this.renderRectangle(context);
        this.renderText(context);
    }

    renderGameButtons(context) {
        for (let i = 0; i < this.buttons.length; i++) {
            // Game buttons have no functionality, i.e. no function:
            if (this.buttons[i].fn !== null) {
                this.buttons[i].draw(context);
            }
        }
    }

    renderBackgroundBlur(context) {
        context.save();
        context.fillStyle = 'rgba(0, 0, 0, .5)';
        context.fillRect(0, 0, document.documentElement.clientWidth, 
            document.documentElement.clientHeight);
        context.restore();
    }

    renderRectangle(context) {
        context.save();
        context.shadowColor = "#000000";
        context.shadowBlur = 10;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.fillStyle = '#FFFFFF';
        let w = document.documentElement.clientWidth;
        let h = document.documentElement.clientHeight;
        
        if(document.documentElement.clientWidth < 1000)
        {
            context.roundRect(w * 0.1, h * 0.1, w * 0.8, h * 0.8, 20);
            context.clip();
            let nextLevelImage = new Image();
            nextLevelImage.src = "assets/village_bg.jpg";
            context.drawImage(nextLevelImage, w * 0.1, h * 0.1, w * 0.8, h * 0.8);
        }
        else
        {
            context.roundRect(w * 0.2, h * 0.2, w * 0.6, h * 0.6, 20);
            context.clip();
            let nextLevelImage = new Image();
            nextLevelImage.src = "assets/village_bg.jpg";
            context.drawImage(nextLevelImage, w * 0.2, h * 0.2, w * 0.6, h * 0.6);
        }
        
        context.restore();

    }

    renderText(context) {
        context.save();
        if (this.nextLevelButton.fn !== null) {
            this.nextLevelButton.draw(context);
        }  

        if(document.documentElement.clientWidth < 1000)
        {
            let text = gameText.congrats_text_next_level;
            context.shadowColor = "#000";
            context.shadowBlur = 4;
            context.shadowOffsetX = 0;
            context.shadowOffsetY = 3;
            context.font = "900 28px 'Roboto', sans-serif";
            context.fillStyle = '#FFF';
            context.textAlign = 'center';
            context.fillText(text, document.documentElement.clientWidth / 2, 
                            document.documentElement.clientHeight * 0.20);

            context.font = "600 20px 'Roboto', sans-serif";
            text = gameText.level_cleared_text;
            context.fillText(text, document.documentElement.clientWidth / 2, 
                            document.documentElement.clientHeight * 0.28);

            context.fillColor = 'rgba(0, 0, 0, 0.8)';
            context.fillStyle = 'rgba(0, 0, 0, 0.8)';
            context.globalAlpha = 0.8;
            /// get width of text
            var width = document.documentElement.clientWidth * 0.7;
            let h = document.documentElement.clientHeight;
            context.roundRect((document.documentElement.clientWidth / 2) - width/2, 
            document.documentElement.clientHeight * 0.35, width, h*0.35, 20).fill();

            context.font = "600 20px 'Roboto', sans-serif";
            context.fillStyle = '#FFF';
            context.globalAlpha = 1;
            text = gameText.fun_fact;
            context.fillText(text, document.documentElement.clientWidth / 2, 
                             document.documentElement.clientHeight * 0.45);
    
            context.font = "600 12px 'Roboto', sans-serif";
    
            var lineheight = 25;
            for(var i = 0; i < this.infoText.length; i++)
            {
                context.fillText(this.infoText[i], document.documentElement.clientWidth / 2, 
                document.documentElement.clientHeight * 0.52 + (i * lineheight));
            }
           
        }
        else
        {
            let text = gameText.congrats_text_next_level;
            context.shadowColor = "#000";
            context.shadowBlur = 4;
            context.shadowOffsetX = 0;
            context.shadowOffsetY = 3;
            context.font = "900 32px 'Roboto', sans-serif";
            context.fillStyle = '#FFF';
            context.textAlign = 'center';
            context.fillText(text, document.documentElement.clientWidth / 2, 
                            document.documentElement.clientHeight * 0.30);

            context.font = "600 24px 'Roboto', sans-serif";
            text = gameText.level_clear_text;
            context.fillText(text, document.documentElement.clientWidth / 2, 
                            document.documentElement.clientHeight * 0.35);

            context.fillColor = 'rgba(0, 0, 0, 0.8)';
            context.fillStyle = 'rgba(0, 0, 0, 0.8)';
            context.globalAlpha = 0.8;
            /// get width of text
            var width = document.documentElement.clientWidth * 0.55;
            let h = document.documentElement.clientHeight;
            context.roundRect((document.documentElement.clientWidth / 2) - width/2, 
            document.documentElement.clientHeight * 0.40, width, h*0.25, 20).fill();

            context.font = "600 24px 'Roboto', sans-serif";
            context.fillStyle = '#FFF';
            context.globalAlpha = 1;
            text = gameText.fun_fact;
            context.fillText(text, document.documentElement.clientWidth / 2, 
                             document.documentElement.clientHeight * 0.45);
    
            context.font = "600 16px 'Roboto', sans-serif";
    
            var lineheight = 25;
            for(var i = 0; i < this.infoText.length; i++)
            {
                context.fillText(this.infoText[i], document.documentElement.clientWidth / 2, 
                document.documentElement.clientHeight * 0.50 + (i * lineheight));
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

        context.roundRect(this.x - this.w, this.y - this.h,
            this.w * 2, this.h * 2, 10).fill()
        // context.fillRect(this.x - this.w, this.y - this.h,
        //                  this.w * 2, this.h * 2);

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
    context.font = "20px 'Roboto', sans-serif";

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
